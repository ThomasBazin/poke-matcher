// Type de question
export type QuestionType =
  | {
      type: 'text';
      label: string;
    }
  | {
      type: 'radio';
      label: string;
      options: string[];
    }
  | {
      type: 'checkbox';
      label: string;
      options: string[];
      max?: number;
    };

export const questions: QuestionType[] = [
  {
    type: 'text',
    label: "What's your favourite colour ?",
  },
  {
    type: 'text',
    label: "What's your favourite food ?",
  },
  {
    type: 'radio',
    label: 'How would you describe yourself ?',
    options: ['More of an introvert', 'More of an extrovert', 'A bit of both'],
  },
  {
    type: 'checkbox',
    label: 'What elements do you prefer ?',
    options: ['Earth', 'Water', 'Air', 'Fire', 'Thunder', 'Ice', 'Flower'],
    max: 2,
  },
  {
    type: 'radio',
    label: "What's your favourite time of day ?",
    options: ['Morning', 'Mid-day', 'Afternoon', 'Evening', 'Night'],
  },
  {
    type: 'text',
    label: 'What do you enjoy doing in your free time ?',
  },
  {
    type: 'text',
    label:
      'In what type of environment do you feel most comfortable ? (e.g., mountains, seaside, city...)',
  },
  {
    type: 'radio',
    label: "What's your favourite type of game ?",
    options: [
      'Puzzle game',
      'Action-packed games',
      'Multiplayer games',
      'Guessing games',
      'A strategy game',
    ],
  },
  {
    type: 'radio',
    label: "What's your favourite school subject ?",
    options: ['Music', 'Art', 'Physical Education', 'Math', 'Science'],
  },
  {
    type: 'radio',
    label: "What's your biggest strength ?",
    options: [
      'Staying calm under pressure',
      'Being super strong and brave',
      'Keeping everyone in high spirits',
      'Being the smartest one in the room',
      'Knowing how people are feeling',
    ],
  },
];
