import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { mockMessages, Message } from '@/data/messages';
import {
  ArrowLeft, Send, Plus, Image as ImageIcon, Camera, FileText,
  Copy, Reply, Pencil, Trash2, X, Check, CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnhancedMessage extends Message {
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'deleted' | 'document';
  mediaUrl?: string;
  replyTo?: EnhancedMessage;
  is_edited?: boolean;
  reactions?: { emoji: string; count: number }[];
  fileName?: string;
}

const getRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === now.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ChatDetailPage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const location = useLocation();
  const { currentUser } = useApp();

  const state = location.state as { name?: string; avatar?: string; userId?: string } | null;
  const recipientName = state?.name || 'User';
  const recipientAvatar = state?.avatar || 'https://i.pravatar.cc/150?img=1';

  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [replyingTo, setReplyingTo] = useState<EnhancedMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<EnhancedMessage | null>(null);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ msg: EnhancedMessage; x: number; y: number } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatId && mockMessages[chatId]) {
      setMessages(
        mockMessages[chatId].map(m => ({ ...m, status: 'read' as const, type: 'text' as const }))
      );
    }
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Close menus on outside click
  useEffect(() => {
    const handler = () => { setContextMenu(null); setAttachMenuOpen(false); };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const handleSend = () => {
    if (!messageText.trim()) return;

    if (editingMessage) {
      setMessages(prev => prev.map(m => m.id === editingMessage.id ? { ...m, content: messageText, is_edited: true } : m));
      setEditingMessage(null);
      setMessageText('');
      return;
    }

    const newMsg: EnhancedMessage = {
      id: Date.now().toString(),
      conversation_id: chatId || '',
      sender_id: currentUser?.id || 'current-user',
      sender_name: currentUser?.name || 'You',
      sender_avatar: currentUser?.avatar || '',
      content: messageText,
      is_read: false,
      created_at: new Date().toISOString(),
      status: 'sent',
      type: 'text',
      replyTo: replyingTo || undefined,
    };

    setMessages(prev => [...prev, newMsg]);
    setMessageText('');
    setReplyingTo(null);

    // Simulate delivery & read
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)), 500);
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m)), 2000);

    // Simulate reply
    setTimeout(() => {
      const reply: EnhancedMessage = {
        id: (Date.now() + 1).toString(),
        conversation_id: chatId || '',
        sender_id: state?.userId || '2',
        sender_name: recipientName,
        sender_avatar: recipientAvatar,
        content: getRandomReply(),
        is_read: true,
        created_at: new Date().toISOString(),
        status: 'read',
        type: 'text',
      };
      setMessages(prev => [...prev, reply]);
    }, 1500 + Math.random() * 2000);
  };

  const handleContextMenu = (e: React.MouseEvent, msg: EnhancedMessage) => {
    if (msg.type === 'deleted') return;
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ msg, x: e.clientX, y: e.clientY });
  };

  const handleReaction = (emoji: string) => {
    if (!contextMenu) return;
    setMessages(prev => prev.map(m => m.id === contextMenu.msg.id
      ? { ...m, reactions: [...(m.reactions || []), { emoji, count: 1 }] }
      : m
    ));
    setContextMenu(null);
  };

  const handleMenuAction = (action: 'reply' | 'copy' | 'edit' | 'delete') => {
    if (!contextMenu) return;
    const msg = contextMenu.msg;
    if (action === 'reply') { setReplyingTo(msg); inputRef.current?.focus(); }
    else if (action === 'copy') { navigator.clipboard.writeText(msg.content); toast.success('Copied to clipboard'); }
    else if (action === 'edit') { setEditingMessage(msg); setMessageText(msg.content); inputRef.current?.focus(); }
    else if (action === 'delete') {
      const isMe = msg.sender_id === (currentUser?.id || 'current-user');
      if (isMe) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, type: 'deleted', content: '🚫 Deleted' } : m));
      } else {
        setMessages(prev => prev.filter(m => m.id !== msg.id));
      }
    }
    setContextMenu(null);
  };

  const isMe = (senderId: string) => senderId === currentUser?.id;

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card shadow-sm flex items-center gap-3 px-3 h-[60px] shrink-0">
        <button onClick={() => navigate(-1)} className="p-2"><ArrowLeft className="h-6 w-6 text-foreground" /></button>
        <img src={recipientAvatar} alt={recipientName} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground truncate">{recipientName}</p>
          <p className="text-xs text-emerald-500 font-medium">Active now</p>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-24 text-muted-foreground">
            <p className="text-lg font-semibold">No messages yet</p>
            <p className="text-sm">Say hi to {recipientName}!</p>
          </div>
        )}
        {messages.map((msg, idx) => {
          const mine = isMe(msg.sender_id);
          const currentDate = getRelativeDate(msg.created_at);
          const prevDate = idx > 0 ? getRelativeDate(messages[idx - 1].created_at) : null;
          const showAvatar = idx === messages.length - 1 || messages[idx + 1]?.sender_id !== msg.sender_id;

          return (
            <div key={msg.id}>
              {currentDate !== prevDate && (
                <div className="flex justify-center my-3">
                  <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">{currentDate}</span>
                </div>
              )}
              <div className={cn('flex items-end gap-2 mb-0.5', mine ? 'justify-end' : 'justify-start')}>
                {!mine && (
                  <div className="w-7 shrink-0">
                    {showAvatar ? <img src={msg.sender_avatar} className="w-7 h-7 rounded-full object-cover" /> : null}
                  </div>
                )}
                <div
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                  className={cn(
                    'relative max-w-[75%] px-3 py-2 rounded-2xl shadow-sm cursor-default select-text',
                    mine ? 'bg-accent rounded-br-sm' : 'bg-card rounded-bl-sm',
                    msg.type === 'deleted' && 'opacity-60'
                  )}
                >
                  {/* Reply context */}
                  {msg.replyTo && (
                    <div className="bg-foreground/5 p-1.5 rounded-lg mb-1.5 border-l-[3px] border-primary">
                      <p className="text-[11px] font-bold text-primary">{isMe(msg.replyTo.sender_id) ? 'You' : msg.replyTo.sender_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{msg.replyTo.content}</p>
                    </div>
                  )}

                  {/* Content */}
                  {msg.type === 'deleted'
                    ? <p className="text-sm italic text-muted-foreground">{msg.content}</p>
                    : <p className="text-[15px] leading-[21px] text-foreground">{msg.content}</p>
                  }

                  {/* Meta */}
                  {msg.type !== 'deleted' && (
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.is_edited && ' • Edited'}
                      </span>
                      {mine && (
                        msg.status === 'read'
                          ? <CheckCheck className="h-3.5 w-3.5 text-primary" />
                          : <Check className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  )}

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="absolute -bottom-2.5 left-2.5 flex bg-card border border-border rounded-full px-1.5 py-0.5 shadow-sm">
                      {msg.reactions.map((r, i) => <span key={i} className="text-xs">{r.emoji}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply / Edit banner */}
      {(replyingTo || editingMessage) && (
        <div className="flex items-center gap-2 bg-muted/60 px-4 py-2 border-t border-border">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-primary">{editingMessage ? 'Editing Message' : `Replying to ${replyingTo?.sender_name}`}</p>
            <p className="text-xs text-muted-foreground truncate">{editingMessage?.content || replyingTo?.content}</p>
          </div>
          <button onClick={() => { setReplyingTo(null); setEditingMessage(null); setMessageText(''); }}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
      )}

      {/* Input */}
      <div className="bg-card border-t border-border px-3 py-2 shrink-0">
        <div className="flex items-end gap-2">
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setAttachMenuOpen(!attachMenuOpen); }} className="p-2.5">
              <Plus className="h-6 w-6 text-primary" />
            </button>
            {attachMenuOpen && (
              <div onClick={(e) => e.stopPropagation()} className="absolute bottom-14 left-0 bg-card rounded-2xl shadow-lg border border-border p-2 min-w-[160px] z-50">
                <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center"><ImageIcon className="h-5 w-5 text-blue-600" /></div>
                  <span className="text-base font-medium text-foreground">Gallery</span>
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center"><Camera className="h-5 w-5 text-green-600" /></div>
                  <span className="text-base font-medium text-foreground">Camera</span>
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center"><FileText className="h-5 w-5 text-orange-500" /></div>
                  <span className="text-base font-medium text-foreground">Document</span>
                </button>
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Message..."
            className="flex-1 bg-muted/50 rounded-3xl px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground outline-none border-0"
          />
          <button onClick={handleSend} className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
            {editingMessage ? <Check className="h-5 w-5 text-primary-foreground" /> : <Send className="h-[18px] w-[18px] text-primary-foreground" />}
          </button>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div className="fixed inset-0 z-50" onClick={() => setContextMenu(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-card rounded-xl shadow-xl border border-border w-[180px] py-1 z-50"
            style={{ top: Math.min(contextMenu.y, window.innerHeight - 280), left: Math.min(contextMenu.x, window.innerWidth - 200) }}
          >
            {/* Reactions */}
            <div className="flex justify-around px-2 py-2">
              {['❤️', '😂', '👍', '🔥', '😢'].map(emoji => (
                <button key={emoji} onClick={() => handleReaction(emoji)} className="text-xl hover:scale-125 transition-transform p-1">{emoji}</button>
              ))}
            </div>
            <div className="h-px bg-border mx-2" />
            <button onClick={() => handleMenuAction('reply')} className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 text-foreground">
              <span className="text-base font-medium">Reply</span><Reply className="h-4 w-4" />
            </button>
            {contextMenu.msg.type === 'text' && (
              <button onClick={() => handleMenuAction('copy')} className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 text-foreground">
                <span className="text-base font-medium">Copy</span><Copy className="h-4 w-4" />
              </button>
            )}
            {isMe(contextMenu.msg.sender_id) && contextMenu.msg.type === 'text' && (
              <button onClick={() => handleMenuAction('edit')} className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 text-foreground">
                <span className="text-base font-medium">Edit</span><Pencil className="h-4 w-4" />
              </button>
            )}
            <button onClick={() => handleMenuAction('delete')} className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 text-destructive">
              <span className="text-base font-medium">Delete</span><Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const REPLIES = [
  "That sounds great! 🎉", "I'll check it out!", "Thanks for letting me know 😊",
  "Awesome, can't wait!", "Sure, let's do it!", "Haha that's funny 😄",
  "I was thinking the same thing!", "Let me get back to you on that",
];
const getRandomReply = () => REPLIES[Math.floor(Math.random() * REPLIES.length)];

export default ChatDetailPage;
