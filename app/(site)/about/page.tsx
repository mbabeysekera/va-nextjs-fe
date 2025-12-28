import { Button } from "@/components/ui/button";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-zinc-50 px-6 py-12">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-zinc-900">
          About VA Collection
        </h1>

        <p className="mt-4 text-zinc-700 leading-relaxed">
          VA Collection is a handcrafted jewelry brand focused on creating
          elegant and affordable plastic pearl jewelry. Each piece is carefully
          designed and made by hand, combining simplicity, beauty, and attention
          to detail.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900">
          What We Offer
        </h2>

        <p className="mt-2 text-zinc-700 leading-relaxed">
          We specialize in plastic pearl jewelry, including earrings, rings,
          necklaces, bracelets, and pendants. Our designs are lightweight,
          stylish, and suitable for everyday wear as well as special occasions.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900">
          Why Choose Us
        </h2>

        <p className="mt-2 text-zinc-700 leading-relaxed">
          Every piece at VA Collection is handmade with care. We believe in
          craftsmanship over mass production, which allows us to maintain
          quality, uniqueness, and a personal touch in everything we create.
          When you choose us, you’re supporting handcrafted work made with
          passion.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900">Contact Us</h2>

        <div className="mt-2 text-zinc-700 space-y-1">
          <p>
            <span className="font-medium text-zinc-900">Phone:</span> 076 907
            5325
          </p>
          <p>
            <span className="font-medium text-zinc-900">Email:</span>{" "}
            <a
              href="mailto:vacollection.web.lk@gmail.com"
              className="text-blue-600 hover:underline"
            >
              vacollection.web.lk@gmail.com
            </a>
          </p>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900">
          Connect With Us
        </h2>

        <p className="mt-2 text-zinc-700">
          Follow us on social media to see our latest designs, updates, and
          behind-the-scenes work.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="https://www.facebook.com/vacollection/" target="_blank">
            <Button variant="outline">Facebook</Button>
          </Link>

          <Link href="https://instagram.com/vacollection/" target="_blank">
            <Button variant="outline">Instagram</Button>
          </Link>

          <Link
            href="https://www.tiktok.com/discover/vacollection"
            target="_blank"
          >
            <Button variant="outline">TikTok</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
