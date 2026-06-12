import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { UploadedDocuments } from "@/components/dashboard/uploaded-documents"
import { RecentChats } from "@/components/dashboard/recent-chats"
import { GeneratedImages } from "@/components/dashboard/generated-images"
import { UsageStatistics } from "@/components/dashboard/usage-statistics"

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <Topbar />

        <main className="flex-1 pb-10">
          {/* Personalized Hero Greeting */}
          <section className="mb-6 mt-2">
            <p className="text-sm text-muted-foreground">Welcome back, Vijay</p>
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Your <span className="text-gradient">intelligence workspace</span> at a glance
            </h1>
          </section>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <UploadedDocuments />
            <RecentChats />
            <GeneratedImages />
            <UsageStatistics />
          </div>
        </main>
      </div>
    </div>
  )
}