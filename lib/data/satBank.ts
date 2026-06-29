/**
 * AceBoard's official-aligned question bank.
 *
 * Mirrors the College Board SAT Suite Educator Question Bank taxonomy
 * (Section → Domain → Skill + difficulty). We catalog official questions by
 * their public Question ID and *deep-link* out to College Board — we do NOT
 * copy College Board's copyrighted question content into our database. Students
 * practice on the official bank; AceBoard provides the filtering + progress
 * tracking layer.
 *
 * Taxonomy is the public SAT assessment framework. OFFICIAL_QUESTIONS is a real
 * (expandable) sample of question references captured from the official bank.
 */

export type Section = "Reading and Writing" | "Math";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface BankQuestion {
  id: string; // official College Board Question ID (e.g. "ac472881")
  section: Section;
  domain: string;
  skill: string;
  difficulty: Difficulty;
}

export interface DomainNode {
  domain: string;
  skills: string[];
}

/** The official bank has no per-question permalink — link to the search tool. */
export const OFFICIAL_BANK_URL =
  "https://satsuiteeducatorquestionbank.collegeboard.org/digital/search";

export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

/** Full public SAT framework: Section → Domain → Skill. */
export const TAXONOMY: { section: Section; domains: DomainNode[] }[] = [
  {
    section: "Reading and Writing",
    domains: [
      {
        domain: "Information and Ideas",
        skills: ["Central Ideas and Details", "Inferences", "Command of Evidence"],
      },
      {
        domain: "Craft and Structure",
        skills: [
          "Words in Context",
          "Text Structure and Purpose",
          "Cross-Text Connections",
        ],
      },
      {
        domain: "Expression of Ideas",
        skills: ["Rhetorical Synthesis", "Transitions"],
      },
      {
        domain: "Standard English Conventions",
        skills: ["Boundaries", "Form, Structure, and Sense"],
      },
    ],
  },
  {
    section: "Math",
    domains: [
      {
        domain: "Algebra",
        skills: [
          "Linear equations in one variable",
          "Linear equations in two variables",
          "Linear functions",
          "Systems of two linear equations in two variables",
          "Linear inequalities in one or two variables",
        ],
      },
      {
        domain: "Advanced Math",
        skills: [
          "Equivalent expressions",
          "Nonlinear equations in one variable and systems of equations in two variables",
          "Nonlinear functions",
        ],
      },
      {
        domain: "Problem-Solving and Data Analysis",
        skills: [
          "Ratios, rates, proportional relationships, and units",
          "Percentages",
          "One-variable data: distributions and measures of center and spread",
          "Two-variable data: models and scatterplots",
          "Probability and conditional probability",
          "Inference from sample statistics and margin of error",
          "Evaluating statistical claims: observational studies and experiments",
        ],
      },
      {
        domain: "Geometry and Trigonometry",
        skills: [
          "Area and volume",
          "Lines, angles, and triangles",
          "Right triangles and trigonometry",
          "Circles",
        ],
      },
    ],
  },
];

/**
 * Real question references captured from the official bank (id + classification
 * only — facts, not content). Expand this list to grow the catalog.
 */
export const OFFICIAL_QUESTIONS: BankQuestion[] = [
  // Math · Algebra
  { id: "ac472881", section: "Math", domain: "Algebra", skill: "Linear equations in one variable", difficulty: "Hard" },
  { id: "fa80893a", section: "Math", domain: "Algebra", skill: "Linear equations in one variable", difficulty: "Easy" },
  { id: "002dba45", section: "Math", domain: "Algebra", skill: "Linear equations in two variables", difficulty: "Medium" },
  { id: "3008cfc3", section: "Math", domain: "Algebra", skill: "Linear equations in two variables", difficulty: "Hard" },
  { id: "3d1070c9", section: "Math", domain: "Algebra", skill: "Linear functions", difficulty: "Easy" },
  { id: "bd9eb2b5", section: "Math", domain: "Algebra", skill: "Linear functions", difficulty: "Easy" },
  { id: "1480dd5c", section: "Math", domain: "Algebra", skill: "Linear functions", difficulty: "Easy" },
  { id: "3f5a3602", section: "Math", domain: "Algebra", skill: "Systems of two linear equations in two variables", difficulty: "Hard" },
  { id: "edc1b7b7", section: "Math", domain: "Algebra", skill: "Systems of two linear equations in two variables", difficulty: "Hard" },
  { id: "f224df07", section: "Math", domain: "Algebra", skill: "Linear inequalities in one or two variables", difficulty: "Medium" },
  // Reading and Writing · Information and Ideas
  { id: "87aa7bab", section: "Reading and Writing", domain: "Information and Ideas", skill: "Central Ideas and Details", difficulty: "Medium" },
  { id: "d73a908a", section: "Reading and Writing", domain: "Information and Ideas", skill: "Central Ideas and Details", difficulty: "Medium" },
  { id: "ed314256", section: "Reading and Writing", domain: "Information and Ideas", skill: "Central Ideas and Details", difficulty: "Hard" },
  { id: "8c1be131", section: "Reading and Writing", domain: "Information and Ideas", skill: "Central Ideas and Details", difficulty: "Medium" },
  { id: "92c2564d", section: "Reading and Writing", domain: "Information and Ideas", skill: "Central Ideas and Details", difficulty: "Medium" },
  { id: "f1bfbed3", section: "Reading and Writing", domain: "Information and Ideas", skill: "Inferences", difficulty: "Hard" },
  { id: "d748c3fd", section: "Reading and Writing", domain: "Information and Ideas", skill: "Inferences", difficulty: "Medium" },
  { id: "6b8a7c74", section: "Reading and Writing", domain: "Information and Ideas", skill: "Inferences", difficulty: "Hard" },
  { id: "a15b3219", section: "Reading and Writing", domain: "Information and Ideas", skill: "Command of Evidence", difficulty: "Hard" },
  { id: "22e4d633", section: "Reading and Writing", domain: "Information and Ideas", skill: "Command of Evidence", difficulty: "Medium" },
];
