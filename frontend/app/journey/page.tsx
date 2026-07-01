import { AppShell } from "@/components/app/app-shell"
import { PageHeader } from "@/components/app/page-header"
import { Content } from "@/components/app/content"
import { JourneyTimeline } from "@/components/app/journey-timeline"

export default function JourneyPage() {
  return (
    <AppShell>
      <PageHeader
        title="My Journey"
        description="Visualise your pathway and expand any stage for detail."
      />
      <Content>
        <JourneyTimeline />
      </Content>
    </AppShell>
  )
}
