import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { DashboardCard } from "./dashboard-card"

const images = [
  { src: "/gen/aurora.png", alt: "Neon aurora generative art" },
  { src: "/gen/crystal.png", alt: "Iridescent crystal prism" },
  { src: "/gen/orb.png", alt: "Glowing plasma orb" },
  { src: "/gen/terrain.png", alt: "Digital topographic terrain" },
]

export function GeneratedImages() {
  return (
    <DashboardCard title="Generated Images" icon={<ImageIcon className="size-[18px]" />} action="Open studio">
      <div className="grid grid-cols-2 gap-3">
        {images.map((img) => (
          <button
            key={img.src}
            className="group/img relative aspect-square overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 40vw, 200px"
              className="object-cover transition-transform duration-300 group-hover/img:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover/img:opacity-100" />
          </button>
        ))}
      </div>
    </DashboardCard>
  )
}
