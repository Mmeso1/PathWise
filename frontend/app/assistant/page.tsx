import { Suspense } from "react"
import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { AssistantChat } from "@/components/app/assistant-chat"

export default function AssistantPage() {
  return (
    <AppShell>
      <PageHeader
        title="Assistant"
        description="Ask anything about how policy affects your journey."
      />
      <Content>
        <Suspense fallback={null}>
          <AssistantChat />
        </Suspense>
      </Content>
    </AppShell>
  )
}
