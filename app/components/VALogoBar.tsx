import Image from "next/image";
import Link from "next/link";
import LoginLogoButton from "./LoginLogoButton";
import AddToCartButton from "./AddToCartButton";

const VALogoBar = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 h-24 flex items-center gap-3">
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
        width={200}
        height={92}
        className="self-end pb-3 h-auto w-auto"
      />
      <div className=" flex ml-auto self-end pb-3 gap-3">
        <Link href="/login">
          <LoginLogoButton />
        </Link>
        <Link href="/cart">
          <AddToCartButton />
        </Link>
      </div>
    </div>
  );
};

export default VALogoBar;
