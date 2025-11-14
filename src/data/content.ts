import type { AppContent } from '../types';
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';
import pic5 from '../assets/pic5.jpg';

// Default content structure with placeholder data
export const content: AppContent = {
  intro: {
    title: "Retry? – Our Story So Far",
    subtitle: "Third time's the charm...",
  },
  stories: [
    {
      text: "So here we are, 9 days in our new relationship. together like we always should have been and already getting some cozy time alone on my resort house. Taking it slow of course...",
      image: pic1,
      imageAlt: "First memory",
    },
    {
      text: "Aaaand finally spending your birthday together. I hope this was the first of many that I will be by your side while you age beautifully.",
      image: pic2,
      imageAlt: "Second memory",
    },
    {
      text: "Our first normal vacations 🎉🎉 Even for 2 days I had a great time going places with you. I still remember those benches that we didnt stop for though...What a shame, they had great view😢",
      image: pic3,
      imageAlt: "Third memory",
    },
    {
      text: "It might not be like the summer vacations you went with your friends (and it was at your house no less) but atleast it was a like a trial, like living together and chilling all day ⛱️",
      image: pic4,
      imageAlt: "Fourth memory",
    },
    {
      text: "My favourite! Huuuggieees! Us, everyday, forever, maybe with a little kitty",
      image: pic5,
      imageAlt: "Fifth memory",
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
            message: "That's a very wrong choice 😂",
          },
        },
        {
          id: "cry",
          text: "Cry",
          response: {
            message: "Like always🚿",
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
    {
      prompt: "What am I?",
      options: [
        {
          id: "boyfriend",
          text: "The best boyfriend",
          response: {
            message: "Of course I am 😎",
          },
        },
        {
          id: "right",
          text: "Right",
          response: {
            message: "Always 💯",
          },
        },
        {
          id: "grumpy",
          text: "Grumpy",
          response: {
            message: "Let's see if I stop complaining now 😤",
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
