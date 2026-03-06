import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Post, Note, Notification } from '../types';
import { users as initialUsers } from '../data/users';
import { posts as initialPosts } from '../data/posts';
import { notes as initialNotes } from '../data/notes';
import { notifications as initialNotifications } from '../data/notifications';
import { mockEvents, Event } from '../data/events';

type FollowStatus = 'None' | 'Following' | 'Requested';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  posts: Post[];
  notes: Note[];
  notifications: Notification[];
  events: Event[];
  likePost: (postId: string) => void;
  likeNote: (noteId: string) => void;
  saveNote: (noteId: string) => void;
  followUser: (targetUser: User) => void;
  unfollowUser: (userId: string) => void;
  checkFollowStatus: (userId: string) => FollowStatus;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'shares' | 'isLiked'>) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'likes' | 'saves' | 'isLiked' | 'isSaved'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Start with null — user must log in first
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [events] = useState<Event[]>(mockEvents);
  const [followMap, setFollowMap] = useState<Record<string, FollowStatus>>({});

  const followUser = (targetUser: User) => {
    if (!currentUser) return;
    const status: FollowStatus = targetUser.isPrivate ? 'Requested' : 'Following';
    setFollowMap(prev => ({ ...prev, [targetUser.id]: status }));
  };

  const unfollowUser = (userId: string) => {
    setFollowMap(prev => {
      const next = { ...prev };
      delete next[userId];
      return next;
    });
  };

  const checkFollowStatus = (userId: string): FollowStatus => {
    return followMap[userId] || 'None';
  };

  const likePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const likeNote = (noteId: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? { ...note, isLiked: !note.isLiked, likes: note.isLiked ? note.likes - 1 : note.likes + 1 }
          : note
      )
    );
  };

  const saveNote = (noteId: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? { ...note, isSaved: !note.isSaved, saves: note.isSaved ? note.saves - 1 : note.saves + 1 }
          : note
      )
    );
  };

  const addPost = (newPost: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'shares' | 'isLiked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };
    setPosts(prev => [post, ...prev]);
  };

  const addNote = (newNote: Omit<Note, 'id' | 'createdAt' | 'likes' | 'saves' | 'isLiked' | 'isSaved'>) => {
    const note: Note = {
      ...newNote,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      saves: 0,
      isLiked: false,
      isSaved: false,
    };
    setNotes(prev => [note, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users: initialUsers,
        posts,
        notes,
        notifications,
        events,
        likePost,
        likeNote,
        saveNote,
        followUser,
        unfollowUser,
        checkFollowStatus,
        addPost,
        addNote,
        markNotificationAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
