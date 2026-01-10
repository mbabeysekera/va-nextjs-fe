import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
const GoToDashboardButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Login" className="w-28">
          <Image
            src="/dashboard.svg"
            alt=""
            width={30}
            height={30}
            className="opacity-80"
          />
          <div>Dashboard</div>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="text-white">
        <p>Dashboard</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GoToDashboardButton;
