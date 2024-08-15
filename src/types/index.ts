export interface Card {
  id: string;
  title: string;
  description: string | null;
}

export interface Column {
  id: string;
  name: string;
  order: number;
  cards: Card[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardSummary {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio: string;
  image: string;
}