import { AuthShell } from "@/components/auth/auth-shell"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see what has changed since your last visit."
    >
      <AuthForm mode="login" />
    </AuthShell>
  )
}
