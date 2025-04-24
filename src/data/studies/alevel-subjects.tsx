"use client"

import { ReactNode } from "react";
import { 
  Palette as PaletteIcon, // Art
  BookOpen as BookOpenAltIcon, // English
  Building as BuildingIcon, // Business
  FlaskConical as FlaskIcon, // Chemistry
  Languages as LanguagesIcon, // Chinese
  BookA as BookIcon, // German
  Cpu as CpuIcon, // Computer Science
  Globe as GlobeIcon, // Geography, ESL
  History as HistoryIcon, // History
  Smartphone as SmartphoneIcon, // ICT
  Calculator as CalculatorIcon, // Mathematics
  Music as MusicIcon, // Music
  Atom as AtomIcon, // Physics
  Brain as BrainIcon, // Biology
  Eye as EyeIcon, // Psychology
  BarChart as BarChartIcon, // Economics
  BadgeDollarSign as BadgeIcon, // Accounting
  Briefcase as BriefcaseIcon, // Business Management
  Presentation as PresentationIcon, // Law
  Microscope as MicroscopeIcon, // Sciences
} from "lucide-react";

export interface Resource {
  id: string;
  name: string;
  description?: string;
  type: string;
  url: string;
  category?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  icon: ReactNode;
  resources: Resource[];
}

