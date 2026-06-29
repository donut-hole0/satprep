import type { Section, Difficulty } from "./satBank";

/**
 * ORIGINAL AceBoard practice questions — written by us, not College Board.
 * Mapped to the official SAT taxonomy (Section → Domain → Skill + difficulty)
 * so they slot into the same bank UI. These are the in-app practiceable items;
 * official College Board questions are deep-linked instead.
 */
export interface AceboardQuestion {
  id: string;
  section: Section;
  domain: string;
  skill: string;
  difficulty: Difficulty;
  stem: string;
  choices: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

const c = (a: string, b: string, cc: string, d: string) => [
  { key: "A", text: a },
  { key: "B", text: b },
  { key: "C", text: cc },
  { key: "D", text: d },
];

export const ACEBOARD_QUESTIONS: AceboardQuestion[] = [
  // ---- Math · Algebra ----
  {
    id: "ab-001",
    section: "Math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "Easy",
    stem: "If 5x − 8 = 27, what is the value of x?",
    choices: c("5", "7", "19", "35"),
    correctKey: "B",
    explanation: "Add 8 to both sides: 5x = 35. Divide by 5: x = 7.",
  },
  {
    id: "ab-002",
    section: "Math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Medium",
    stem: "The function f is defined by f(x) = −2x + 9. For what value of x does f(x) = 1?",
    choices: c("2", "4", "5", "7"),
    correctKey: "B",
    explanation: "Set −2x + 9 = 1, so −2x = −8, giving x = 4.",
  },
  {
    id: "ab-003",
    section: "Math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "Medium",
    stem: "If x + y = 10 and x − y = 4, what is the value of x?",
    choices: c("3", "5", "6", "7"),
    correctKey: "D",
    explanation: "Add the equations: 2x = 14, so x = 7.",
  },
  {
    id: "ab-004",
    section: "Math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "Medium",
    stem: "Which value of x satisfies the inequality 3x − 5 > 7?",
    choices: c("5", "4", "3", "2"),
    correctKey: "A",
    explanation: "3x − 5 > 7 gives 3x > 12, so x > 4. Of the choices, only 5 is greater than 4.",
  },
  // ---- Math · Advanced Math ----
  {
    id: "ab-005",
    section: "Math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "Medium",
    stem: "Which expression is equivalent to (x + 3)(x − 5)?",
    choices: c("x² − 2x − 15", "x² + 2x − 15", "x² − 2x + 15", "x² − 8x − 15"),
    correctKey: "A",
    explanation: "Expand: x² − 5x + 3x − 15 = x² − 2x − 15.",
  },
  {
    id: "ab-006",
    section: "Math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "Hard",
    stem: "For the function f(x) = x² − 6x + 5, which are the x-values where f(x) = 0?",
    choices: c("1 and 5", "−1 and −5", "2 and 3", "0 and 6"),
    correctKey: "A",
    explanation: "Factor: x² − 6x + 5 = (x − 1)(x − 5), so the zeros are x = 1 and x = 5.",
  },
  // ---- Math · Problem-Solving and Data Analysis ----
  {
    id: "ab-007",
    section: "Math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Easy",
    stem: "A jacket priced at $80 is marked down by 15%. What is the new price?",
    choices: c("$65", "$68", "$72", "$95"),
    correctKey: "B",
    explanation: "15% of $80 is $12. $80 − $12 = $68.",
  },
  {
    id: "ab-008",
    section: "Math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "Easy",
    stem: "A recipe uses 2 cups of flour for every 3 cups of sugar. If 8 cups of flour are used, how many cups of sugar are needed?",
    choices: c("5", "9", "12", "16"),
    correctKey: "C",
    explanation: "The ratio 2:3 scales by 4 (since 2 × 4 = 8), so sugar = 3 × 4 = 12 cups.",
  },
  // ---- Math · Geometry and Trigonometry ----
  {
    id: "ab-009",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "Medium",
    stem: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    choices: c("10", "12", "14", "48"),
    correctKey: "A",
    explanation: "By the Pythagorean theorem, √(6² + 8²) = √(36 + 64) = √100 = 10.",
  },
  {
    id: "ab-010",
    section: "Math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "Easy",
    stem: "A circle has a radius of 5. What is its area?",
    choices: c("10π", "25π", "5π", "50π"),
    correctKey: "B",
    explanation: "Area = πr² = π(5²) = 25π.",
  },
  // ---- Reading and Writing · Standard English Conventions ----
  {
    id: "ab-011",
    section: "Reading and Writing",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Easy",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?\n\n“The museum's new exhibit, which opened last week, ___ already attracted thousands of visitors.”",
    choices: c("have", "has", "having", "to have"),
    correctKey: "B",
    explanation: "The subject “exhibit” is singular, so the singular present-perfect verb “has attracted” is correct.",
  },
  {
    id: "ab-012",
    section: "Reading and Writing",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Easy",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?\n\n“She studied for weeks ___ she felt confident on test day.”",
    choices: c(", so", "; so", " so,", " so"),
    correctKey: "A",
    explanation: "Two independent clauses joined by the coordinating conjunction “so” take a comma before it: “…for weeks, so she felt…”.",
  },
  // ---- Reading and Writing · Craft and Structure ----
  {
    id: "ab-013",
    section: "Reading and Writing",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    stem: "Which choice completes the text with the most logical and precise word?\n\n“The scientist's explanation was so ___ that even nonexperts could follow it easily.”",
    choices: c("lucid", "obscure", "tedious", "verbose"),
    correctKey: "A",
    explanation: "“Lucid” means clear and easy to understand, which fits an explanation nonexperts can follow. The others suggest unclear, boring, or wordy.",
  },
  // ---- Reading and Writing · Expression of Ideas ----
  {
    id: "ab-014",
    section: "Reading and Writing",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    stem: "Which transition best fits the blank?\n\n“The new policy reduced costs significantly. ___, it improved employee satisfaction.”",
    choices: c("However", "Therefore", "Moreover", "Instead"),
    correctKey: "C",
    explanation: "The second sentence adds another positive effect, so the additive transition “Moreover” fits. “However” and “Instead” signal contrast; “Therefore” signals a result.",
  },
  // ---- Reading and Writing · Information and Ideas ----
  {
    id: "ab-015",
    section: "Reading and Writing",
    domain: "Information and Ideas",
    skill: "Central Ideas and Details",
    difficulty: "Medium",
    stem: "“Octopuses are remarkably intelligent: they can solve puzzles, use tools, and even recognize individual humans. Despite having no backbone, they display problem-solving abilities once thought unique to vertebrates.”\n\nWhich choice best states the main idea of the text?",
    choices: c(
      "Octopuses are the most intelligent creatures in the ocean.",
      "Octopuses show intelligence usually associated with vertebrates.",
      "Octopuses primarily use tools to find food.",
      "Octopuses cannot survive without a backbone.",
    ),
    correctKey: "B",
    explanation: "The text emphasizes that octopuses, despite being invertebrates, show problem-solving once thought unique to vertebrates. The other choices overstate or distort details.",
  },
];
