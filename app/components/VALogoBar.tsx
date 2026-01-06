import Image from "next/image";
import Link from "next/link";
import LogoBarWidgets from "./LogoBarWidgets";

const VALogoBar = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 h-34 mb-4 flex items-center gap-3">
      <Link href="/" className="flex items-center">
        <Image
          src="/app_logo.png"
          alt="Product App Logo"
          width={92}
          height={92}
          priority
          className="h-auto w-auto"
        />
      </Link>
      <Image
        src="/slogan.png"
        alt="Product slogan Logo"
        width={1000}
        height={100}
        className="w-54 h-6 mt-3"
      />
      <LogoBarWidgets />
    </div>
  );
};

export default VALogoBar;