export const alevelSubjects: Subject[] = [
  {
    id: "alevel-math",
    code: "9709",
    name: "Mathematics",
    icon: <CalculatorIcon className="h-5 w-5 text-violet-500" />,
    resources: [
      {
        id: "math-theory-quadratics",
        name: "Quadratics",
        description: "Presentation on quadratic equations for AS & A Level Mathematics",
        type: "pptx",
        url: "/as&a/mathematics/theory/1. Quadratics.pptx",
        category: "theory"
      },
      {
        id: "math-theory-coordinate",
        name: "Coordinate Geometry",
        description: "Guide to coordinate geometry for AS & A Level Mathematics",
        type: "pdf",
        url: "/as&a/mathematics/theory/3. Coordinate geometry.pdf",
        category: "theory"
      },
      {
        id: "math-theory-circular",
        name: "Circular Measure",
        description: "Explanation of circular measure concepts for AS & A Level Mathematics",
        type: "pdf",
        url: "/as&a/mathematics/theory/4. Circular measure.pdf",
        category: "theory"
      },
      {
        id: "math-theory-functions",
        name: "Functions",
        description: "Comprehensive guide to functions for AS & A Level Mathematics",
        type: "pdf",
        url: "/as&a/mathematics/theory/Functions.pdf",
        category: "theory"
      },
      {
        id: "math-tips-aslevel",
        name: "AS-level Mathematics Tips",
        description: "Study tips and advice for AS-level Mathematics students",
        type: "docx",
        url: "/as&a/mathematics/tips/AS-level Mathematics tips.docx",
        category: "tips"
      },
      {
        id: "math-tips-guide",
        name: "Mathematics Learner Guide",
        description: "Comprehensive learner guide for Mathematics students",
        type: "pdf",
        url: "/as&a/mathematics/tips/LG_maths0.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "alevel-physics",
    code: "9702",
    name: "Physics",
    icon: <AtomIcon className="h-5 w-5 text-blue-700" />,
    resources: [
      {
        id: "physics-books-learning",
        name: "AS Physics Learning Guide",
        description: "Comprehensive learning guide for AS Physics students",
        type: "pdf",
        url: "/as&a/physics/books&files/AS Physics Learning Guide.pdf",
        category: "book&files"
      },
      {
        id: "physics-books-revision",
        name: "AS Physics Revision",
        description: "Revision materials for AS Physics",
        type: "pdf",
        url: "/as&a/physics/books&files/AS Physics Revision.pdf",
        category: "book&files"
      },
      {
        id: "physics-books-revision-guide",
        name: "AS & A Level Revision Guide",
        description: "Complete revision guide for AS and A Level Physics",
        type: "pdf",
        url: "/as&a/physics/books&files/AS, A Revision Guide.pdf",
        category: "book&files"
      },
      {
        id: "physics-books-practical",
        name: "Student Guide: Practical Physics",
        description: "Comprehensive guide to practical physics for students",
        type: "pdf",
        url: "/as&a/physics/books&files/Student Guide Practical Physics (book).pdf",
        category: "book&files"
      },
      {
        id: "physics-notes-dynamics",
        name: "Topic 3: Dynamics Notes",
        description: "Detailed notes on dynamics for CAIE Physics A-level",
        type: "pdf",
        url: "/as&a/physics/notes/Notes - Topic 3 Dynamics - CAIE Physics A-level.pdf",
        category: "notes"
      }
    ],
  },
  {
    id: "alevel-chemistry",
    code: "9701",
    name: "Chemistry",
    icon: <FlaskIcon className="h-5 w-5 text-red-500" />,
    resources: [
      {
        id: "chemistry-theory-ch1",
        name: "Chapter 1: Moles and equations",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%201.%20Moles%20and%20equations.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch2",
        name: "Chapter 2: Electrons in atoms",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%202.%20Electrons%20in%20atoms.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch3",
        name: "Chapter 3: Atoms, molecules and stoichiometry",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%203.%20Atoms%2C%20molecules%20and%20stoichiometry.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch4",
        name: "Chapter 4: Chemical bonding",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%204.%20Chemical%20bonding_compressed.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch5",
        name: "Chapter 5: States of matter",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%205.%20States%20of%20matter.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch14",
        name: "Chapter 14: Introduction to organic chemistry",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%2014.%20Introduction%20to%20organic%20chemistry.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch15",
        name: "Chapter 15: Hydrocarbons",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%2015.%20Hydrocarbons_compressed.pdf",
        category: "theory"
      },
      {
        id: "chemistry-theory-ch16",
        name: "Chapter 16: Halogenoalkanes",
        description: "Theoretical content for AS & A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/theory/Chapter%2016.%20Halogenoalkanes.pdf",
        category: "theory"
      },
      {
        id: "chemistry-notes-general",
        name: "AS Level Chemistry: General Outline",
        description: "General notes and outline for AS Level Chemistry",
        type: "docx",
        url: "/as&a/chemistry/notes/AS%20level%20Chemistry_%20a%20general%20outline.docx",
        category: "notes"
      },
      {
        id: "chemistry-notes-practical",
        name: "CIE AS Chemistry Practical Notes",
        description: "Practical notes for CIE AS Chemistry exams",
        type: "pdf",
        url: "/as&a/chemistry/notes/cie-as-chemistry-9701-practical-v2-znotes.pdf",
        category: "notes"
      },
      {
        id: "chemistry-notes-theory",
        name: "CIE AS Chemistry Theory Notes",
        description: "Theory notes for CIE AS Chemistry exams",
        type: "pdf",
        url: "/as&a/chemistry/notes/cie-as-chemistry-9701-theory-v2-znotes.pdf",
        category: "notes"
      },
      {
        id: "chemistry-notes-aldehydes",
        name: "Identifying Aldehydes and Ketones",
        description: "Transcript guide for identifying aldehydes and ketones",
        type: "pdf",
        url: "/as&a/chemistry/notes/Identifying%20aldehydes%20and%20ketones%20-%20transcript.pdf",
        category: "notes"
      },
      {
        id: "chemistry-notes-cheatsheet",
        name: "OCR A-Level Chemistry Cheatsheet",
        description: "Comprehensive cheatsheet for OCR A-Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/notes/OCR%20A-LEVEL%20CHEMISTRY%20CHEATSHEET.pdf",
        category: "notes"
      },
      {
        id: "chemistry-notes-organic-map",
        name: "Organic Reactions Map",
        description: "Visual map of organic chemistry reactions",
        type: "jpg",
        url: "/as&a/chemistry/notes/Organic_Reactions_Map.jpg",
        category: "notes"
      },
      {
        id: "chemistry-notes-practical-guide",
        name: "AQA Practical Guide",
        description: "Practical guide for AQA Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/notes/practical-guide-aqa1.pdf",
        category: "notes"
      },
      {
        id: "chemistry-notes-r",
        name: "R Reference",
        description: "R reference for Chemistry",
        type: "png",
        url: "/as&a/chemistry/notes/R.png",
        category: "notes"
      },
      {
        id: "chemistry-notes-enthalpy",
        name: "Enthalpy Review for AS",
        description: "Review of enthalpy concepts for AS Level",
        type: "pdf",
        url: "/as&a/chemistry/notes/Review-Enthalpy-AS.pdf",
        category: "notes"
      },
      {
        id: "chemistry-bookfiles-specimen",
        name: "2016 Specimen Data Booklet",
        description: "Official specimen data booklet for Chemistry exams",
        type: "pdf",
        url: "/as&a/chemistry/book&files/164870-2016-specimen-data-booklet.pdf",
        category: "book&files"
      },
      {
        id: "chemistry-bookfiles-data",
        name: "9701 Chemistry Data Booklet",
        description: "Official data booklet for 9701 Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/book&files/9701_chemistry_data_booklet.pdf",
        category: "book&files"
      },
      {
        id: "chemistry-bookfiles-syllabus",
        name: "9701 Chemistry Syllabus",
        description: "Official syllabus for 9701 Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/book&files/9701_chemistry_syllabus.pdf",
        category: "book&files"
      },
      {
        id: "chemistry-bookfiles-practical",
        name: "A-level Chemistry Practical",
        description: "Guide for A-level Chemistry practical work",
        type: "pdf",
        url: "/as&a/chemistry/book&files/A-level%20chemistry%20Practical%20chemistry_compressed.pdf",
        category: "book&files"
      },
      {
        id: "chemistry-bookfiles-workbook",
        name: "AS and A Level Chemistry Workbook",
        description: "Workbook for AS and A Level Chemistry",
        type: "pdf",
        url: "/as&a/chemistry/book&files/as%20and%20a%20level%20chemistry%20workbook.pdf",
        category: "book&files"
      }
    ],
  },
  {
    id: "alevel-biology",
    code: "9700",
    name: "Biology",
    icon: <BrainIcon className="h-5 w-5 text-green-500" />,
    resources: [
      {
        id: "biology-tips-alevel-general",
        name: "AS Level Biology - General Advice",
        description: "General tips and advice for AS Level Biology students",
        type: "pdf",
        url: "/as&a/biology/tips/As%20level%20Biology%20-%20A%20General%20advise.pdf",
        category: "tips"
      },
      {
        id: "biology-tips-alevel",
        name: "AS Level Biology Tips",
        description: "Study tips and guidance for AS Level Biology",
        type: "docx",
        url: "/as&a/biology/tips/BIOLOGY%20AS%20LEVEL%20TIPS.docx",
        category: "tips"
      },
      {
        id: "biology-theory-alevel-ch1",
        name: "AS Level Biology - Chapter 1",
        description: "Chapter 1 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%201.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch2",
        name: "AS Level Biology - Chapter 2",
        description: "Chapter 2 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%202.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch3",
        name: "AS Level Biology - Chapter 3",
        description: "Chapter 3 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%203.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch4",
        name: "AS Level Biology - Chapter 4",
        description: "Chapter 4 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%204.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch5",
        name: "AS Level Biology - Chapter 5",
        description: "Chapter 5 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%205.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch6",
        name: "AS Level Biology - Chapter 6",
        description: "Chapter 6 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%206.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch7",
        name: "AS Level Biology - Chapter 7",
        description: "Chapter 7 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%207_compressed%20(1).pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch8",
        name: "AS Level Biology - Chapter 8",
        description: "Chapter 8 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%208.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch9",
        name: "AS Level Biology - Chapter 9",
        description: "Chapter 9 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%209.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch10",
        name: "AS Level Biology - Chapter 10",
        description: "Chapter 10 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%2010.pdf",
        category: "theory"
      },
      {
        id: "biology-theory-alevel-ch11",
        name: "AS Level Biology - Chapter 11",
        description: "Chapter 11 notes for AS Level Biology",
        type: "pdf",
        url: "/as&a/biology/theory/As%20level%20Biology%20-%20Chapter%2011.pdf",
        category: "theory"
      }
    ],
  },
  {
    id: "alevel-economics",
    code: "9708",
    name: "Economics",
    icon: <BarChartIcon className="h-5 w-5 text-emerald-600" />,
    resources: [
      {
        id: "economics-theory-ch1-1-6",
        name: "Economics AS Chapter 1 (Parts 1-6)",
        description: "Chapter 1 theory content for AS Level Economics (Parts 1-6)",
        type: "pdf",
        url: "/as&a/economics/theory/Economics-AS_chapter-1_1-6.pdf",
        category: "theory"
      },
      {
        id: "economics-theory-ch1-7-11",
        name: "Economics AS Chapter 1 (Parts 7-11)",
        description: "Chapter 1 theory content for AS Level Economics (Parts 7-11)",
        type: "pdf",
        url: "/as&a/economics/theory/Economics-AS_chapter-1_7-11.pdf",
        category: "theory"
      },
      {
        id: "economics-theory-ch2-1-6",
        name: "Economics AS Chapter 2 (Parts 1-6)",
        description: "Chapter 2 theory content for AS Level Economics (Parts 1-6)",
        type: "pdf",
        url: "/as&a/economics/theory/Economics-AS_chapter-2_1-6pdf.pdf",
        category: "theory"
      },
      {
        id: "economics-theory-ch2-7-11",
        name: "Economics AS Chapter 2 (Parts 7-11)",
        description: "Chapter 2 theory content for AS Level Economics (Parts 7-11)",
        type: "pdf",
        url: "/as&a/economics/theory/Economics-AS_chapter-2_7-11_compressed.pdf",
        category: "theory"
      },
      {
        id: "economics-theory-ch3",
        name: "Economics AS Chapter 3",
        description: "Chapter 3 theory content for AS Level Economics",
        type: "pdf",
        url: "/as&a/economics/theory/Economics-AS_chapter-3_pdf.pdf",
        category: "theory"
      }
    ],
  },
  {
    id: "alevel-geography",
    code: "9696",
    name: "Geography",
    icon: <GlobeIcon className="h-5 w-5 text-emerald-500" />,
    resources: [
      {
        id: "geography-theory-rainfall",
        name: "Rainfall Discharge Relationships",
        description: "Diagram showing rainfall discharge relationships within drainage basins",
        type: "jpg",
        url: "/as&a/geography/theory/AS Rainfall discharge relationships within drainage basins.jpg",
        category: "theory"
      },
      {
        id: "geography-theory-migration",
        name: "Migration Impact",
        description: "Presentation on the impact of migration for AS & A Level Geography",
        type: "pptx",
        url: "/as&a/geography/theory/Geography_migration_impact.pptx",
        category: "theory"
      },
      {
        id: "geography-tips-guide",
        name: "AS & A Level Learner Guide",
        description: "Comprehensive guide for AS and A Level Geography students",
        type: "pdf",
        url: "/as&a/geography/tips/AS, A level learner guide.pdf",
        category: "tips"
      },
      {
        id: "geography-tips-exam",
        name: "Exam Question Bookmark",
        description: "Quick reference guide for exam questions",
        type: "pdf",
        url: "/as&a/geography/tips/Exam question bookmark.pdf",
        category: "tips"
      },
      {
        id: "geography-case-study-guide",
        name: "AS Case Study Guide",
        description: "Guide for using case studies in AS Level Geography",
        type: "pdf",
        url: "/as&a/geography/case-study/AS Case study guide .pdf",
        category: "case-study"
      },
      {
        id: "geography-case-study-topic3",
        name: "Case Studies: Topic 3",
        description: "Specific case studies for Geography Topic 3",
        type: "pdf",
        url: "/as&a/geography/case-study/Case studies_ topic 3.pdf",
        category: "case-study"
      },
      {
        id: "geography-case-study-collection",
        name: "Geography Case Study Collection",
        description: "Comprehensive collection of Geography case studies",
        type: "pdf",
        url: "/as&a/geography/case-study/GCSE-Geography-Case-Study-Collection.pdf",
        category: "case-study"
      },
      {
        id: "geography-case-study-population",
        name: "Population Case Studies",
        description: "Presentation on population case studies for Geography",
        type: "pptx",
        url: "/as&a/geography/case-study/Geography population case studies.pptx",
        category: "case-study"
      }
    ],
  },
  {
    id: "alevel-chinese",
    code: "9715",
    name: "Chinese",
    icon: <LanguagesIcon className="h-5 w-5 text-yellow-500" />,
    resources: [
      {
        id: "chinese-theory-grammar",
        name: "Essential Chinese Grammar",
        description: "Key grammar points for AS & A Level Chinese",
        type: "pdf",
        url: "/as&a/chinese/theory/Essential grammars.pdf",
        category: "theory"
      },
      {
        id: "chinese-theory-summary",
        name: "Summary Writing Guide",
        description: "Guide to summary writing for Chinese AS level",
        type: "pdf",
        url: "/as&a/chinese/theory/Summary writing_Chinese_AS level.pdf",
        category: "theory"
      },
      {
        id: "chinese-tips-advice",
        name: "Chinese AS & A Level Tips & Advice",
        description: "Study tips and advice for Chinese language students",
        type: "docx",
        url: "/as&a/chinese/tips/Tips & Advice.docx",
        category: "tips"
      },
      {
        id: "chinese-vocabulary-hsk3",
        name: "HSK-3 Vocabulary List",
        description: "Standard vocabulary list for HSK Level 3",
        type: "pdf",
        url: "/as&a/chinese/vocabulary/HSK-3-Vocabulary-List.pdf",
        category: "vocabulary"
      },
      {
        id: "chinese-vocabulary-hsk4",
        name: "HSK-4 Vocabulary List",
        description: "Standard vocabulary list for HSK Level 4",
        type: "pdf",
        url: "/as&a/chinese/vocabulary/HSK-4-Vocabulary_List.pdf",
        category: "vocabulary"
      },
      {
        id: "chinese-vocabulary-hsk5",
        name: "HSK-5 Vocabulary List",
        description: "Standard vocabulary list for HSK Level 5",
        type: "pdf",
        url: "/as&a/chinese/vocabulary/HSK-5-Vocabulary_List.pdf",
        category: "vocabulary"
      },
      {
        id: "chinese-vocabulary-hsk6",
        name: "HSK-6 Vocabulary List",
        description: "Standard vocabulary list for HSK Level 6 (Advanced)",
        type: "pdf",
        url: "/as&a/chinese/vocabulary/HSK-6-Vocabulary_List.pdf",
        category: "vocabulary"
      }
    ],
  },
  {
    id: "alevel-art-design",
    code: "9479",
    name: "Art & Design",
    icon: <PaletteIcon className="h-5 w-5 text-purple-500" />,
    resources: [
      {
        id: "art-tips-alevel",
        name: "Art & Design AS Level Guide",
        description: "Tips and guidance for AS Level Art & Design students",
        type: "pdf",
        url: "/as&a/art/tips/Art_and_Design_As_level_df.pdf",
        category: "tips"
      }
    ],
  }
];