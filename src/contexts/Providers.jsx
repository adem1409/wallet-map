import AppProvider from "@/contexts/AppProvider";
import AuthProvider from "@/contexts/AuthProvider";

export function Providers({ children, user }) {
  return (
    <AuthProvider user={user}>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
}
