"use client";

import React, { createContext, useContext, useState } from "react";

export interface AppContextInterface {
  username: string;
  isLoggedIn: boolean;
  userRole: "ADMIN" | "USER" | "MODERATOR" | "NONE";
  userID: number;
}

type AppContextType = {
  currentContext: AppContextInterface;
  setAppContext: React.Dispatch<React.SetStateAction<AppContextInterface>>;
};

interface AppContextProps {
  context: AppContextInterface;
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ context, children }: AppContextProps) => {
  const [ctx, setCtx] = useState(context);
  return (
    <AppContext.Provider value={{ currentContext: ctx, setAppContext: setCtx }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return ctx;
}
