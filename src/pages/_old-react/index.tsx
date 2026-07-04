import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import { ChevronDown, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [lightbox, setLightbox] = useState<null | { src: string; title: string }>(
    null,
  );

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  const portfolioItems = [
    {
      id: 1,
      title: "Websites",
      description: ["Always free, always open source, mostly fun."],
      image: "/images/handycomputerbloke.com.png",
      link: "https://handycomputerbloke.com",
    },
    {
      id: 2,
      title: "Photos",
      description: ["Random photos pretending to be curated portfolios."],
      image: "/images/thelucidlens.com.jpg",
      link: "https://thelucidlens.com",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-16 py-8 md:py-10">
        <div className="max-w-6xl w-full mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="text-6xl">✏️</span>
              <h1 className="text-6xl font-bold">Dinsor</h1>
            </div>
          </div>

          {/* Introduction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center">
              <CardBody>
                <p className="text-lg leading-relaxed">
                  I live in{" "}
                  <span className="font-semibold text-primary">
                    Bangkok, Thailand
                  </span>
                  . My Thai nickname is{" "}
                  <span className="font-semibold text-primary">ดินสอ</span>,
                  meaning pencil.
                </p>
                <p className="text-sm text-default-500 mt-2">
                  It's pronounced din-sɔ̌ɔ, or Dinsor. Everyone calls me that.
                </p>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody>
                <p className="text-lg leading-relaxed">
                  My passport says{" "}
                  <span className="font-semibold text-secondary">
                    Stephen Harrison
                  </span>
                  .
                </p>
                <p className="text-sm text-default-500 mt-2">
                  My bank calls me that.
                </p>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody>
                <p className="text-lg leading-relaxed">
                  I like <span className="font-semibold text-primary">art</span>
                  . I like{" "}
                  <span className="font-semibold text-secondary">science</span>.
                </p>
                <p className="text-sm text-default-500 mt-2">
                  I especially like art and science together.
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            <Link
              href="mailto:dinsor@dinsor.org"
              className="flex items-center gap-2 text-default-700 hover:text-primary transition-colors group"
            >
              <Mail
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm">dinsor@dinsor.org</span>
            </Link>
            <Link
              href="https://github.com/cloudy-native"
              isExternal
              className="flex items-center gap-2 text-default-700 hover:text-primary transition-colors group"
            >
              <Github
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm">github.com/cloudy-native</span>
            </Link>
            <Link
              href="https://th.linkedin.com/in/stephenharrison"
              isExternal
              className="flex items-center gap-2 text-default-700 hover:text-primary transition-colors group"
            >
              <Linkedin
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-sm">linkedin.com/in/stephenharrison</span>
            </Link>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="flex items-center gap-2 text-default-700 hover:text-primary transition-colors group px-3 py-2"
                >
                  <MessageCircle
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">Chat</span>
                  <ChevronDown size={16} className="opacity-70" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Chat links">
                <DropdownItem
                  key="whatsapp-qr"
                  onPress={() =>
                    setLightbox({
                      src: "/images/whatsapp.png",
                      title: "WhatsApp",
                    })
                  }
                  textValue="WhatsApp"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/whatsapp.png"
                      alt="WhatsApp QR Code"
                      className="h-16 w-16 rounded-md bg-white object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">WhatsApp</span>
                      <span className="text-tiny text-default-500">
                        Tap to enlarge
                      </span>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="line-qr"
                  onPress={() =>
                    setLightbox({ src: "/images/lineapp.png", title: "LINE" })
                  }
                  textValue="LINE"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/lineapp.png"
                      alt="LINE QR Code"
                      className="h-16 w-16 rounded-md bg-white object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">LINE</span>
                      <span className="text-tiny text-default-500">
                        Tap to enlarge
                      </span>
                    </div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Portfolio Section */}
          <div className="mt-20">
            <h2 className="text-5xl font-bold text-center mb-12">Portfolios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.map((item) => (
                <Card
                  key={item.id}
                  isPressable
                  as={Link}
                  href={item.link}
                  isExternal
                  className="h-full"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-video w-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardBody className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-default-500 mb-3">{item.link}</p>
                    <div className="space-y-2">
                      {item.description.map((paragraph) => (
                        <p
                          key={`${item.id}-${paragraph}`}
                          className="text-default-600 text-sm"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            />
            <div
              className="relative z-10 w-full max-w-md rounded-large bg-content1 p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${lightbox.title} QR code`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{lightbox.title}</h3>
                <Button size="sm" variant="light" onPress={() => setLightbox(null)}>
                  Close
                </Button>
              </div>
              <img
                src={lightbox.src}
                alt={`${lightbox.title} QR Code`}
                className="h-auto w-full rounded-medium bg-white"
              />
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
