import { redirect } from "next/navigation";
import { introspectUser, IntrospectResponse } from "../../lib/auth/introspect";

export default async function AdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const instrospectRes: IntrospectResponse | null = await introspectUser();
  if (instrospectRes === null || instrospectRes.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <section>
      <div className="flex items-center mx-auto max-w-7xl px-6 py-1">
        {children}
      </div>
    </section>
  );
}
