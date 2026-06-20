import { Img } from '@/theme/images';

export type NetworkCard = {
  id: string;
  name: string;
  role: string;
  connections: string;
  location: string;
  photo: keyof typeof Img;
  avatar: keyof typeof Img;
  interests: (keyof typeof Img)[];
  skills: (keyof typeof Img)[];
  roleText: string;
  education: keyof typeof Img;
  activeIndex: number;
  total: number;
};

/** The four "MIRRA Network Card" instances from the Figma network feed. */
export const networkCards: NetworkCard[] = [
  {
    id: 'logan',
    name: 'Logan Armstrong',
    role: 'Creator, Entrepreneur',
    connections: '264',
    location: 'Cardiff-by-the-Sea, Encinitas, CA',
    photo: 'netLogan',
    avatar: 'avLogan',
    interests: ['emojiTennis', 'emojiGolf', 'emojiTravel'],
    skills: ['logoWebflow', 'logoFigma'],
    roleText: 'Startup Founder Focused on SaaS & Growth',
    education: 'logoCalstate',
    activeIndex: 0,
    total: 4,
  },
  {
    id: 'darin',
    name: 'Darin Smith',
    role: 'Software Consultant, Athlete',
    connections: '264',
    location: 'Cardiff-by-the-Sea, Encinitas, CA',
    photo: 'netDarin',
    avatar: 'avDarin',
    interests: ['emojiTennis', 'emojiGolf', 'emojiTravel'],
    skills: ['logoFigma', 'logoFramer'],
    roleText: 'Startup Founder Focused on SaaS & Growth',
    education: 'logoCalstate',
    activeIndex: 0,
    total: 4,
  },
  {
    id: 'celia',
    name: 'Celia Smith',
    role: 'Luxury Travel. Curated Community ✨ Expand by Design',
    connections: '23K',
    location: 'Cardiff-by-the-Sea, Encinitas, CA',
    photo: 'netCelia',
    avatar: 'avCelia',
    interests: ['emojiTravel', 'emojiSkiing', 'emojiVideo'],
    skills: ['logoWebflow', 'logoAe'],
    roleText: 'Startup Founder Focused on SaaS & Growth',
    education: 'logoCalstate',
    activeIndex: 0,
    total: 4,
  },
  {
    id: 'sage',
    name: 'Sage Miller',
    role: 'High performance coach for women 🖤',
    connections: '23K',
    location: 'Cardiff-by-the-Sea, Encinitas, CA',
    photo: 'netSage',
    avatar: 'avSage',
    interests: ['emojiCars', 'emojiTennis', 'emojiGolf'],
    skills: ['logoFigma', 'logoAe'],
    roleText: 'Startup Founder Focused on SaaS & Growth',
    education: 'logoCalstate',
    activeIndex: 0,
    total: 4,
  },
];

/** Filter chips above the feed. The first ("Things in Common") is the active/lime one. */
export const networkFilters: { label: string; emoji?: keyof typeof Img; active?: boolean }[] = [
  { label: 'Things in Common', active: true },
  { label: 'Tennis', emoji: 'emojiTennis' },
  { label: 'Golf', emoji: 'emojiGolf' },
  { label: 'Travel', emoji: 'emojiTravel' },
  { label: 'Videography', emoji: 'emojiVideo' },
  { label: 'Lifestyle & Hobbies' },
  { label: 'Social & Culture' },
];
