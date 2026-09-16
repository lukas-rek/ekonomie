import React from 'react';

export type CardType = 
  | 'concept' 
  | 'quiz_choice' 
  | 'quiz_tf' 
  | 'scenario' 
  | 'completion';

export interface BaseCard {
  id: string;
  tag: string;
  type: CardType;
  title: string;
  subtitle?: string;
}

export interface ConceptCardData extends BaseCard {
  type: 'concept';
  shortText: string[]; // 1-3 sentences max
  visual: React.ReactNode;
  takeawayPill?: string;
}

export interface QuizChoiceCardData extends BaseCard {
  type: 'quiz_choice';
  question: string;
  options: {
    id: string;
    text: string;
    detail?: string;
  }[];
  correctId: string;
  explanation: string;
}

export interface QuizTFCardData extends BaseCard {
  type: 'quiz_tf';
  statement: string;
  correctAnswer: boolean; // true = Pravda, false = Lež
  explanation: string;
}

export interface ScenarioCardData extends BaseCard {
  type: 'scenario';
  context: string;
  prompt: string;
}

export interface CompletionCardData extends BaseCard {
  type: 'completion';
  chapterTitle: string;
  chapterNumber: string;
  takeaways: {
    title: string;
    desc: string;
  }[];
}

export type LessonCard = 
  | ConceptCardData 
  | QuizChoiceCardData 
  | QuizTFCardData 
  | ScenarioCardData 
  | CompletionCardData;
