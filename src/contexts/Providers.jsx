import AuthProvider from "@/contexts/AuthProvider";

export function Providers({ children, user }) {
  return <AuthProvider user={user}>{children}</AuthProvider>;
}
