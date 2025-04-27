export interface StudyTechniqueType {
  title: string;
  description: string;
  tips: string;
}

export const studyTechniques: StudyTechniqueType[] = [
  {
    title: "Pomodoro Technique",
    description: "Work for 25 minutes, then take a 5-minute break. After four cycles, take a longer break of 15-30 minutes.",
    tips: "Use our Pomodoro Timer to implement this effectively."
  },
  {
    title: "Spaced Repetition",
    description: "Review information at increasing intervals to improve long-term retention.",
    tips: "External tools like Anki are designed specifically for spaced repetition."
  },
  {
    title: "Active Recall",
    description: "Test yourself on material instead of passively reviewing it. This strengthens memory pathways.",
    tips: "Create flashcards or practice questions to implement this technique."
  },
  {
    title: "Feynman Technique",
    description: "Explain concepts in simple language as if teaching someone else to identify gaps in your understanding.",
    tips: "Write explanations or teach peers to practice this method."
  }
];