import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Lock,
  Lightbulb,
  Thermometer,
  Tv,
  Wifi,
  CheckCircle2,
  Zap,
  Users,
  Shield,
  ChevronDown,
} from "lucide-react";
import { SiGoogle, SiAmazon, SiApple, SiSamsung } from "react-icons/si";
import { useSubmitContactForm } from "../hooks/useQueries";
import { ServiceType } from "../backend";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceInterest: ServiceType;
  message: string;
}

const TIMING_STAGGER = 0.1;
const TIMING_DURATION = 0.6;

export function HomePage() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>();

  const submitMutation = useSubmitContactForm();
  const serviceInterest = watch("serviceInterest");

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitMutation.mutateAsync(data);
      toast.success("Thank you! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const services = [
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description:
        "Intelligent lighting control with voice activation, scheduling, and energy monitoring.",
      category: ServiceType.lighting,
      image: "/assets/generated/smart-lighting-install.dim_800x450.jpg",
    },
    {
      icon: Lock,
      title: "Security Systems",
      description:
        "Complete home security with smart locks, cameras, motion sensors, and alerts.",
      category: ServiceType.security,
      image: "/assets/generated/security-system-install.dim_800x450.jpg",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description:
        "Smart thermostats and HVAC integration for optimal comfort and efficiency.",
      category: ServiceType.climateControl,
      image: "/assets/generated/climate-control-install.dim_800x450.jpg",
    },
    {
      icon: Tv,
      title: "Entertainment",
      description:
        "Unified control for audio, video, streaming, and whole-home entertainment systems.",
      category: ServiceType.entertainment,
      image: "/assets/generated/entertainment-system-install.dim_800x450.jpg",
    },
    {
      icon: Wifi,
      title: "Network & Connectivity",
      description:
        "High-performance mesh networks and connected device management.",
      category: ServiceType.networking,
      image: "/assets/generated/networking-install.dim_800x450.jpg",
    },
    {
      icon: Zap,
      title: "Energy Management",
      description:
        "Monitor and optimize energy usage with smart plugs, meters, and automation.",
      category: ServiceType.energyManagement,
      image: "/assets/generated/energy-management-install.dim_800x450.jpg",
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: "Expert Installation",
      description:
        "Professional setup and configuration by certified smart home specialists.",
    },
    {
      icon: Users,
      title: "Personalized Consultation",
      description:
        "We assess your needs and design a system tailored to your lifestyle.",
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description:
        "Comprehensive maintenance, troubleshooting, and system updates.",
    },
  ];

  const platforms = [
    {
      id: "google-home",
      name: "Google Home",
      icon: SiGoogle,
      color: "text-[oklch(0.65_0.19_130)]",
      bgColor: "bg-[oklch(0.65_0.19_130)]/10",
    },
    {
      id: "amazon-alexa",
      name: "Amazon Alexa",
      icon: SiAmazon,
      color: "text-[oklch(0.55_0.20_210)]",
      bgColor: "bg-[oklch(0.55_0.20_210)]/10",
    },
    {
      id: "apple-homekit",
      name: "Apple HomeKit",
      icon: SiApple,
      color: "text-[oklch(0.40_0.08_260)]",
      bgColor: "bg-[oklch(0.40_0.08_260)]/10",
    },
    {
      id: "samsung-smartthings",
      name: "Samsung SmartThings",
      icon: SiSamsung,
      color: "text-[oklch(0.50_0.18_250)]",
      bgColor: "bg-[oklch(0.50_0.18_250)]/10",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="space-y-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: `opacity ${TIMING_DURATION}s ease-out, transform ${TIMING_DURATION}s ease-out`,
              }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground leading-tight">
                Your Home,
                <br />
                <span className="text-primary">Perfectly Synced</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-body max-w-xl">
                Professional smart home integration and installation. We bring
                your devices together into one seamless, intelligent system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild className="text-base">
                  <a href="#contact">Schedule Consultation</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base">
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </div>

            <div
              className="relative"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(20px)",
                transition: `opacity ${TIMING_DURATION}s ease-out ${TIMING_STAGGER}s, transform ${TIMING_DURATION}s ease-out ${TIMING_STAGGER}s`,
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform, idx) => {
                  const PlatformIcon = platform.icon;
                  return (
                    <Card
                      key={platform.name}
                      className="hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "scale(1)" : "scale(0.95)",
                        transition: `opacity ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * (idx + 2)}s, transform ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * (idx + 2)}s, box-shadow 0.3s ease`,
                      }}
                      onClick={() => navigate({ to: `/platform/${platform.id}` })}
                    >
                      <CardContent className="p-6 flex flex-col items-center justify-center gap-3 h-32">
                        <div
                          className={`${platform.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <PlatformIcon className={`h-6 w-6 ${platform.color}`} />
                        </div>
                        <p className="text-sm font-medium text-center">
                          {platform.name}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
              Our Services
            </h3>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Comprehensive smart home solutions for every room and every need
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group relative hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s, transform ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s, box-shadow 0.3s ease`,
                    zIndex: idx,
                  }}
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-sans">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
              Why Choose Us
            </h3>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              We combine technical expertise with exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center space-y-4"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.9)",
                    transition: `opacity ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s, transform ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s`,
                  }}
                >
                  <div className="inline-flex p-4 rounded-full bg-accent/10 text-accent mx-auto">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-sans font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
                Get In Touch
              </h3>
              <p className="text-lg text-muted-foreground font-body">
                Ready to transform your home? Let's discuss your project
              </p>
            </div>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...register("name", { required: "Name is required" })}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register("phone", { required: "Phone is required" })}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceInterest">Service Interest *</Label>
                    <Select
                      value={serviceInterest}
                      onValueChange={(value) =>
                        setValue("serviceInterest", value as ServiceType, {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger id="serviceInterest">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ServiceType.lighting}>
                          Smart Lighting
                        </SelectItem>
                        <SelectItem value={ServiceType.security}>
                          Security Systems
                        </SelectItem>
                        <SelectItem value={ServiceType.climateControl}>
                          Climate Control
                        </SelectItem>
                        <SelectItem value={ServiceType.entertainment}>
                          Entertainment
                        </SelectItem>
                        <SelectItem value={ServiceType.networking}>
                          Network & Connectivity
                        </SelectItem>
                        <SelectItem value={ServiceType.energyManagement}>
                          Energy Management
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.serviceInterest && (
                      <p className="text-sm text-destructive">
                        {errors.serviceInterest.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your smart home vision..."
                      rows={5}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
