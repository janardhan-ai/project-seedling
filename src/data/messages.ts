export interface Conversation {
  id: string;
  participant1_id: string;
  participant1_name: string;
  participant1_avatar: string;
  participant2_id: string;
  participant2_name: string;
  participant2_avatar: string;
  last_message: string;
  last_message_time: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participant1_id: '2',
    participant1_name: 'Sarah Johnson',
    participant1_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    participant2_id: '1',
    participant2_name: 'Janardhan',
    participant2_avatar: 'https://i.pravatar.cc/150?img=12',
    last_message: 'See you at the tech fest tomorrow!',
    last_message_time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    participant1_id: '3',
    participant1_name: 'Mike Chen',
    participant1_avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    participant2_id: '1',
    participant2_name: 'Janardhan',
    participant2_avatar: 'https://i.pravatar.cc/150?img=12',
    last_message: 'Thanks! The ML notes really helped',
    last_message_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '3',
    participant1_id: '4',
    participant1_name: 'Emily Rodriguez',
    participant1_avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    participant2_id: '1',
    participant2_name: 'Janardhan',
    participant2_avatar: 'https://i.pravatar.cc/150?img=12',
    last_message: "Don't miss the cultural night!",
    last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '4',
    participant1_id: '5',
    participant1_name: 'Alex Kumar',
    participant1_avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    participant2_id: '1',
    participant2_name: 'Janardhan',
    participant2_avatar: 'https://i.pravatar.cc/150?img=12',
    last_message: 'Count me in for the hackathon team!',
    last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '5',
    participant1_id: '6',
    participant1_name: 'Priya Sharma',
    participant1_avatar: 'https://i.pravatar.cc/150?img=47',
    participant2_id: '1',
    participant2_name: 'Janardhan',
    participant2_avatar: 'https://i.pravatar.cc/150?img=12',
    last_message: 'Thanks! Working on a new UI project',
    last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

export const mockMessages: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'm1',
      conversation_id: '1',
      sender_id: '2',
      sender_name: 'Sarah Johnson',
      sender_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'Hey! Did you register for the Tech Fest?',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'm2',
      conversation_id: '1',
      sender_id: '1',
      sender_name: 'Janardhan',
      sender_avatar: 'https://i.pravatar.cc/150?img=12',
      content: 'Yes! I registered yesterday. Are you going?',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: 'm3',
      conversation_id: '1',
      sender_id: '2',
      sender_name: 'Sarah Johnson',
      sender_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: "Definitely! I'm also participating in the coding competition.",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: 'm4',
      conversation_id: '1',
      sender_id: '1',
      sender_name: 'Janardhan',
      sender_avatar: 'https://i.pravatar.cc/150?img=12',
      content: "That's awesome! Good luck with the competition!",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
    },
    {
      id: 'm5',
      conversation_id: '1',
      sender_id: '2',
      sender_name: 'Sarah Johnson',
      sender_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      content: 'See you at the tech fest tomorrow!',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ],
  '2': [
    {
      id: 'm6',
      conversation_id: '2',
      sender_id: 'current-user',
      sender_name: 'You',
      sender_avatar: 'https://i.pravatar.cc/150?img=12',
      content: "Hey Mike, can you share the ML notes from yesterday's class?",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'm7',
      conversation_id: '2',
      sender_id: '3',
      sender_name: 'Mike Chen',
      sender_avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      content: "Sure! I'll send them in a bit.",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      id: 'm8',
      conversation_id: '2',
      sender_id: '3',
      sender_name: 'Mike Chen',
      sender_avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      content: 'Thanks! The ML notes really helped',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
};
