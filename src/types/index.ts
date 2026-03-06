export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  year: number;
  bio?: string;
  followers: number;
  following: number;
  isFollowing?: boolean;
  isPrivate?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  image: string;
  caption: string;
  description?: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: Date;
  visibility: 'my_college' | 'all_colleges' | 'followers';
}

export interface Note {
  id: string;
  userId: string;
  user: User;
  title: string;
  subject: string;
  year: string;
  description: string;
  resourceType: 'pdf' | 'link' | 'doc';
  resourceUrl?: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'event';
  user?: User;
  message: string;
  time: string;
  isRead: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  text: string;
  likes: number;
  createdAt: Date;
}
