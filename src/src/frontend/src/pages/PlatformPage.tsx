import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Lock, Thermometer, Tv, Wifi, Zap } from "lucide-react";
import { SiGoogle, SiAmazon, SiApple, SiSamsung } from "react-icons/si";

const TIMING_STAGGER = 0.1;
const TIMING_DURATION = 0.6;

// Custom hook for fade-in on scroll
function useFadeInOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

interface Device {
  name: string;
  image?: string;
  url?: string;
}

interface PlatformData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
  categories: Array<{
    name: string;
    devices: Device[];
  }>;
}

const platformsData: Record<string, PlatformData> = {
  "google-home": {
    id: "google-home",
    name: "Google Home",
    icon: SiGoogle,
    color: "text-[oklch(0.65_0.19_130)]",
    bgColor: "bg-[oklch(0.65_0.19_130)]/10",
    description:
      "Google Home creates a unified smart home experience with powerful voice control via Google Assistant. Seamlessly integrate hundreds of compatible devices and control them through voice, the Google Home app, or automation routines.",
    categories: [
      {
        name: "Smart Lighting",
        devices: [
          { name: "Philips Hue", image: "/assets/generated/philips-hue.dim_400x400.jpg", url: "https://www.philips-hue.com" },
          { name: "LIFX", url: "https://www.lifx.com" },
          { name: "TP-Link Kasa", url: "https://www.kasasmart.com" },
          { name: "Nanoleaf", url: "https://nanoleaf.me" },
          { name: "GE Cync", url: "https://www.cync.com" },
          { name: "Sengled", url: "https://us.sengled.com" },
        ],
      },
      {
        name: "Security",
        devices: [
          { name: "Nest Cam", url: "https://store.google.com/category/connected_home" },
          { name: "Nest Doorbell", image: "/assets/generated/nest-doorbell.dim_400x400.jpg", url: "https://store.google.com/category/connected_home" },
          { name: "Arlo", url: "https://www.arlo.com" },
          { name: "Ring (select models)", url: "https://ring.com" },
          { name: "ADT", url: "https://www.adt.com" },
          { name: "SimpliSafe", url: "https://simplisafe.com" },
        ],
      },
      {
        name: "Climate Control",
        devices: [
          { name: "Nest Thermostat", image: "/assets/generated/nest-thermostat.dim_400x400.jpg", url: "https://store.google.com/category/connected_home" },
          { name: "Ecobee", url: "https://www.ecobee.com" },
          { name: "Honeywell Home", url: "https://www.honeywellhome.com" },
          { name: "Sensi", url: "https://sensi.emerson.com" },
          { name: "Emerson Sensi Touch", url: "https://sensi.emerson.com" },
        ],
      },
      {
        name: "Entertainment",
        devices: [
          { name: "Chromecast", image: "/assets/generated/chromecast.dim_400x400.jpg", url: "https://store.google.com/product/chromecast" },
          { name: "Android TV", url: "https://www.android.com/tv" },
          { name: "Sonos", url: "https://www.sonos.com" },
          { name: "LG TV", url: "https://www.lg.com/us/tvs" },
          { name: "Sony TV", url: "https://electronics.sony.com/tv-video/televisions/c/all-tvs" },
          { name: "Roku (select)", url: "https://www.roku.com" },
        ],
      },
      {
        name: "Networking",
        devices: [
          { name: "Google Wifi", url: "https://store.google.com/product/google_wifi" },
          { name: "Nest Wifi", url: "https://store.google.com/product/nest_wifi" },
          { name: "TP-Link routers", url: "https://www.tp-link.com/us/home-networking" },
          { name: "ASUS routers", url: "https://www.asus.com/networking-iot-servers/wifi-routers" },
        ],
      },
      {
        name: "Energy Management",
        devices: [
          { name: "TP-Link Smart Plug", url: "https://www.kasasmart.com" },
          { name: "Wemo", url: "https://www.wemo.com" },
          { name: "Eve Energy", url: "https://www.evehome.com/energy" },
          { name: "Emporia", url: "https://www.emporiaenergy.com" },
          { name: "Sense Energy Monitor", url: "https://sense.com" },
        ],
      },
    ],
  },
  "amazon-alexa": {
    id: "amazon-alexa",
    name: "Amazon Alexa",
    icon: SiAmazon,
    color: "text-[oklch(0.55_0.20_210)]",
    bgColor: "bg-[oklch(0.55_0.20_210)]/10",
    description:
      "Amazon Alexa offers the widest device compatibility with thousands of smart home products. Control your entire home with voice commands through Echo devices, create sophisticated routines, and enjoy seamless integration with Amazon services.",
    categories: [
      {
        name: "Smart Lighting",
        devices: [
          { name: "Philips Hue", image: "/assets/generated/philips-hue.dim_400x400.jpg", url: "https://www.philips-hue.com" },
          { name: "Wyze Bulbs", url: "https://www.wyze.com/products/wyze-bulb" },
          { name: "Sengled", url: "https://us.sengled.com" },
          { name: "TP-Link Kasa", image: "/assets/generated/kasa-plug.dim_400x400.jpg", url: "https://www.kasasmart.com" },
          { name: "LIFX", url: "https://www.lifx.com" },
          { name: "GE Cync", url: "https://www.cync.com" },
        ],
      },
      {
        name: "Security",
        devices: [
          { name: "Ring Doorbell", image: "/assets/generated/ring-doorbell.dim_400x400.jpg", url: "https://ring.com" },
          { name: "Ring Cameras", url: "https://ring.com" },
          { name: "Wyze Cam", url: "https://www.wyze.com/products/wyze-cam" },
          { name: "Blink", url: "https://blinkforhome.com" },
          { name: "Arlo", url: "https://www.arlo.com" },
          { name: "August Smart Lock", url: "https://august.com" },
        ],
      },
      {
        name: "Climate Control",
        devices: [
          { name: "Ecobee", image: "/assets/generated/ecobee-thermostat.dim_400x400.jpg", url: "https://www.ecobee.com" },
          { name: "Sensi", url: "https://sensi.emerson.com" },
          { name: "Honeywell Home", url: "https://www.honeywellhome.com" },
          { name: "Nest (via workaround)", url: "https://store.google.com/category/connected_home" },
          { name: "Wyze Thermostat", url: "https://www.wyze.com/products/wyze-thermostat" },
        ],
      },
      {
        name: "Entertainment",
        devices: [
          { name: "Fire TV", image: "/assets/generated/fire-tv-stick.dim_400x400.jpg", url: "https://www.amazon.com/fire-tv-stick" },
          { name: "Echo Studio", image: "/assets/generated/echo-dot.dim_400x400.jpg", url: "https://www.amazon.com/echo" },
          { name: "Sonos", url: "https://www.sonos.com" },
          { name: "Roku", url: "https://www.roku.com" },
          { name: "Samsung TV", url: "https://www.samsung.com/us/televisions-home-theater/tvs" },
          { name: "LG TV", url: "https://www.lg.com/us/tvs" },
        ],
      },
      {
        name: "Networking",
        devices: [
          { name: "Eero", url: "https://eero.com" },
          { name: "TP-Link Deco", url: "https://www.tp-link.com/us/deco-mesh-wifi" },
          { name: "NETGEAR Orbi", url: "https://www.netgear.com/home/wifi/mesh/orbi" },
          { name: "ASUS routers", url: "https://www.asus.com/networking-iot-servers/wifi-routers" },
        ],
      },
      {
        name: "Energy Management",
        devices: [
          { name: "Amazon Smart Plug", url: "https://www.amazon.com/smart-plug" },
          { name: "TP-Link Kasa", image: "/assets/generated/kasa-plug.dim_400x400.jpg", url: "https://www.kasasmart.com" },
          { name: "Wyze Plug", url: "https://www.wyze.com/products/wyze-plug" },
          { name: "Wemo", url: "https://www.wemo.com" },
          { name: "Emporia Vue", url: "https://www.emporiaenergy.com" },
        ],
      },
    ],
  },
  "apple-homekit": {
    id: "apple-homekit",
    name: "Apple HomeKit",
    icon: SiApple,
    color: "text-[oklch(0.40_0.08_260)]",
    bgColor: "bg-[oklch(0.40_0.08_260)]/10",
    description:
      "Apple HomeKit prioritizes privacy and security with end-to-end encryption. Control your home through Siri, the Home app on iPhone/iPad/Mac, or Apple Watch. Create powerful automations and enjoy seamless integration with your Apple ecosystem.",
    categories: [
      {
        name: "Smart Lighting",
        devices: [
          { name: "Philips Hue", image: "/assets/generated/philips-hue.dim_400x400.jpg", url: "https://www.philips-hue.com" },
          { name: "Nanoleaf", url: "https://nanoleaf.me" },
          { name: "LIFX", url: "https://www.lifx.com" },
          { name: "Eve Light Strip", url: "https://www.evehome.com/light-strip" },
          { name: "Lutron Caséta", image: "/assets/generated/lutron-caseta.dim_400x400.jpg", url: "https://www.lutron.com/caseta" },
          { name: "Meross", url: "https://www.meross.com" },
        ],
      },
      {
        name: "Security",
        devices: [
          { name: "Logitech Circle View", url: "https://www.logitech.com/circle-view" },
          { name: "Aqara Camera", url: "https://www.aqara.com" },
          { name: "Eve Cam", url: "https://www.evehome.com/cam" },
          { name: "Netatmo", url: "https://www.netatmo.com" },
          { name: "August Smart Lock", url: "https://august.com" },
          { name: "Level Lock", url: "https://level.co" },
        ],
      },
      {
        name: "Climate Control",
        devices: [
          { name: "Ecobee", image: "/assets/generated/ecobee-thermostat.dim_400x400.jpg", url: "https://www.ecobee.com" },
          { name: "Eve Thermo", url: "https://www.evehome.com/thermo" },
          { name: "Honeywell Home T9", url: "https://www.honeywellhome.com" },
          { name: "Aqara Temperature Sensor", url: "https://www.aqara.com" },
        ],
      },
      {
        name: "Entertainment",
        devices: [
          { name: "Apple TV", image: "/assets/generated/apple-tv.dim_400x400.jpg", url: "https://www.apple.com/apple-tv-4k" },
          { name: "HomePod", url: "https://www.apple.com/homepod" },
          { name: "HomePod mini", image: "/assets/generated/homepod-mini.dim_400x400.jpg", url: "https://www.apple.com/homepod-mini" },
          { name: "Sonos (AirPlay 2)", url: "https://www.sonos.com" },
          { name: "LG TV", url: "https://www.lg.com/us/tvs" },
          { name: "Samsung TV", url: "https://www.samsung.com/us/televisions-home-theater/tvs" },
        ],
      },
      {
        name: "Networking",
        devices: [
          { name: "Eero Pro", url: "https://eero.com" },
          { name: "Linksys Velop", url: "https://www.linksys.com/velop" },
          { name: "NETGEAR Orbi (select models)", url: "https://www.netgear.com/home/wifi/mesh/orbi" },
        ],
      },
      {
        name: "Energy Management",
        devices: [
          { name: "Eve Energy", url: "https://www.evehome.com/energy" },
          { name: "Meross Smart Plug", url: "https://www.meross.com" },
          { name: "Wemo", url: "https://www.wemo.com" },
          { name: "VOCOlinc Smart Outlet", url: "https://www.vocolinc.com" },
        ],
      },
    ],
  },
  "samsung-smartthings": {
    id: "samsung-smartthings",
    name: "Samsung SmartThings",
    icon: SiSamsung,
    color: "text-[oklch(0.50_0.18_250)]",
    bgColor: "bg-[oklch(0.50_0.18_250)]/10",
    description:
      "Samsung SmartThings is a versatile platform supporting Zigbee, Z-Wave, Wi-Fi, and Matter devices. The SmartThings Hub acts as a central controller, enabling complex automations and local processing for enhanced reliability and speed.",
    categories: [
      {
        name: "Smart Lighting",
        devices: [
          { name: "Philips Hue", image: "/assets/generated/philips-hue.dim_400x400.jpg", url: "https://www.philips-hue.com" },
          { name: "LIFX", url: "https://www.lifx.com" },
          { name: "Sengled", url: "https://us.sengled.com" },
          { name: "TP-Link", url: "https://www.kasasmart.com" },
          { name: "Samsung Smart Bulbs", url: "https://www.samsung.com/us/smart-home/smartthings" },
          { name: "GE switches", url: "https://www.cync.com" },
        ],
      },
      {
        name: "Security",
        devices: [
          { name: "Aqara sensors", image: "/assets/generated/aeotec-sensors.dim_400x400.jpg", url: "https://www.aqara.com" },
          { name: "Ring", url: "https://ring.com" },
          { name: "Arlo", url: "https://www.arlo.com" },
          { name: "Samsung SmartCam", url: "https://www.samsung.com/us/smart-home/smartthings" },
          { name: "Yale Smart Locks", url: "https://www.yalehome.com" },
          { name: "Schlage Connect", url: "https://www.schlage.com/smart-locks" },
        ],
      },
      {
        name: "Climate Control",
        devices: [
          { name: "Ecobee", url: "https://www.ecobee.com" },
          { name: "Honeywell", url: "https://www.honeywellhome.com" },
          { name: "Sensi", url: "https://sensi.emerson.com" },
          { name: "Samsung AC units", url: "https://www.samsung.com/us/home-appliances/air-conditioners" },
          { name: "SmartThings sensors", url: "https://www.samsung.com/us/smart-home/smartthings" },
        ],
      },
      {
        name: "Entertainment",
        devices: [
          { name: "Samsung TV", image: "/assets/generated/samsung-tv.dim_400x400.jpg", url: "https://www.samsung.com/us/televisions-home-theater/tvs" },
          { name: "Samsung Soundbars", url: "https://www.samsung.com/us/televisions-home-theater/audio" },
          { name: "Sonos", url: "https://www.sonos.com" },
          { name: "Roku", url: "https://www.roku.com" },
          { name: "NVIDIA Shield", url: "https://www.nvidia.com/en-us/shield" },
        ],
      },
      {
        name: "Networking",
        devices: [
          { name: "Samsung SmartThings Hub", image: "/assets/generated/smartthings-hub.dim_400x400.jpg", url: "https://www.samsung.com/us/smart-home/smartthings" },
          { name: "Aeotec Smart Home Hub", url: "https://aeotec.com" },
          { name: "TP-Link routers", url: "https://www.tp-link.com/us/home-networking" },
        ],
      },
      {
        name: "Energy Management",
        devices: [
          { name: "Samsung SmartThings Outlet", url: "https://www.samsung.com/us/smart-home/smartthings" },
          { name: "Aeotec Smart Switch", url: "https://aeotec.com" },
          { name: "TP-Link Kasa", url: "https://www.kasasmart.com" },
          { name: "Zooz plugs", url: "https://www.getzooz.com" },
        ],
      },
    ],
  },
};

