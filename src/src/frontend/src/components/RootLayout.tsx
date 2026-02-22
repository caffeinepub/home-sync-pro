import { Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, ChevronDown } from "lucide-react";
import { SiGoogle, SiAmazon, SiApple, SiSamsung } from "react-icons/si";

export function RootLayout() {
  const navigate = useNavigate();

  const platforms = [
    {
      id: "google-home",
      name: "Google Home",
      icon: SiGoogle,
      color: "text-[oklch(0.65_0.19_130)]",
    },
    {
      id: "amazon-alexa",
      name: "Amazon Alexa",
      icon: SiAmazon,
      color: "text-[oklch(0.55_0.20_210)]",
    },
    {
      id: "apple-homekit",
      name: "Apple HomeKit",
      icon: SiApple,
      color: "text-[oklch(0.40_0.08_260)]",
    },
    {
      id: "samsung-smartthings",
      name: "Samsung SmartThings",
      icon: SiSamsung,
      color: "text-[oklch(0.50_0.18_250)]",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            <img
              src="/assets/uploads/grok_image_1771492971249-1.jpg"
              alt="Home Sync Pro Logo"
              className="h-10 w-auto object-contain"
            />
            <h1 className="text-2xl font-sans font-bold text-foreground">
              Home Sync Pro
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/#services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Platforms
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {platforms.map((platform) => {
                  const PlatformIcon = platform.icon;
                  return (
                    <DropdownMenuItem
                      key={platform.id}
                      onClick={() =>
                        navigate({ to: `/platform/${platform.id}` })
                      }
                      className="cursor-pointer"
                    >
                      <PlatformIcon
                        className={`h-4 w-4 mr-2 ${platform.color}`}
                      />
                      {platform.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
          <Button asChild>
            <a href="/#contact">Get Started</a>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/uploads/grok_image_1771492971249-1.jpg"
                  alt="Home Sync Pro Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-sans font-bold">
                  Home Sync Pro
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                Professional smart home integration and installation services
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-sans font-semibold text-foreground">
                Quick Links
              </h5>
              <nav className="flex flex-col gap-2">
                <a
                  href="/#services"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </a>
                <a
                  href="/#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="/#contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </nav>
            </div>

            <div className="space-y-3">
              <h5 className="font-sans font-semibold text-foreground">
                Contact Info
              </h5>
              <div className="space-y-1 text-sm text-muted-foreground font-body">
                <p>Email: homesyncprofessional@gmail.com</p>
                <p>Phone: (316) 413-1443</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1.5">
              © 2026. Built with{" "}
              <Heart className="h-4 w-4 text-destructive fill-destructive" />{" "}
              using{" "}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
