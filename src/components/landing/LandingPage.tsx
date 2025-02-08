import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plane, Shield, Map, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">Atom8ic</span>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" href="#features">
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" href="#pricing">
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" href="#contact">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            The Future of IoT Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect, control, and monitor your IoT devices and drones with our
            enterprise-grade platform. Secure, scalable, and easy to use.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Powerful Features for IoT Management
          </h2>
          <p className="text-muted-foreground">
            Everything you need to manage your IoT devices and drones in one
            platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Plane,
              title: "Device Management",
              description:
                "Manage all your IoT devices from a single dashboard",
            },
            {
              icon: Map,
              title: "Drone Control",
              description: "Advanced drone fleet management and control",
            },
            {
              icon: Zap,
              title: "Real-time Monitoring",
              description: "Monitor device performance and health in real-time",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Bank-grade security for your IoT infrastructure",
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6 space-y-4">
              <feature.icon className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-secondary/50 py-24">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Pricing Plans</h2>
            <p className="text-muted-foreground">
              Choose the perfect plan for your IoT needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter",
                price: "$29",
                description: "Perfect for small businesses and startups",
                features: [
                  "Up to 10 devices",
                  "Basic analytics",
                  "Email support",
                  "99.9% uptime guarantee",
                ],
              },
              {
                title: "Pro",
                price: "$99",
                description: "Ideal for growing businesses",
                features: [
                  "Up to 50 devices",
                  "Advanced analytics",
                  "Priority support",
                  "99.99% uptime guarantee",
                  "Custom integrations",
                ],
                highlighted: true,
              },
              {
                title: "Enterprise",
                price: "Custom",
                description: "For large-scale IoT deployments",
                features: [
                  "Unlimited devices",
                  "Real-time analytics",
                  "Dedicated account manager",
                  "99.999% uptime guarantee",
                  "Custom development",
                  "On-premise deployment option",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 space-y-6 ${plan.highlighted ? "border-primary" : ""}`}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Atom8ic</h4>
              <p className="text-sm text-muted-foreground">
                © 2025 Atom8ic. All rights reserved.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Cookies</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
