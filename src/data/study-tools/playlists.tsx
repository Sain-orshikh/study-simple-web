import { ReactNode } from "react";
import { MusicIcon } from "lucide-react";

export interface PlaylistType {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export const studyPlaylists: PlaylistType[] = [
  {
    id: 1,
    name: "Deep Focus",
    description: "Ambient sounds and instrumental music for intense concentration.",
    icon: <MusicIcon className="h-10 w-10 text-blue-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
  },
  {
    id: 2,
    name: "Study Beats",
    description: "Lo-fi hip hop beats to help you concentrate.",
    icon: <MusicIcon className="h-10 w-10 text-purple-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS",
  },
  {
    id: 3,
    name: "Classical Focus",
    description: "Classical music selections proven to enhance learning and retention.",
    icon: <MusicIcon className="h-10 w-10 text-green-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0",
  },
];