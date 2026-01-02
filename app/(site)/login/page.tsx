"use client";
import { useState } from "react";
import LoginDetailsCard from "../../components/LoginDetailsCard";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppContext";
import { handleLoginSync } from "@/lib/auth/revalidation";

const LoginPage = () => {
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

    const userRequiredFields: UserRequiredFields = await res.json();

    setAppContext((prev) => ({
      ...prev,
      isLoggedIn: true,
      userID: userRequiredFields.id,
      username: userRequiredFields.full_name,
      userRole: userRequiredFields.role,
    }));
    // await handleLoginSync("/", "layout");
    // router.push("/");
    window.location.href = "/";
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
