"use client";
import Link from "next/link";
import LoginLogoButton from "./LoginLogoButton";
import AddToCartButton from "./AddToCartButton";
import { useAppContext } from "../AppContext";
import LogoutLogoButton from "./LogoutLogoButton";

const LogoBarWidgets = () => {
  const appContext = useAppContext();
  return (
    <div className=" flex ml-auto self-end pb-3 gap-3">
      {!appContext.currentContext.isLoggedIn && (
        <Link href="/login">
          <LoginLogoButton />
        </Link>
      )}
      {appContext.currentContext.isLoggedIn && <LogoutLogoButton />}
      <Link href="/upcoming">
        <AddToCartButton />
      </Link>
    </div>
  );
};

export default LogoBarWidgets;
