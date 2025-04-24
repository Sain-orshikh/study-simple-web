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

export const igcseSubjects: Subject[] = [
  {
    id: "igcse-art",
    code: "0400",
    name: "Art & Design",
    icon: <PaletteIcon className="h-5 w-5 text-purple-500" />,
    resources: [
      {
        id: "art-tips-igcse",
        name: "Art & Design IGCSE Guide",
        description: "Tips and guidance for IGCSE Art & Design students",
        type: "pdf",
        url: "/igcse/art/tips/IGCSE%20ARTS.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-bio",
    code: "0610",
    name: "Biology",
    icon: <BrainIcon className="h-5 w-5 text-green-500" />,
    resources: [
      // Theory resources
      {
        id: "bio-theory-chap1-8",
        name: "Biology Chapters 1-8",
        description: "Comprehensive study material covering chapters 1-8",
        type: "pdf",
        url: "/igcse/biology/theory/Biology_chap1-8_.pdf",
        category: "theory"
      },
      {
        id: "bio-theory-antibiotics",
        name: "Antibiotic Resistance in Bacteria",
        description: "Study on bacterial resistance to antibiotics",
        type: "pdf",
        url: "/igcse/biology/theory/Antibiotic resistance in bacteria.pdf",
        category: "theory"
      },
      {
        id: "bio-theory-cell-organelles",
        name: "Cell Organelles",
        description: "Detailed study of cell structures and functions",
        type: "pdf",
        url: "/igcse/biology/theory/Cell Organelles.pdf",
        category: "theory"
      },
      {
        id: "bio-theory-dna",
        name: "DNA and Protein Synthesis",
        description: "Process of DNA replication and protein formation",
        type: "pdf",
        url: "/igcse/biology/theory/DNA and Protein Synthesis.pdf",
        category: "theory"
      },
      {
        id: "bio-theory-food-production",
        name: "Food Production and Habitat Destruction",
        description: "Impact of agriculture on natural habitats",
        type: "pdf",
        url: "/igcse/biology/theory/Food Production and Habitat Destruction.pdf",
        category: "theory"
      },
      {
        id: "bio-theory-substrate",
        name: "Substrate Concentration",
        description: "Effects of substrate concentration on enzyme activity",
        type: "pdf",
        url: "/igcse/biology/theory/Substrate Concentration.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "bio-tips-igcse",
        name: "IGCSE Biology Tips",
        description: "Exam preparation tips and strategies",
        type: "pdf",
        url: "/igcse/biology/tips/IGCSE BIOLOGY.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-business",
    code: "0450",
    name: "Business",
    icon: <BuildingIcon className="h-5 w-5 text-blue-500" />,
    resources: [
      // Theory resources
      {
        id: "business-theory-ch1",
        name: "Business Chapter 1",
        description: "Core concepts of business studies - chapter 1",
        type: "pdf",
        url: "/igcse/business/theory/Business_chapter1.pdf",
        category: "theory"
      },
      {
        id: "business-theory-ch2",
        name: "Business Chapter 2",
        description: "Core concepts of business studies - chapter 2",
        type: "pdf",
        url: "/igcse/business/theory/Business_chapter2.pdf",
        category: "theory"
      },
      {
        id: "business-theory-ch3",
        name: "Business Chapter 3",
        description: "Core concepts of business studies - chapter 3",
        type: "pdf",
        url: "/igcse/business/theory/Business_chapter3.pdf",
        category: "theory"
      },
      {
        id: "business-theory-ch4",
        name: "Business Chapter 4",
        description: "Core concepts of business studies - chapter 4",
        type: "pdf",
        url: "/igcse/business/theory/Business-chapter4.pdf",
        category: "theory"
      },
      {
        id: "business-theory-ch5",
        name: "Business Chapter 5",
        description: "Core concepts of business studies - chapter 5",
        type: "pdf",
        url: "/igcse/business/theory/Business_chapter5.pdf",
        category: "theory"
      },
      {
        id: "business-theory-keyterms",
        name: "Business Key Terms",
        description: "Essential business terminology and definitions",
        type: "pdf",
        url: "/igcse/business/theory/Key terms.pdf",
        category: "theory"
      },
      // Mind Map resources
      {
        id: "business-mindmap-1",
        name: "Business Activity",
        description: "Visual overview of business activity concepts",
        type: "pdf",
        url: "/igcse/business/mind-map/1. Business activity.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-2",
        name: "Classification of Businesses",
        description: "Mind map of different business classifications",
        type: "pdf",
        url: "/igcse/business/mind-map/2. Classification of businesses.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-3",
        name: "Enterprise & Business Growth",
        description: "Growth strategies and enterprise concepts",
        type: "pdf",
        url: "/igcse/business/mind-map/3. Enterprise, business growth and size.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-4",
        name: "Types of Business Organisation",
        description: "Different business structures explained",
        type: "pdf",
        url: "/igcse/business/mind-map/4. Types of business organisation.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-5",
        name: "Business & Stakeholder Objectives",
        description: "Goals and stakeholder relationships",
        type: "pdf",
        url: "/igcse/business/mind-map/5. Business objectives and stakeholder objectives.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-6",
        name: "Motivating Employees",
        description: "Employee motivation strategies and theories",
        type: "pdf",
        url: "/igcse/business/mind-map/6. Motivating employees.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-7",
        name: "Organization & Management",
        description: "Organizational structures and management principles",
        type: "pdf",
        url: "/igcse/business/mind-map/7. Organization and management.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-8",
        name: "Recruitment & Training",
        description: "Employee recruitment, selection and training",
        type: "pdf",
        url: "/igcse/business/mind-map/8. Recruitment, selection and training of employees.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-9",
        name: "Communication",
        description: "Internal and external business communication",
        type: "pdf",
        url: "/igcse/business/mind-map/9. Internal and external communication.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-10",
        name: "Marketing & Competition",
        description: "Marketing strategies and competitive analysis",
        type: "pdf",
        url: "/igcse/business/mind-map/10. Marketing, competition and the customer.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-11",
        name: "Market Research",
        description: "Research methods and market analysis",
        type: "pdf",
        url: "/igcse/business/mind-map/11. Market research.pdf",
        category: "mindmap"
      },
      {
        id: "business-mindmap-12",
        name: "Marketing Mix: Product & Price",
        description: "Product and pricing strategies",
        type: "pdf",
        url: "/igcse/business/mind-map/12. Marketing mix_ product and price.pdf",
        category: "mindmap"
      },
      // Tips resources
      {
        id: "business-tips-exam",
        name: "IGCSE Business Exam Tips",
        description: "Strategies for success in the 0450 exam",
        type: "pdf",
        url: "/igcse/business/tips/IGCSE BUSINESS EXAM TIPS (0450).pdf",
        category: "tips"
      },
      {
        id: "business-tips-advice",
        name: "Tips and Advice",
        description: "General tips and advice for business studies",
        type: "docx",
        url: "/igcse/business/tips/Tips and advice.docx",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-chem",
    code: "0620",
    name: "Chemistry",
    icon: <FlaskIcon className="h-5 w-5 text-red-500" />,
    resources: [
      // Theory resources
      {
        id: "chem-theory-ch1",
        name: "Chapter 1: Particulate Nature of Matter",
        description: "Introduction to the particulate nature of matter",
        type: "pdf",
        url: "/igcse/chemistry/theory/Chapter 1. The particulate nature of matter.pdf",
        category: "theory"
      },
      {
        id: "chem-theory-ch2",
        name: "Chapter 2: Experimental Techniques",
        description: "Methods and techniques for chemistry experiments",
        type: "pdf",
        url: "/igcse/chemistry/theory/Chapter 2. Experimental techniques_.pdf",
        category: "theory"
      },
      {
        id: "chem-theory-ch3",
        name: "Chapter 3: Atoms, Elements & Compounds",
        description: "Structure of atoms and formation of compounds",
        type: "pdf",
        url: "/igcse/chemistry/theory/Chapter 3. Atoms, elements and compounds_.pdf",
        category: "theory"
      },
      {
        id: "chem-theory-ch4",
        name: "Chapter 4: Equations",
        description: "Balancing and understanding chemical equations",
        type: "pdf",
        url: "/igcse/chemistry/theory/Chapter 4. Equations_.pdf",
        category: "theory"
      },
      {
        id: "chem-theory-ch5",
        name: "Chapter 5: Stoichiometry",
        description: "Quantitative relationships in chemical reactions",
        type: "pdf",
        url: "/igcse/chemistry/theory/Chapter 5.Stoichiometry_.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "chem-tips",
        name: "IGCSE Chemistry Tips & Advice",
        description: "Exam preparation guidance for Chemistry students",
        type: "docx",
        url: "/igcse/chemistry/tips/IGCSE Chemistry tips & advice.docx",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-chinese",
    code: "0547",
    name: "Chinese",
    icon: <LanguagesIcon className="h-5 w-5 text-yellow-500" />,
    resources: [
      // Theory resources
      {
        id: "chinese-theory-adverbs",
        name: "Adverbs of Frequency",
        description: "Usage and examples of frequency adverbs in Chinese",
        type: "pdf",
        url: "/igcse/chinese/theory/Adverb of frequency.pdf",
        category: "theory"
      },
      {
        id: "chinese-theory-measure",
        name: "Measure Words",
        description: "Guide to Chinese measure words and their usage",
        type: "pdf",
        url: "/igcse/chinese/theory/Measure words.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "chinese-tips-exam",
        name: "IGCSE Chinese Exam Tips",
        description: "Preparation strategies for the 0547 Chinese exam",
        type: "pdf",
        url: "/igcse/chinese/tips/IGCSE CHINESE EXAM TIPS (0547).pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-cs",
    code: "0478",
    name: "Computer Science",
    icon: <CpuIcon className="h-5 w-5 text-indigo-500" />,
    resources: [
      // Theory resources
      {
        id: "cs-theory-notes",
        name: "Computer Science Notes",
        description: "Comprehensive notes covering IGCSE Computer Science concepts",
        type: "pdf",
        url: "/igcse/computer-science/theory/Computer science notes.pdf",
        category: "theory"
      },
      {
        id: "cs-theory-igcse",
        name: "Computer Science IGCSE Guide",
        description: "Complete guide for IGCSE Computer Science curriculum",
        type: "pdf",
        url: "/igcse/computer-science/theory/Computer_Science_IGCSE_.pdf",
        category: "theory"
      }
    ],
  },
  {
    id: "igcse-fle",
    code: "0500",
    name: "First Language English",
    icon: <BookOpenAltIcon className="h-5 w-5 text-amber-500" />,
    resources: [
      // Theory resources
      {
        id: "fle-theory-notes",
        name: "English Notes",
        description: "Comprehensive notes for First Language English",
        type: "pdf",
        url: "/igcse/first-language-english/theory/English note.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "fle-tips",
        name: "Tips and Advice on IGCSE FLE",
        description: "Exam preparation guidance for First Language English",
        type: "pdf",
        url: "/igcse/first-language-english/tips/Tips and advice on IGCSE FLE.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-esl",
    code: "0510",
    name: "English as a Second Language",
    icon: <GlobeIcon className="h-5 w-5 text-teal-500" />,
    resources: [],
  },
  {
    id: "igcse-german",
    code: "0525",
    name: "German",
    icon: <BookIcon className="h-5 w-5 text-orange-800" />,
    resources: [
      // Tips resources
      {
        id: "german-tips",
        name: "IGCSE German Tips",
        description: "Exam preparation strategies and tips for IGCSE German",
        type: "pdf",
        url: "/igcse/german/tips/IGCSE GERMAN TIPS.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-geo",
    code: "0460",
    name: "Geography",
    icon: <GlobeIcon className="h-5 w-5 text-emerald-500" />,
    resources: [
      // Theory resources
      {
        id: "geo-theory-case-studies",
        name: "Case Studies",
        description: "Collection of geography case studies for exam preparation",
        type: "pdf",
        url: "/igcse/geography/theory/Case studies.pdf",
        category: "theory"
      },
      {
        id: "geo-theory-world-problems",
        name: "Problems of the World",
        description: "Analysis of global geographical challenges",
        type: "pdf",
        url: "/igcse/geography/theory/Problems of the world - geography.pdf",
        category: "theory"
      },
      {
        id: "geo-theory-useful-sites",
        name: "Useful Sites",
        description: "Collection of helpful websites for geography study",
        type: "docx",
        url: "/igcse/geography/theory/Useful sites.docx",
        category: "theory"
      },
      // Tips resources
      {
        id: "geo-tips-general",
        name: "Geography Tips",
        description: "General tips for IGCSE Geography success",
        type: "pdf",
        url: "/igcse/geography/tips/Geography tips.pdf",
        category: "tips"
      },
      {
        id: "geo-tips-case-studies",
        name: "How to Write Case Studies",
        description: "Guide to writing effective geography case studies",
        type: "pdf",
        url: "/igcse/geography/tips/How to write case studies.pdf",
        category: "tips"
      },
      {
        id: "geo-tips-igcse",
        name: "IGCSE Geography Tips",
        description: "Exam-specific strategies for IGCSE Geography",
        type: "pdf",
        url: "/igcse/geography/tips/IGCSE GEOGRAPHY TIP.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-history",
    code: "0470",
    name: "World History",
    icon: <HistoryIcon className="h-5 w-5 text-amber-700" />,
    resources: [
      // Theory resources
      {
        id: "history-theory-germany",
        name: "Depth Study: Germany",
        description: "Comprehensive analysis of German history for IGCSE",
        type: "pdf",
        url: "/igcse/world-history/theory/Depth-study-germany.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "history-tips-igcse",
        name: "IGCSE World History Tips",
        description: "Essential tips for IGCSE World History exams",
        type: "docx",
        url: "/igcse/world-history/tips/IGCSE World History Tips.docx",
        category: "tips"
      },
      {
        id: "history-tips-general",
        name: "World History Tips",
        description: "General guidance for studying World History",
        type: "docx",
        url: "/igcse/world-history/tips/World History tips.docx",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-ict",
    code: "0417",
    name: "Information & Communication Technology",
    icon: <SmartphoneIcon className="h-5 w-5 text-sky-500" />,
    resources: [
      // Theory resources
      {
        id: "ict-theory-overview",
        name: "ICT Complete Guide",
        description: "Comprehensive overview of the IGCSE ICT curriculum",
        type: "pdf",
        url: "/igcse/ict/theory/0417 ICT_.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-ch1",
        name: "Chapter 1: Computer Systems",
        description: "Introduction to computer systems and components",
        type: "pdf",
        url: "/igcse/ict/theory/Chapter 1_ Computer system (1).pdf",
        category: "theory"
      },
      {
        id: "ict-theory-ch2",
        name: "Chapter 2: Input & Output Devices",
        description: "Overview of various input and output peripherals",
        type: "pdf",
        url: "/igcse/ict/theory/Chapter 2_ Input and output devices.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-ch3",
        name: "Chapter 3: Storage Devices",
        description: "Data storage technologies and media",
        type: "pdf",
        url: "/igcse/ict/theory/Chapter 3_ Storage devices.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-ch4",
        name: "Chapter 4: Networks",
        description: "Computer networks, types and communication",
        type: "pdf",
        url: "/igcse/ict/theory/Chapter 4_ Networks.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-ch5",
        name: "Chapter 5: Effects of Using IT",
        description: "Social, ethical and economic impacts of technology",
        type: "pdf",
        url: "/igcse/ict/theory/Chapter 5_ The effects of using IT.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-expert",
        name: "Expert Systems",
        description: "Introduction to expert systems and AI applications",
        type: "pdf",
        url: "/igcse/ict/theory/expert system.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-app1",
        name: "ICT Applications (Part 1)",
        description: "Practical applications of ICT in various contexts",
        type: "pdf",
        url: "/igcse/ict/theory/ICT application.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-app2",
        name: "ICT Applications (Part 2)",
        description: "Additional ICT application examples and use cases",
        type: "pdf",
        url: "/igcse/ict/theory/ICT application 2.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-web",
        name: "Web Chapter 21",
        description: "Web technologies and internet fundamentals",
        type: "pdf",
        url: "/igcse/ict/theory/Web chapter21.pdf",
        category: "theory"
      },
      {
        id: "ict-theory-website",
        name: "Website Authoring",
        description: "Guide to website creation and web authoring tools",
        type: "pdf",
        url: "/igcse/ict/theory/Website authoring 1.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "ict-tips",
        name: "IGCSE ICT Tips",
        description: "Exam preparation strategies for ICT success",
        type: "docx",
        url: "/igcse/ict/tips/_IGCSE ICT tips.docx",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-math",
    code: "0580",
    name: "Mathematics",
    icon: <CalculatorIcon className="h-5 w-5 text-violet-500" />,
    resources: [
      // Tips resources
      {
        id: "math-tips",
        name: "IGCSE Mathematics Tips",
        description: "Exam preparation strategies and study advice for Mathematics",
        type: "docx",
        url: "/igcse/math/tips/IGCSE MATHEMATICS TIPS.docx",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-music",
    code: "0410",
    name: "Music",
    icon: <MusicIcon className="h-5 w-5 text-pink-500" />,
    resources: [
      // Tips resources
      {
        id: "music-tips",
        name: "IGCSE Music Exam Tips and Advice",
        description: "Comprehensive strategies and preparation guidance for the 0410 Music exam",
        type: "pdf",
        url: "/igcse/music/tips/IGCSE Music (0410) Exam Tips and Advice.pdf",
        category: "tips"
      }
    ],
  },
  {
    id: "igcse-physics",
    code: "0625",
    name: "Physics",
    icon: <AtomIcon className="h-5 w-5 text-blue-700" />,
    resources: [
      // Theory resources
      {
        id: "physics-theory-ch1",
        name: "Chapter 1: Making Measurements",
        description: "Introduction to measurement concepts and techniques in physics",
        type: "pdf",
        url: "/igcse/physics/theory/Chapter 1 making measurements_.pdf",
        category: "theory"
      },
      // Tips resources
      {
        id: "physics-tips",
        name: "IGCSE Mathematics & Physics Tips",
        description: "Exam strategies and techniques for IGCSE Physics",
        type: "pdf",
        url: "/igcse/physics/tips/_IGCSE Mathematics & Physics.pdf",
        category: "tips"
      }
    ],
  },
];