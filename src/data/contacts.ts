import { Img } from '@/theme/images';

export type Block =
  | { kind: 'text'; label: string; icon?: string; value: string }
  | { kind: 'icons'; label: string; icons: string[]; more?: number };

export type Contact = {
  id: string;
  name: string;
  title: string;
  photo: keyof typeof Img;
  verified: boolean;
  inCommon: number;
  blocks: Block[];
};

export const categories = ['Tennis', 'Golf', 'Travel', 'Learning & Professional', 'Lifestyle & Hobbies', 'Social & Culture'];

export const categoryIcons: Record<string, string> = {
  Tennis: '🎾',
  Golf: '⛳',
  Travel: '✈️',
  'Learning & Professional': '📚',
  'Lifestyle & Hobbies': '🎨',
  'Social & Culture': '🎭',
};

const evanBlocks: Block[] = [
  { kind: 'text', label: 'Location', icon: 'map.fill', value: 'Mission Beach, San Diego' },
  { kind: 'icons', label: 'Interests', icons: ['🎾', '⛳', '✈️'], more: 2 },
  { kind: 'icons', label: 'Pro Skills', icons: ['🎥', '🎬', '📷'], more: 2 },
  { kind: 'text', label: 'Role', value: 'Founder' },
  { kind: 'icons', label: 'Education', icons: ['🎓'] },
  { kind: 'icons', label: 'Experience', icons: ['🏢', '🎞️'] },
  { kind: 'icons', label: 'Events', icons: ['🎟️'] },
];

const chelseaBlocks: Block[] = [
  { kind: 'text', label: 'Location', icon: 'map.fill', value: 'Mission Beach, San Diego' },
  { kind: 'icons', label: 'Interests', icons: ['🧘', '🌿', '🏄'], more: 2 },
  { kind: 'icons', label: 'Pro Skills', icons: ['🩺', '🧪', '📚'], more: 2 },
  { kind: 'text', label: 'Role', value: 'UI/UX Designer' },
  { kind: 'icons', label: 'Education', icons: ['🎓'] },
  { kind: 'icons', label: 'Experience', icons: ['🏥', '🌱'] },
  { kind: 'icons', label: 'Events', icons: ['🎟️'] },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Evan Nicolini', title: 'Founder - Custom Esignature', photo: 'evan', verified: true, inCommon: 3, blocks: evanBlocks },
  { id: '2', name: 'Chelsea Smithback', title: 'Resident Naturopathic Doctor', photo: 'chelsea', verified: true, inCommon: 3, blocks: chelseaBlocks },
  { id: '3', name: 'Evan Nicolini', title: 'Founder - Custom Esignature', photo: 'evan', verified: true, inCommon: 3, blocks: evanBlocks },
];
