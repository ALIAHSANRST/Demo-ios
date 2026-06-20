import { Img } from '@/theme/images';

export type Conversation =
  | {
      kind: 'dm';
      id: string;
      name: string;
      avatar: keyof typeof Img;
      verified: boolean;
      preview: string;
      previewVariant?: 'text' | 'typing';
      time: string;
      location?: string;
      unread?: number;
      isNew?: boolean;
      muted?: boolean;
      dpName: string; // e.g. "Evan's DP"
    }
  | {
      kind: 'group';
      id: string;
      name: string;
      avatar: keyof typeof Img;
      sender: string; // "Evan:" / "You:"
      preview: string;
      time: string;
      seen?: boolean;
    };

export const primaryCount = 2;
export const requestCount = 2;

export const conversations: Conversation[] = [
  {
    kind: 'dm',
    id: '1',
    name: 'Evan Nicolini',
    avatar: 'evan',
    verified: true,
    preview: "Sounds great, let's do it!",
    time: 'Now',
    location: 'San Diego',
    isNew: true,
    unread: 2,
    dpName: "Evan's DP",
  },
  {
    kind: 'dm',
    id: '2',
    name: 'Emmitt Burk',
    avatar: 'justin',
    verified: true,
    preview: 'Can you send the file over?',
    time: '1 Hour',
    location: 'San Diego',
    dpName: "Emmitt's DP",
  },
  {
    kind: 'dm',
    id: '3',
    name: 'Chelsea Smithback',
    avatar: 'chelsea',
    verified: true,
    preview: 'What would you like to ask about Chelsea?',
    previewVariant: 'typing',
    time: '2 Hours',
    location: 'San Diego',
    dpName: "Chelsea's DP",
  },
  {
    kind: 'group',
    id: '4',
    name: 'MIRRA Team',
    avatar: 'groupSF',
    sender: 'Evan:',
    preview: 'It looks good, but we need to make these',
    time: 'Yesterday',
  },
  {
    kind: 'group',
    id: '5',
    name: 'California Explorers',
    avatar: 'groupSF',
    sender: 'You:',
    preview: "Let's visit the museum first",
    time: 'Sunday',
    seen: true,
  },
];
