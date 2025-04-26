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
    username: '',
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

// Interface for tracking blog interaction states
interface BlogInteractionState {
  [blogId: string]: {
    liked: boolean;
    disliked: boolean;
  };
}

// Store liked/disliked state in localStorage to persist across page reloads
export const blogInteractions = atomWithStorage<BlogInteractionState>("blogInteractions", {});

// Action to toggle like status for a blog
export const toggleBlogLike = atom(
  null,
  (get: Getter, set: Setter, blogId: string) => {
    const currentInteractions = get(blogInteractions);
    const blogState = currentInteractions[blogId] || { liked: false, disliked: false };
    
    // If already liked, remove the like
    if (blogState.liked) {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { ...blogState, liked: false }
      });
      return 'unliked';
    } 
    // If disliked, remove dislike and add like
    else if (blogState.disliked) {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { liked: true, disliked: false }
      });
      return 'liked';
    } 
    // Otherwise add a like
    else {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { ...blogState, liked: true }
      });
      return 'liked';
    }
  }
);

// Action to toggle dislike status for a blog
export const toggleBlogDislike = atom(
  null,
  (get: Getter, set: Setter, blogId: string) => {
    const currentInteractions = get(blogInteractions);
    const blogState = currentInteractions[blogId] || { liked: false, disliked: false };
    
    // If already disliked, remove the dislike
    if (blogState.disliked) {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { ...blogState, disliked: false }
      });
      return 'undisliked';
    } 
    // If liked, remove like and add dislike
    else if (blogState.liked) {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { liked: false, disliked: true }
      });
      return 'disliked';
    } 
    // Otherwise add a dislike
    else {
      set(blogInteractions, {
        ...currentInteractions,
        [blogId]: { ...blogState, disliked: true }
      });
      return 'disliked';
    }
  }
);

// Helper to check if a blog is liked
export const isBlogLiked = atom(
  (get: Getter) => (blogId: string) => {
    const interactions = get(blogInteractions);
    return interactions[blogId]?.liked || false;
  }
);

// Helper to check if a blog is disliked
export const isBlogDisliked = atom(
  (get: Getter) => (blogId: string) => {
    const interactions = get(blogInteractions);
    return interactions[blogId]?.disliked || false;
  }
);

// Sidebar state atoms
export const sidebarOpenState = atomWithStorage("sidebarOpen", false);

export const setSidebarOpen = atom(
  null,
  (get: Getter, set: Setter, value: boolean) => {
    set(sidebarOpenState, value);
  }
);

// Hover state doesn't need persistence in localStorage
export const sidebarHoverState = atom(false);

export const setSidebarHover = atom(
  null,
  (get: Getter, set: Setter, value: boolean) => {
    set(sidebarHoverState, value);
  }
);

// Helper to determine effective sidebar state (open by toggle or by hover)
export const effectiveSidebarState = atom(
  (get: Getter) => get(sidebarOpenState) || get(sidebarHoverState)
);