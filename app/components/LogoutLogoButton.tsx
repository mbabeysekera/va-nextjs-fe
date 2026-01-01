import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";
const LogoutLogoButton = () => {
  const router = useRouter();
  const { setAppContext } = useAppContext();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setAppContext((prev) => ({
      ...prev,
      username: "",
      isLoggedIn: false,
    }));

    router.push("/");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Logout"
          className="w-20"
          onClick={logout}
        >
          <Image
            src="/login.svg"
            alt=""
            width={30}
            height={30}
            className="opacity-80"
          />
          <div>Logout</div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Logout</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LogoutLogoButton;
