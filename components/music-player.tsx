"use client"
import { Card } from "@/components/ui/card"
import { Music } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MusicPlayerProps {
  isSessionActive: boolean
}

// Spotify playlist IDs for focus sessions
const DEFAULT_PLAYLISTS = [
  "37i9dQZF1DX8Uebhn9wzrS", // Playlist 1
  "0O4BV5PM8rnZ6U60NByVXW", // Playlist 2
]

export default function MusicPlayer({ isSessionActive }: MusicPlayerProps) {
  return (
    <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 transition-colors bg-gradient-to-br from-accent/5 to-accent/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Music className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-foreground">Focus Music</h3>
          {isSessionActive && <Badge className="bg-green-500">Now Playing</Badge>}
        </div>
      </div>

      {/* Embedded Playlists */}
      <div className="space-y-4">
        {DEFAULT_PLAYLISTS.map((playlistId) => (
          <div key={playlistId} className="rounded-lg overflow-hidden">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
