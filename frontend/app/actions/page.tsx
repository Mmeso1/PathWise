import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { ActionList } from "@/components/app/action-list"

export default function ActionsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Action Centre"
        description="Turn policy changes into clear next steps."
      />
      <Content>
        <ActionList />
      </Content>
    </AppShell>
  )
}
