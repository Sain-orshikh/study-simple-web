import { ReactNode } from "react";

export interface Resource {
  id: string;
  name: string;
  description?: string;
  type: string;
  url: string;
  category?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  icon: ReactNode;
  resources: Resource[];
}