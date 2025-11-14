import type { AppContent } from '../types';

// Default content structure with placeholder data
export const content: AppContent = {
  intro: {
    title: "Retry? – Our Story So Far",
    subtitle: "Third time's the charm...",
  },
  stories: [
    {
      text: "Story paragraph 1...",
      imageAlt: "First memory",
    },
    {
      text: "Story paragraph 2...",
      imageAlt: "Second memory",
    },
  ],
  choices: [
    {
      prompt: "What would you do if we had a fight?",
      options: [
        {
          id: "ignore",
          text: "Ignore me",
          response: {
            message: "Classic move! 😂",
          },
        },
        {
          id: "cry",
          text: "Cry",
          response: {
            message: "We've all been there... 🚿",
          },
        },
        {
          id: "apologize",
          text: "Apologize",
          response: {
            message: "The mature choice! 💕",
          },
        },
      ],
    },
    {
      prompt: "What should you do when I am grumpy?",
      options: [
        {
          id: "hug",
          text: "Hug me",
          response: {
            message: "I always love that 🤗",
          },
        },
        {
          id: "feed",
          text: "Feed me",
          response: {
            message: "That's my girl! 🍕",
          },
        },
        {
          id: "angry",
          text: "Get angry",
          response: {
            message: "I don't like that 😔",
          },
        },
      ],
    },
  ],
  finale: {
    message: "1 Year Together – Achievement Unlocked",
    submessage: "Here's to many more adventures! 🎉",
  },
};
