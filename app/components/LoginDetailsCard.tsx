"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  error: string | null;
  login: (mobileNo: string, password: string) => void;
  signUp: (
    mobileNo: string,
    username: string,
    email: string,
    password: string
  ) => void;
  onClick: (value: string | null) => void;
}

const LoginDetailsCard = ({
  isLoading,
  error,
  login,
  signUp,
  onClick,
}: Props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeLoginAndSignUp = () => {
    if (isSignUp) {
      signUp(mobileNo, username, email, password);
    } else {
      login(mobileNo, password);
    }
  };

  return (
    <div className="w-full max-h-96 max-w-sm pt-20">
      <Card className="w-full max-w-sm" onClick={() => onClick(null)}>
        <CardHeader>
          <CardTitle>
            {!isSignUp ? "Login to your account" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {!isSignUp
              ? "Enter your Mobile No. to login to your account"
              : "Sign up to crate a new account"}
          </CardDescription>
          <CardAction>
            {!isSignUp && (
              <Button variant="link" onClick={() => setIsSignUp(true)}>
                Sign Up
              </Button>
            )}
            {isSignUp && (
              <Button variant="link" onClick={() => setIsSignUp(false)}>
                Back to Login
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {error && (
                  <p className="text-sm text-red-500">Invalid Credentials!</p>
                )}
                <Label htmlFor="text">Mobile No.</Label>
                <Input
                  id="mobile"
                  type="text"
                  placeholder="07XXXXXXXX"
                  required
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
              {isSignUp && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Ex: Jane Doe
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="mobile"
                      type="text"
                      placeholder="m@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {!isSignUp && (
            <Button
              type="submit"
              className={`w-full ${
                isLoading ? "disabled:cursor-not-allowed" : ""
              }`}
              onClick={() => hanldeLoginAndSignUp()}
            >
              Login
            </Button>
          )}
          {isSignUp && (
            <Button
              type="submit"
              className={`w-full ${
                isLoading ? "disabled:cursor-not-allowed" : ""
              }`}
              onClick={() => hanldeLoginAndSignUp()}
            >
              Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginDetailsCard;
