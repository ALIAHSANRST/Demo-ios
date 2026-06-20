import { Img } from '@/theme/images';

export type Span = { text: string; mention?: boolean };
export type Reaction = { emoji: string; count: number };

export type ChatItem =
  | {
      kind: 'msg';
      id: string;
      name: string;
      role?: 'Admin' | 'Owner';
      avatar: keyof typeof Img;
      spans: Span[];
      time: string;
      edited?: boolean;
      reactions?: Reaction[];
      own?: boolean;
      sendState?: 'sending';
    }
  | { kind: 'voice'; id: string; name: string; role?: 'Admin' | 'Owner'; avatar: keyof typeof Img; duration: string; time: string }
  | { kind: 'divider'; id: string; label: string; right?: string }
  | { kind: 'invite'; id: string; avatar: keyof typeof Img; inviter: string; text: string; group: string; note: string }
  | {
      kind: 'profile';
      id: string;
      name: string;
      role: 'Admin' | 'Owner';
      avatar: keyof typeof Img;
      location: string;
      spans: Span[];
      time: string;
    };

const t = (text: string): Span => ({ text });
const m = (text: string): Span => ({ text, mention: true });

export const groupHeader = {
  title: 'San Francisco Pickleball Community',
  members: '12.8K Members',
  online: '285 Online',
  avatar: 'groupSF' as const,
};

export const messages: ChatItem[] = [
  { kind: 'msg', id: '1', name: 'Maya Chen', role: 'Admin', avatar: 'maya', spans: [t('Hey everyone! Quick reminder to keep games to 15 mins if others are waiting 🙏')], time: '9:02 am', edited: true },
  { kind: 'msg', id: '2', name: 'Justin Bator', role: 'Admin', avatar: 'justin', spans: [t('Anyone up for doubles at 5pm today?')], time: '2 Hours', edited: true },
  { kind: 'msg', id: '3', name: 'Jason Miller', role: 'Admin', avatar: 'jason', spans: [t('I can invite my friend')], time: '9:05 am', edited: true },
  { kind: 'msg', id: '4', name: 'Sofia Ramirez', role: 'Admin', avatar: 'sofia', spans: [t('I’m new here 👋 would love to join a beginner group!')], time: '9:07 am', edited: true },
  { kind: 'msg', id: '5', name: 'Ethan Park', role: 'Owner', avatar: 'ethan', spans: [t('Welcome to all the new members! Feel free to introduce yourselves 🙂')], time: '9:10 am', edited: true },
  { kind: 'voice', id: 'v1', name: 'Liam O’Connor', role: 'Owner', avatar: 'liam', duration: '01:00', time: '9:18 am' },
  { kind: 'msg', id: '6', name: 'Liam O’Connor', role: 'Owner', avatar: 'liam', spans: [t('Courts at Dolores Park are pretty packed right now')], time: '9:18 am', edited: true },
  { kind: 'msg', id: '7', name: 'Ava Johnson', role: 'Owner', avatar: 'ava', spans: [t('I can bring extra balls if needed!')], time: '9:22 am', edited: true, reactions: [{ emoji: '❤️', count: 40 }, { emoji: '⚡', count: 2 }] },
  { kind: 'msg', id: '8', name: 'Isabella Garcia', role: 'Owner', avatar: 'isabella', spans: [t('Anyone know good indoor courts for rainy days?')], time: '9:25 am', edited: true },
  { kind: 'msg', id: '9', name: 'Noah Kim', role: 'Owner', avatar: 'noah', spans: [t('Running late, be there in 10')], time: '9:31 am', edited: true, reactions: [{ emoji: '❤️', count: 1 }, { emoji: '⚡', count: 2 }] },
  { kind: 'msg', id: '10', name: 'Daniel Lee', role: 'Admin', avatar: 'daniel', spans: [t('We’re planning a small tournament next weekend — I’ll share details soon!')], time: '9:40 am', edited: true },
  { kind: 'msg', id: '11', name: 'Olivia Brown', role: 'Admin', avatar: 'olivia', spans: [t('Yesterday’s games were super fun, thanks everyone!!')], time: '9:48 am', edited: true, reactions: [{ emoji: '❤️', count: 34 }, { emoji: '⚡', count: 123 }] },
  { kind: 'msg', id: '12', name: 'You', avatar: 'olivia', own: true, spans: [t('Hey, does anyone want to play today?')], time: '2 Minutes', edited: true, sendState: 'sending' },
  { kind: 'divider', id: 'd1', label: 'New', right: 'Today' },
  { kind: 'invite', id: 'inv1', avatar: 'justin', inviter: 'Justin Bator:', text: 'Invited you to join the group', group: 'San Francisco Pickleball Community', note: 'Visible only to you' },
  { kind: 'profile', id: 'p1', name: 'Olivia Brown', role: 'Admin', avatar: 'olivia', location: 'San Francisco', spans: [m('@Olivia Brown'), t(' This is a sample message used for chat bubble layout testing and it continues to the next line naturally')], time: '2 Minutes' },
  { kind: 'msg', id: '13', name: 'Olivia Brown', role: 'Owner', avatar: 'olivia', spans: [m('@Andriy Boychuk'), t(' one line message')], time: 'Now', edited: true },
];
