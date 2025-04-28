import { ReactNode } from "react";
import { MusicIcon } from "lucide-react";

export interface TrackType {
  id: string;
  name: string;
  artist: string;
  coverImage: string;
  previewUrl?: string;
}

export interface PlaylistType {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  link: string;
  playlistId: string;
  tracks: TrackType[];
}

export const studyPlaylists: PlaylistType[] = [
  {
    id: 1,
    name: "Deep Focus",
    description: "Ambient sounds and instrumental music for intense concentration.",
    icon: <MusicIcon className="h-10 w-10 text-blue-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
    playlistId: "37i9dQZF1DWZeKCadgRdKQ",
    tracks: [
      {
        id: "track1_1",
        name: "Reflection",
        artist: "Brian Eno",
        coverImage: "/study-playlists/deep-focus/reflection.jpg",
      },
      {
        id: "track1_2",
        name: "Solar Sailer",
        artist: "Daft Punk",
        coverImage: "/study-playlists/deep-focus/solar-sailer.jpg",
      },
      {
        id: "track1_3",
        name: "Horizon Variations",
        artist: "Max Richter",
        coverImage: "/study-playlists/deep-focus/horizon.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Study Beats",
    description: "Lo-fi hip hop beats to help you concentrate.",
    icon: <MusicIcon className="h-10 w-10 text-purple-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS",
    playlistId: "37i9dQZF1DX8Uebhn9wzrS",
    tracks: [
      {
        id: "track2_1",
        name: "Sleepless",
        artist: "Lofi Fruits Music",
        coverImage: "/study-playlists/study-beats/sleepless.jpg",
      },
      {
        id: "track2_2",
        name: "Moonlight",
        artist: "Chillhop Music",
        coverImage: "/study-playlists/study-beats/moonlight.jpg",
      },
      {
        id: "track2_3",
        name: "Rainfall",
        artist: "The Jazz Hop Café",
        coverImage: "/study-playlists/study-beats/rainfall.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Classical Focus",
    description: "Classical music selections proven to enhance learning and retention.",
    icon: <MusicIcon className="h-10 w-10 text-green-500" />,
    link: "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0",
    playlistId: "37i9dQZF1DWWEJlAGA9gs0",
    tracks: [
      {
        id: "track3_1",
        name: "Piano Concerto No. 21",
        artist: "Wolfgang Amadeus Mozart",
        coverImage: "/study-playlists/classical-focus/piano-concerto.jpg",
      },
      {
        id: "track3_2",
        name: "Clair de Lune",
        artist: "Claude Debussy",
        coverImage: "/study-playlists/classical-focus/clair-de-lune.jpg",
      },
      {
        id: "track3_3",
        name: "Air on the G String",
        artist: "Johann Sebastian Bach",
        coverImage: "/study-playlists/classical-focus/air-g-string.jpg",
      },
    ],
  },
];