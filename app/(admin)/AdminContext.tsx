"use client";

import { createContext, useContext } from "react";
import type { IntrospectResponse } from "../../lib/auth/introspect";

const AdminContext = createContext<IntrospectResponse | null>(null);

export const AdminProvider = ({
  value,
  children,
}: {
  value: IntrospectResponse;
  children: React.ReactNode;
}) => {
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
};
