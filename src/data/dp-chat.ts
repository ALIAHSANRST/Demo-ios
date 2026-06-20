/** Digital Persona chat ("DP Modal") — Evan's AI persona, from the Figma chatbot frame. */
export const dpChat = {
  name: 'Evan',
  avatar: 'evanAv' as const,
  backdrop: 'evanBg' as const,
  title: 'Hey, you’re chatting with Evan’s digital persona.',
  messages: [
    {
      id: 'm1',
      from: 'dp' as const,
      text: 'Hey what’s up. I’m trained to think and speak just like Evan, so ask me anything you want like you would normally text me.\n\nFirst, let me know if you want to stay anonymous or use your name?',
      time: '4:56 pm',
    },
    { id: 'm2', from: 'me' as const, text: 'Stay Anonymous', time: '4:56 pm' },
  ],
};
