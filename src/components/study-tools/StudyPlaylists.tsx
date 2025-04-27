import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MusicIcon, ExternalLinkIcon } from "lucide-react"
import { PlaylistType } from "@/data/study-tools/playlists"

interface StudyPlaylistsProps {
  playlists: PlaylistType[];
}

export function StudyPlaylists({ playlists }: StudyPlaylistsProps) {
  return (
    <section className="pt-4">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <MusicIcon className="h-6 w-6 mr-2 text-purple-500" />
        Study Playlists
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow bg-purple-50"
          >
            <div className="mb-4">{playlist.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{playlist.name}</h2>
            <p className="text-gray-600 mb-4">{playlist.description}</p>
            <Button asChild className="mt-auto" variant="outline">
              <a href={playlist.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Listen on Spotify
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}