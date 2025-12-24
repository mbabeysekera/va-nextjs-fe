import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
const LoginLogoButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Login">
          <Image
            src="/login.svg"
            alt=""
            width={30}
            height={30}
            className="opacity-80"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Login</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LoginLogoButton;
