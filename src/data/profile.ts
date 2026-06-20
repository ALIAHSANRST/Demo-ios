/** Profile screen ("My MIRRA") — Ariana Luterman, from the Figma profile frame. */
export const profile = {
  name: 'Ariana Luterman',
  role: 'Triathlete, Creator',
  followers: '72.5k',
  location: 'Cardiff-by-the-Sea, Encinitas, CA',
  photo: 'ariana' as const,
};

export const profileStats: { value: string; label: string; delta?: string }[] = [
  { value: '64', label: 'PROFILE VIEWS', delta: '20%' },
  { value: '35', label: 'DP CHATS', delta: '+14%' },
  { value: '18', label: 'CONNECTIONS', delta: '+14%' },
  { value: '1K', label: 'TOTAL VIEWS' },
  { value: '16', label: 'LINKS CLICKS', delta: '+14%' },
];

export const dpConversations = {
  count: '260',
  items: [
    { id: 'q1', kicker: 'Anonymous Ask:', text: 'What does Ariana do for work?' },
  ],
};
