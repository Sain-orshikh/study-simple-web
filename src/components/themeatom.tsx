import { atomWithStorage } from "jotai/utils";
import { atom, Getter, Setter } from "jotai/vanilla";

export const Language = atomWithStorage("language", "EN");

export const setLanguage = atom(
  null, 
  (get: Getter, set: Setter, value: string) => {
    set(Language, value);
  }
);

interface NewUser {
    username: string;
    email: string;
    password: string;
    picture: string;
    bio: string;
    badges: string[];
    achievements: string[];
  }
  
  export const newUser = atomWithStorage<NewUser>("newUser", {
    username: 'lol',
    email: '',
    password: '',
    picture: '',
    bio: '',
    badges: [],
    achievements: [],
  });

export const setNewUser = atom(
  null, 
  (get: Getter, set: Setter, { type, value }: { type: keyof NewUser; value: never }) => {
    const prevUser = get(newUser); 
    set(newUser, { ...prevUser, [type]: value }); 
  }
);

export const isMenuOpen = atom(false);

export const setIsMenuOpen = atom(
  null,
  (get: Getter, set: Setter, value: boolean) => {
    set(isMenuOpen, value);
  }
);