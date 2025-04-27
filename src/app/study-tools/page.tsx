import Sidebar from "@/components/sidebar/sidebar"
import { OurTools } from "@/components/study-tools/OurTools"
import { StudyPlaylists } from "@/components/study-tools/StudyPlaylists"
import { ExternalTools } from "@/components/study-tools/ExternalTools"
import { StudyTechniques } from "@/components/study-tools/StudyTechniques"
import { Suggestion } from "@/components/study-tools/Suggestion"

// Import data
import { studyPlaylists } from "@/data/study-tools/playlists"
import { externalTools } from "@/data/study-tools/external-tools"
import { studyTechniques } from "@/data/study-tools/study-techniques"

export default function StudyToolsPage() {
  return (
    <>
      <Sidebar>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <main className="space-y-12">
            <div>
              <h1 className="text-3xl font-bold mb-6">Study Tools</h1>
              <p className="text-lg mb-6">
                Enhance your study sessions with these helpful tools designed to improve productivity, organization, and
                learning efficiency.
              </p>
            </div>

            {/* Our Tools Section */}
            <OurTools />

            {/* Study Playlists Section */}
            <StudyPlaylists playlists={studyPlaylists} />

            {/* External Tools Section */}
            <ExternalTools tools={externalTools} />

            {/* Study Techniques Section */}
            <StudyTechniques techniques={studyTechniques} />

            {/* Suggestion Section */}
            <Suggestion />
          </main>
        </div>
      </Sidebar>
    </>
  )
}

