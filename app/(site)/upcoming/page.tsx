import { Button } from "@/components/ui/button";
import Link from "next/link";

const Upcoming = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-zinc-900">Coming Soon 🚧</h1>

        <p className="mt-3 text-sm text-zinc-600">
          This feature is currently under development. We’re working hard to
          bring it to you soon.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/">
            <Button variant="default">Go Home</Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Thank you for your patience 🙏
        </p>
      </div>
    </div>
  );
};

export default Upcoming;
