import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { ProfileForm } from "@/components/app/profile-form"

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader
        title="My Profile"
        description="The details we use to personalise your impact analysis."
      />
      <Content>
        <ProfileForm />
      </Content>
    </AppShell>
  )
}
