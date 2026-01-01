"use client";
import { useState } from "react";
import LoginDetailsCard from "../../components/LoginDetailsCard";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppContext";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAppContext } = useAppContext();

  const login = async (mobileNo: string, password: string) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobileNo, password }),
    });

    if (!res.ok) {
      const loginResponse: AuthErrorResponse = await res.json();
      setError(loginResponse.message);
      setLoading(false);
      return;
    }

    setAppContext((prev) => ({
      ...prev,
      username: mobileNo,
      isLoggedIn: true,
    }));

    router.push("/");
  };

  const signUp = async () => {
    setLoading(true);
    setError(null);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center w-full">
      <LoginDetailsCard
        error={error}
        isLoading={loading}
        login={login}
        signUp={signUp}
        onClick={setError}
      />
    </div>
  );
};

export default LoginPage;
