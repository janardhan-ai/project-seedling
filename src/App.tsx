import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import CreatePage from "./pages/CreatePage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import PostDetailPage from "./pages/PostDetailPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import WelcomePage from "./pages/WelcomePage";
import StartingPage from "./pages/StartingPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:eventId" element={<EventDetailPage />} />
              <Route path="/chat/:chatId" element={<ChatDetailPage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
              <Route path="/note/:noteId" element={<NoteDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/followers" element={<FollowersPage />} />
              <Route path="/following" element={<FollowingPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/starting" element={<StartingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
