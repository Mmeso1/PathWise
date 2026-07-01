import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { PolicyList } from "@/components/app/policy-list"

export default function PoliciesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Policy Explorer"
        description="Browse every monitored UK immigration policy change."
      />
      <Content>
        <PolicyList detailed />
      </Content>
    </AppShell>
  )
}
