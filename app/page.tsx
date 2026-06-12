import { SiteNavbar } from "@/components/site-navbar"
import { Hero } from "@/components/hero"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { ProductShowcase } from "@/components/product-showcase"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main>
        <Hero />
        <DashboardPreview />
        <Features />
        <ProductShowcase />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  )
}