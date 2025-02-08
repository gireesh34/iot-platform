import { getToken } from "./jwt";

type MessageHandler = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();

  constructor(private url: string) {}

  connect() {
    const token = getToken();
    if (!token) {
      console.error("No auth token available");
      return;
    }

    this.ws = new WebSocket(`${this.url}?token=${token}`);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        this.handleMessage(type, data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    setTimeout(
      () => {
        this.reconnectAttempts++;
        this.connect();
      },
      this.reconnectTimeout * Math.pow(2, this.reconnectAttempts),
    );
  }

  subscribe(type: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)?.add(handler);
  }

  unsubscribe(type: string, handler: MessageHandler) {
    this.messageHandlers.get(type)?.delete(handler);
  }

  private handleMessage(type: string, data: any) {
    this.messageHandlers.get(type)?.forEach((handler) => handler(data));
  }

  send(type: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}

export const wsClient = new WebSocketClient("wss://api.perceive.space/ws");
