import Image from "next/image";
import Link from "next/link";

interface DetailsWithLinks {
  topic: string;
  href: string;
}
interface FooterDataColumn {
  title: string;
  details: DetailsWithLinks[];
}

const contactUs: FooterDataColumn = {
  title: "Contact Us",
  details: [
    { topic: "Phone: 0769075325", href: "/about" },
    {
      topic: "Email: vacollection.web.lk@gmail.com",
      href: "/about",
    },
  ],
};

const categories: FooterDataColumn = {
  title: "Categories",
  details: [
    { topic: "Earrings", href: "/products/pages/1?category=EARRING" },
    { topic: "Rings", href: "/products/pages/1?category=RING" },
    { topic: "Necklace", href: "/products/pages/1?category=NECKLACE" },
    { topic: "Bracelets", href: "/products/pages/1?category=BRACELET" },
    { topic: "Pendants", href: "/products/pages/1?category=PENDANT" },
  ],
};

const socialMedia: FooterDataColumn = {
  title: "Follow Us On",
  details: [
    { topic: "/facebook.svg", href: "https://www.facebook.com/vacollection/" },
    { topic: "/instagram.svg", href: "https://instagram.com/vacollection/" },
    {
      topic: "/tiktok.svg",
      href: "https://www.tiktok.com/discover/vacollection",
    },
  ],
};

const Footer = () => {
  return (
    <div className="bg-zinc-500 text-white">
      <div className="flex flex-col md:flex-row md:justify-between mx-auto max-w-7xl px-6 py-4 gap-6">
        <div className="mt-4 text-center md:text-left">
          <Image
            src="/app_logo.png"
            alt="Product App Logo"
            width={92}
            height={92}
            priority
            className="h-auto w-auto"
          />
        </div>
        <div className="mt-4 text-center md:text-left">
          <h1 className="text-xl font-semibold mb-6">{contactUs.title}</h1>
          <ul>
            {contactUs.details.map((detail) => (
              <li className="mb-2" key={detail.topic}>
                <Link href={detail.href}>
                  <p>{detail.topic}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-center md:text-left">
          <h1 className="text-xl font-semibold mb-6">{categories.title}</h1>
          <ul>
            {categories.details.map((detail) => (
              <li className="mb-2" key={detail.topic}>
                <Link href={detail.href}>
                  <p>{detail.topic}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-center md:text-left">
          <h1 className="text-xl font-semibold mb-6 ml-2">
            {socialMedia.title}
          </h1>
          <div className="flex gap-4">
            {socialMedia.details.map((detail) => (
              <span key={detail.topic}>
                <Link href={detail.href}>
                  <Image
                    src={detail.topic}
                    alt="Product App Logo"
                    width={32}
                    height={32}
                    priority
                  />
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-4 text-sm">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} VA Collection</span>
          <span>Handmade &hearts; with love</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