export function PlatformPage() {
  const { platformId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { ref, isVisible } = useFadeInOnScroll();

  const platform = platformId ? platformsData[platformId] : null;

  if (!platform) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-sans font-bold text-foreground">
            Platform Not Found
          </h2>
          <p className="text-muted-foreground">
            The platform you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: "/" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const Icon = platform.icon;

  return (
    <section
      ref={ref}
      className="py-20"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity ${TIMING_DURATION}s ease-out, transform ${TIMING_DURATION}s ease-out`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate({ to: "/" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`${platform.bgColor} p-4 rounded-xl`}>
              <Icon className={`h-10 w-10 ${platform.color}`} />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
                {platform.name}
              </h3>
              <p className="text-muted-foreground font-body mt-1">
                Compatible Devices & Technologies
              </p>
            </div>
          </div>

          {/* Description */}
          <Card className="mb-8 shadow-card">
            <CardContent className="pt-6">
              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
                {platform.description}
              </p>
            </CardContent>
          </Card>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platform.categories.map((category, idx) => (
              <Card
                key={category.name}
                className="hover:shadow-card-hover transition-shadow duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s, transform ${TIMING_DURATION}s ease-out ${TIMING_STAGGER * idx}s`,
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-sans flex items-center gap-2">
                    {category.name === "Smart Lighting" && (
                      <Lightbulb className="h-5 w-5 text-primary" />
                    )}
                    {category.name === "Security" && (
                      <Lock className="h-5 w-5 text-primary" />
                    )}
                    {category.name === "Climate Control" && (
                      <Thermometer className="h-5 w-5 text-primary" />
                    )}
                    {category.name === "Entertainment" && (
                      <Tv className="h-5 w-5 text-primary" />
                    )}
                    {category.name === "Networking" && (
                      <Wifi className="h-5 w-5 text-primary" />
                    )}
                    {category.name === "Energy Management" && (
                      <Zap className="h-5 w-5 text-primary" />
                    )}
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.devices.map((device) => (
                      <div key={device.name}>
                        {device.image ? (
                          <a
                            href={device.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="space-y-2">
                              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={device.image}
                                  alt={device.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {device.name}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <a
                            href={device.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                          >
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            >
                              {device.name}
                            </Badge>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
