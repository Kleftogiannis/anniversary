// Content type interfaces for Anniversary Love Game

export interface IntroContent {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export interface StoryContent {
  text: string;
  image?: string;
  imageAlt: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  response: {
    message: string;
    image?: string;
    animation?: string;
  };
}

export interface ChoiceContent {
  prompt: string;
  options: ChoiceOption[];
}

export interface FinaleContent {
  message: string;
  submessage?: string;
  animation?: string;
  qrCode?: string;
}

export interface AppContent {
  intro: IntroContent;
  stories: StoryContent[];
  choices: ChoiceContent[];
  finale: FinaleContent;
}
