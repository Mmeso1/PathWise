import { AuthShell } from "@/components/auth/auth-shell"
import { AuthForm } from "@/components/auth/auth-form"

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start mapping your personal immigration journey in minutes."
    >
      <AuthForm mode="signup" />
    </AuthShell>
  )
}
