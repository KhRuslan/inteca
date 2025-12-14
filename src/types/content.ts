export interface HeroContent {
  title: string
  description: string
  buttonText: string
  backgroundImage: string
}

export interface ProgramBenefit {
  title: string
  description: string
}

export interface WhoProgramForCard {
  icon: string
  title: string
  description: string
}

export interface CaseBasedLearningContent {
  title: string
  description: string
  link1Text: string
  link2Text: string
  image: string
}

export interface KeyBenefit {
  label: string
  percentage: number
  color: string
}

export interface FounderContent {
  title: string
  description: string
  keyFacts: string[]
  linkText: string
  image: string
}

export interface CTAContent {
  title: string
  buttonText: string
}

// About Page Types
export interface AboutHeroContent {
  title: string
  description: string
  formula: string
  image: string
}

export interface ManagementChallenge {
  title: string
  description: string
}

export interface FlexibleFormat {
  title: string
  subtitle: string
  description: string
}

export interface AfterCompletingContent {
  title: string
  description: string
  buttonText: string
  image: string
}

export interface CoreCompetency {
  category: string
  mainTitle: string
  subtitle: string
  description: string
  linkText: string
}

export interface AboutContent {
  hero: AboutHeroContent
  managementChallenges: ManagementChallenge[]
  flexibleFormatsTitle: string
  flexibleFormatsSubtitle: string
  flexibleFormats: FlexibleFormat[]
  formatButtonText: string
  formatFooterText: string
  afterCompleting: AfterCompletingContent
  coreCompetenciesTitle: string
  coreCompetencies: CoreCompetency[]
}

// Founder Page Types
export interface FounderPageHero {
  title: string
  description: string
  secondaryDescription: string
  keyFactsTitle: string
  keyFacts: string[]
  image: string
}

export interface FounderCard {
  title: string
  description: string
  linkText: string
}

export interface FounderBiography {
  title: string
  paragraph1: string
  paragraph2: string
  bottomText: string
  image: string
}

export interface FounderPageContent {
  hero: FounderPageHero
  practitionerTitle: string
  practitionerSubtitle: string
  practitionerDescription: string
  cards: FounderCard[]
  biography: FounderBiography
}

// Methodology & Cases Page Types
export interface MethodologyHero {
  title: string
  description: string
  buttonText: string
}

export interface MethodologyBenefit {
  title: string
  description: string
}

export interface MethodologyCase {
  title: string
  description: string
  linkText: string
  detailedDescription?: string
  keyFacts?: string[]
  callToAction?: string
}

export interface MethodologyPageContent {
  hero: MethodologyHero
  benefits: MethodologyBenefit[]
  casesTitle: string
  cases: MethodologyCase[]
}

// For Universities Page Types
export interface ForUniversitiesHero {
  title: string
  description: string
}

export interface ForUniversitiesBenefit {
  title: string
  description: string
  list?: string[]
}

export interface IntegrationFormat {
  title: string
  bestFor: string
  bestForText: string
  description: string
  howUsed?: {
    header: string
    list: string[]
  }
  whatWeManage?: {
    header: string
    list: string[]
  }
  themes?: {
    header: string
    list: string[]
  }
  idealUses?: {
    header: string
    list: string[]
  }
  integration?: {
    header: string
    list: string[]
  }
  includes?: {
    header: string
    list: string[]
  }
  note?: string
}

export interface ProcessStep {
  title: string
  header?: string
  description?: string
  list?: string[]
}

export interface ForUniversitiesCTA {
  title: string
  subtitle: string
  buttonText: string
}

export interface ForUniversitiesPageContent {
  hero: ForUniversitiesHero
  benefitsTitle: string
  benefits: ForUniversitiesBenefit[]
  integrationFormatsTitle: string
  integrationFormats: IntegrationFormat[]
  processTitle: string
  processSteps: ProcessStep[]
  cta: ForUniversitiesCTA
}

export interface ForCorporateClientsHero {
  title: string
  subtitle: string
  description: string
}

export interface WhyCaseMethodWorks {
  title: string
  description: string
  list: string[]
  conclusion: string
}

export interface TrainingFormat {
  title: string
  description: string
  idealFor?: string
  list?: string[]
}

export interface SampleCaseExample {
  title: string
  description: string
}

export interface BusinessResult {
  title: string
  description: string
  metrics: Array<{
    value: string
    label: string
    sub?: string
  }>
}

export interface ForCorporateClientsCTA {
  buttonText: string
}

export interface ForCorporateClientsPageContent {
  hero: ForCorporateClientsHero
  whyCaseMethodWorks: WhyCaseMethodWorks
  trainingFormatsTitle: string
  trainingFormats: TrainingFormat[]
  sampleCasesTitle: string
  sampleCases: SampleCaseExample[]
  businessResultsTitle: string
  businessResults: BusinessResult[]
  cta: ForCorporateClientsCTA
}

// For Students Page Types
export interface ForStudentsHero {
  title: string
  image: string
  whatYouGainTitle: string
}

export interface WhatYouGain {
  intro: string
  list: string[]
  conclusion: string
}

export interface Skill {
  title: string
  description: string
}

export interface CertificateContent {
  title: string
  description1: string
  description2: string
  image: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ForStudentsCTA {
  buttonText: string
}

export interface ForStudentsPageContent {
  hero: ForStudentsHero
  whatYouGain: WhatYouGain
  skillsTitle: string
  skills: Skill[]
  certificates: CertificateContent
  faqTitle: string
  faq: FAQItem[]
  cta: ForStudentsCTA
}

export interface SiteContent {
  hero: HeroContent
  programBenefits: ProgramBenefit[]
  whoProgramFor: WhoProgramForCard[]
  caseBasedLearning: CaseBasedLearningContent
  keyBenefits: KeyBenefit[]
  founder: FounderContent
  cta: CTAContent
  about?: AboutContent
  founderPage?: FounderPageContent
  methodologyPage?: MethodologyPageContent
  forUniversitiesPage?: ForUniversitiesPageContent
  forCorporateClientsPage?: ForCorporateClientsPageContent
  forStudentsPage?: ForStudentsPageContent
}

export const defaultContent: SiteContent = {
  hero: {
    title: 'Harvard Innovated — We Adapted — You Advance!',
    description: 'The case method is a practical learning format based on real business situations. Students analyze problems, propose solutions, debate, and learn to think like decision-makers.',
    buttonText: 'Apply now',
    backgroundImage: '/hero-section.png'
  },
  programBenefits: [
    {
      title: 'Classroom Work',
      description: 'The instructor guides discussions, manages group dynamics, and rotates teams to foster collaboration and diverse thinking.'
    },
    {
      title: 'Determining Group Level',
      description: 'The instructor first assesses each participant\'s experience, position, education, and English level.'
    },
    {
      title: 'Case Selection',
      description: 'The instructor prepares short and full cases, chosen to match the group\'s level and real work situations.'
    },
    {
      title: 'Course Material Preparation',
      description: 'The instructor provides materials, answers clarifying cases, while preparation is shared between the instructor and participants.'
    },
    {
      title: 'Discussion Guidance',
      description: 'The instructor listens, asks precise questions, answers the group, explains key facts and shows relevant statistics.'
    },
    {
      title: 'Summary & Application',
      description: 'At the session\'s end, the instructor helps participants summarize takeaways and grow as valuable professionals.'
    }
  ],
  whoProgramFor: [
    {
      icon: '🏢',
      title: 'Companies',
      description: 'Think globally, act locally, and grow the skills to turn global ideas into local impact.'
    },
    {
      icon: '🎓',
      title: 'Students',
      description: 'Develop people who think globally, grow strong skills, and deliver real market-focused results.'
    },
    {
      icon: '🏛️',
      title: 'Universities',
      description: 'Learn to think broadly, build a strong skill ecosystem, and become a professional.'
    }
  ],
  caseBasedLearning: {
    title: 'What is Case-Based Learning?',
    description: 'Case-based learning is a practical educational approach built on analyzing real business situations. Instead of passive lectures, students actively examine problems, propose solutions, debate, defend their perspectives, and learn to think like decision-makers.',
    link1Text: 'Learn more about how case-based learning works',
    link2Text: 'Explore our full methodology',
    image: '/case-based.jpeg'
  },
  keyBenefits: [
    { label: 'Strategic Thinking', percentage: 35, color: '#DC2626' },
    { label: 'Complex Problem Analysis', percentage: 30, color: '#6B7280' },
    { label: 'Argumentation Skills', percentage: 20, color: '#9CA3AF' },
    { label: 'Team Collaboration', percentage: 15, color: '#D1D5DB' }
  ],
  founder: {
    title: 'Founder — Oleg Tsoy',
    description: 'Oleg Tsoy applies the Harvard case method to develop strategic thinking and managerial skills in universities and corporate teams.',
    keyFacts: [
      'Executive education at London Business School',
      'Expert in Harvard case-based learning methodology',
      'Focused on practical decision-making and leadership development'
    ],
    linkText: 'Learn More',
    image: '/founder.jpg'
  },
  cta: {
    title: 'Ready to develop strategic thinking and managerial skills?',
    buttonText: 'Apply Now'
  },
  about: {
    hero: {
      title: 'About the Program',
      description: 'InTECA is an academic program built on the Harvard Case Method — the world\'s leading approach to developing analytical and leadership skills through real business scenarios.',
      formula: 'Situation → Analysis → Discussion → Decision → Reflection',
      image: '/about1.jpeg'
    },
    managementChallenges: [
      { title: '• Strategic Leadership', description: 'Market entry, competitive advantage' },
      { title: '• Organizational Behavior', description: 'Conflict resolution, motivation' },
      { title: '• Crisis Management', description: 'Decision-making under pressure' },
      { title: '• Digital Transformation', description: 'Innovation, process redesign' },
      { title: '• Financial Thinking', description: 'Data-driven decisions' },
      { title: '• Data-driven decisions', description: 'Data-driven decisions' }
    ],
    flexibleFormatsTitle: 'Flexible Formats for Different Teams',
    flexibleFormatsSubtitle: 'The program offers several delivery formats to match organizational needs:',
    flexibleFormats: [
      {
        title: 'Intensive Workshops',
        subtitle: 'short, high-impact sessions with group analysis',
        description: 'these workshops are ideal for teams who need a fast immersion into the Case Method and immediate practical application. Participants work through one core business case in an intensive, real-time situation analysis, fostering rapid decision-making under time constraint.'
      },
      {
        title: 'Full Training Program',
        subtitle: 'deep immersion with multiple case discussions',
        description: 'a comprehensive program that blends classroom theory with real-world case studies. Multiple sessions are held over weeks, allowing participants to work through problems, propose strategic options and receive expert feedback.'
      },
      {
        title: 'Corporate Cohorts',
        subtitle: 'tailored programs built around company needs',
        description: 'corporate cohorts receive fully customized content, cases selected for their industry, and curated case sets that align with current challenges. This format helps align managers, build collaboration culture, and create a shared decision-making training across teams and develop a unified approach to decision-making.'
      },
      {
        title: 'Online Sessions',
        subtitle: 'remote access to live, instructor-led case learning materials',
        description: 'flexible and engaging format where participants join remotely, work with digital case packs, and take part in interactive debates. This option keeps the discussion-driver spirit of the Case Method alive and distributed teams.'
      },
      {
        title: 'Hybrid Format',
        subtitle: 'combining in-person and online learning materials',
        description: 'The hybrid model merges the strengths of live interaction and online resources. Instructor-facilitated in-person sessions for deep discussion, while the materials that enhance preparation guides by digital materials that enhance preparation and continuous learning.'
      }
    ],
    formatButtonText: 'Choose Your Format',
    formatFooterText: 'All formats emphasize the outcome: learn of the Case Method.',
    afterCompleting: {
      title: 'After completing the program, participants will:',
      description: 'Participants will be able to analyze complex business problems, make confident decisions in uncertain conditions, and communicate their reasoning to stakeholders. They will leverage strategic thinking and decision-making frameworks in real work scenarios. The program is especially valuable for managers and executives in high-pressure discussions.',
      buttonText: 'Apply for the Program',
      image: '/about2.jpeg'
    },
    coreCompetenciesTitle: 'Core Competencies Developed',
    coreCompetencies: [
      {
        category: 'Strategic Thinking',
        mainTitle: 'Advanced',
        subtitle: 'Strategic Thinking',
        description: 'Participants build the ability to analyze complex situations, structure problems, and develop clear strategic options.',
        linkText: 'Learn more'
      },
      {
        category: 'Decision-Making',
        mainTitle: 'Confident',
        subtitle: 'Decision-Making',
        description: 'Decision-makers learn to evaluate risks, compare alternatives, and make sound choices even under uncertainty.',
        linkText: 'See benefits'
      },
      {
        category: 'Leadership & Communication',
        mainTitle: 'Stronger',
        subtitle: 'Leadership Presence',
        description: 'Through group case discussions, participants learn to communicate ideas with evidence, and lead team discussions more effectively.',
        linkText: 'Explore skills'
      },
      {
        category: 'Practical Application',
        mainTitle: 'Real-World',
        subtitle: 'Analytical Skills',
        description: 'The program\'s focus on real cases allows participants to apply learning to their daily work, improving efficiency across tasks and teams.',
        linkText: 'Full program'
      }
    ]
  },
  founderPage: {
    hero: {
      title: 'Founder — Oleg Tsoy',
      description: 'Oleg Tsoy applies the Harvard case method to develop strategic thinking and managerial skills in universities and corporate teams.',
      secondaryDescription: 'With over 25 years of experience spanning public service, banking, industry leadership, and executive education, Oleg has developed a unique approach to teaching managerial decision-making. He combines real-world executive experience with rigorous academic methodology from Harvard Business School and London Business School.',
      keyFactsTitle: 'Key Facts:',
      keyFacts: [
        'Executive education at London Business School',
        'Expert in Harvard case-based learning methodology',
        'Focused on practical decision-making and leadership development',
        'Certified Tutor of Harvard Business Publishing Education',
        '250+ case studies completed across various industries'
      ],
      image: '/founder-hero.jpeg'
    },
    practitionerTitle: 'Oleg Tsoy — Case Method Practitioner &',
    practitionerSubtitle: 'Harvard-Certified Educator',
    practitionerDescription: 'Oleg Tsoy brings 25+ years of leadership experience across public service, banking, industry and executive education. He teaches real managerial decision-making using Harvard Business School case studies adapted for Central Asia.',
    cards: [
      {
        title: '• Harvard-Certified Educator',
        description: 'Registered and officially certified by Harvard Business Publishing Education, adapt and facilitate case-based learning using licensed HBP materials. Global teaching standards.',
        linkText: 'Learn more'
      },
      {
        title: '• 250+ Case Studies Completed',
        description: 'A portfolio of 250+ cases across Harvard, LBS and modern business scenarios — spanning strategy, leadership, crisis management, negotiations and organizational behavior.',
        linkText: 'Learn more'
      },
      {
        title: '• Harvard-Certified Educator',
        description: 'Chairman, CEO and Board Member across major holdings — bringing real executive practice into every case.',
        linkText: 'Learn more'
      }
    ],
    biography: {
      title: 'Biography',
      paragraph1: 'A multidisciplinary executive with legal, financial, and international business education. Graduated from London Business School and completed executive programs at Harvard Business School, later becoming a Certified Tutor of Harvard Business Publishing Education.',
      paragraph2: 'He began his career in public service, working in criminal investigations and cybercrime, developing sharp analytical and decision-making skills. Transitioned to the private sector in 2010, holding senior executive positions as Chairman, CEO, and Board Member across industrial holdings, automotive production, real-estate development, and financial institutions.',
      bottomText: 'Since 2015, he has been an active educator, teaching case-based strategy, leadership, and decision-making. He created and directs Kazakhstan\'s first ProMBA Real Estate Development program and teaches in Executive MBA cohorts, combining global best practices with real executive experience.',
      image: '/founder-bio.png'
    }
  },
  methodologyPage: {
    hero: {
      title: 'Strategic Leadership & Case-Based Executive Education',
      description: 'Harvard-certified educator with deep executive and public-sector leadership experience. Teaching strategic decision-making through world-class cases and real-industry practice.',
      buttonText: 'Start a Program'
    },
    benefits: [
      {
        title: 'Real Decision-Making',
        description: 'Participants step into the role of decision-makers and solve real cases from business, industry and the public sector — not theoretical exercises.'
      },
      {
        title: 'Structured Thinking First',
        description: 'Every case begins with facts, alternatives and risks — helping students develop analytical discipline before choosing a solution.'
      },
      {
        title: 'Leadership Under Pressure',
        description: 'Cases recreate time pressure, limited information and conflict of interests — the same conditions executives face in real life.'
      },
      {
        title: 'Global → Local',
        description: 'Insights from Harvard and London Business School adapted for local industries, corporate realities and national markets.'
      }
    ],
    casesTitle: 'Methodology & Cases',
    cases: [
      {
        title: 'Marketing',
        description: 'Using Harvard Business School cases helps marketing programs attract stronger applicants and strengthen their international reputation.',
        linkText: 'More Info',
        detailedDescription: 'HBS cases bring global marketing scenarios directly into the classroom — from customer behavior and brand strategy to market entry and competitive positioning. Students analyze real situations, defend solutions, and practice structured discussions. This develops strategic thinking and gives programs a stronger international profile supported by original materials from Harvard Business Publishing Education.',
        keyFacts: [
          'Supports strong global positioning',
          'Enhances academic credibility',
          'Appeals to high-potential students'
        ],
        callToAction: 'HBS cases bring global marketing scenarios into the classroom, making programs more competitive and practice-oriented.'
      },
      {
        title: 'Economics',
        description: 'Incorporating HBS cases helps economics programs align well with standards of AACSB, AMBA, and EQUIS while strengthening global recognition.',
        linkText: 'More Info',
        detailedDescription: 'Harvard Business School cases expose students to macroeconomic policy, market dynamics, trade negotiations, and regulatory decisions. They connect theory with real-world outcomes and train students to think critically about economic impact. This strengthens program quality and helps meet international accreditation standards.',
        keyFacts: [
          'Aligns with AACSB, AMBA, and EQUIS standards',
          'Strengthens global program recognition',
          'Bridges theory with real-world application'
        ],
        callToAction: 'Incorporating HBS cases helps economics programs align well with global accreditation standards.'
      },
      {
        title: 'Strategy',
        description: 'Strategy programs benefit from HBS cases by attracting better candidates and enhancing the institution\'s global reputation.',
        linkText: 'More Info',
        detailedDescription: 'Strategy cases from Harvard Business School immerse students in competitive positioning, corporate turnarounds, market entry, and portfolio management. Students learn to evaluate trade-offs, build frameworks, and defend strategic choices — developing the analytical rigor expected in top-tier programs.',
        keyFacts: [
          'Attracts high-caliber candidates',
          'Enhances global reputation',
          'Builds strategic thinking frameworks'
        ],
        callToAction: 'Strategy programs benefit from HBS cases by attracting better candidates and enhancing global reputation.'
      },
      {
        title: 'Finance',
        description: 'Finance programs using HBS cases draw strong academic standards and better prepare students for high-achieving candidates.',
        linkText: 'More Info',
        detailedDescription: 'HBS finance cases cover capital allocation, valuation, risk management, M&A, and financial decision-making under uncertainty. Students practice real financial analysis and build confidence in high-stakes discussions — preparing them for demanding roles in banking, consulting, and corporate finance.',
        keyFacts: [
          'Draws high academic standards',
          'Prepares for demanding finance roles',
          'Covers valuation, M&A, and risk management'
        ],
        callToAction: 'Finance programs using HBS cases draw strong academic standards and prepare students for high-achieving roles.'
      },
      {
        title: 'Leadership',
        description: 'Leadership programs benefit from HBS cases by attracting motivated students and enhancing the institution\'s academic standing.',
        linkText: 'More Info',
        detailedDescription: 'Leadership cases from Harvard expose students to ethical dilemmas, team conflicts, crisis management, and organizational change. They practice decision-making in ambiguous situations and develop the communication skills needed to inspire teams and drive results.',
        keyFacts: [
          'Attracts motivated and high-potential students',
          'Enhances institutional standing',
          'Develops crisis and change management skills'
        ],
        callToAction: 'Leadership programs benefit from HBS cases by attracting motivated students and enhancing academic standing.'
      },
      {
        title: 'Sales',
        description: 'Using HBS cases increases a sales programs global credibility and produces better-rounded, high-potential learners.',
        linkText: 'More Info',
        detailedDescription: 'HBS sales cases bring negotiation dynamics, customer relationship management, pricing strategy, and sales pipeline optimization into the classroom. Students practice real client scenarios, learn to handle objections, and build frameworks for consultative selling.',
        keyFacts: [
          'Increases program credibility',
          'Produces well-rounded sales professionals',
          'Teaches negotiation and consultative selling'
        ],
        callToAction: 'Using HBS cases increases sales programs global credibility and produces better-rounded learners.'
      },
      {
        title: 'Human Resource Management (HR)',
        description: 'Harvard Business School cases expose students to real HR challenges — from talent management and organizational culture to performance systems and leadership dynamics. They help universities build a modern, practice-oriented HR curriculum that meets global standards and prepares students for real managerial decision-making. As a result, the program becomes more competitive, more attractive to applicants, and better aligned with international academic benchmarks.',
        linkText: 'More Info',
        detailedDescription: 'Harvard Business School cases expose students to real HR challenges — from talent management and organizational culture to performance systems and leadership dynamics. They help universities build a modern, practice-oriented HR curriculum that meets global standards and prepares students for real managerial decision-making.',
        keyFacts: [
          'Covers talent management and organizational culture',
          'Builds practice-oriented HR curriculum',
          'Aligns with global HR standards',
          'Prepares for real managerial decisions'
        ],
        callToAction: 'As a result, the program becomes more competitive, more attractive to applicants, and better aligned with international academic benchmarks.'
      }
    ]
  },
  forUniversitiesPage: {
    hero: {
      title: 'For Universities',
      description: 'We help universities enrich their academic programs by providing real-world business cases that develop students\' decision-making, analytical thinking, and leadership skills. Our cases are designed to complement existing coursework, support interactive learning, and prepare students for practical challenges in their future careers.'
    },
    benefitsTitle: 'Benefits of Implementing the Case Method',
    benefits: [
      {
        title: 'International Academic Standards',
        description: 'We provide universities with official Harvard Business School cases, ensuring every student receives a legally purchased, individually assigned copy for study and discussion.'
      },
      {
        title: 'Practice-Driven Learning',
        description: 'The case method helps students:',
        list: [
          'analyze real cases;',
          'defend solutions;',
          'work in teams;',
          'develop strategic thinking.'
        ]
      },
      {
        title: 'Natural English Development',
        description: 'Our sessions use an English-friendly approach:',
        list: [
          'core business vocabulary;',
          'personal glossary;',
          'discussion-based practice;',
          'Duolingo group work.'
        ]
      },
      {
        title: 'Enhanced Academic Reputation',
        description: 'Using Harvard Business School cases helps universities:',
        list: [
          'attract stronger applicants;',
          'meet AACSB/AMBA/EQUIS standards;',
          'boost international standing.'
        ]
      }
    ],
    integrationFormatsTitle: 'Integration Formats',
    integrationFormats: [
      {
        title: 'Masterclasses (1 session)',
        bestFor: 'Best for:',
        bestForText: 'University events, open lectures, program promotions, guest sessions, and providing a "taste of the case method."',
        description: 'A single 60-120 minute discussion built around one Harvard case.',
        howUsed: {
          header: 'Universities use this format to:',
          list: [
            'Enrich academic events with a high-level international component.',
            'Introduce students to the case method.',
            'Promote new programs or majors.',
            'Enhance marketing and admissions activities.'
          ]
        },
        whatWeManage: {
          header: 'We manage:',
          list: [
            'Case selection.',
            'All HBPE purchases.',
            'Student preparation materials.',
            'Full discussion facilitation.'
          ]
        }
      },
      {
        title: 'Mini-Series (3-5 cases)',
        bestFor: 'Best for:',
        bestForText: 'Strengthening specific disciplines or adding practical modules.',
        description: 'A structured block that fits easily into an existing course or can function as a standalone module.',
        themes: {
          header: 'Common themes include:',
          list: [
            'Leadership & organizational behavior.',
            'Strategy & decision-making.',
            'HR management & talent development.',
            'Operations & processes.',
            'Marketing & customer behavior.',
            'Innovation & entrepreneurship.'
          ]
        },
        idealUses: {
          header: 'Mini-series are ideal for:',
          list: [
            'Accelerating practical learning.',
            'Improving English exposure through 3-5 Harvard cases.',
            'Preparing students for internships or competitions.',
            'Enhancing regular academic material with real managerial challenges.'
          ]
        }
      },
      {
        title: 'Full Case Courses (10-20 cases)',
        bestFor: 'Best for:',
        bestForText: 'Academic programs fully adopting practice-oriented learning. A complete course built entirely on case methodology, with a full sequence of Harvard cases, assignments, quizzes, and student-level diagnostics.',
        description: 'A complete course built entirely on case methodology, with a full sequence of Harvard cases, assignments, quizzes, and student-level diagnostics.',
        integration: {
          header: 'Can be integrated into:',
          list: [
            'Bachelor programs (3rd-4th year),',
            'Master\'s programs,',
            'MBA and EMBA cohorts,',
            'Corporate training programs,',
            'Joint university-industry projects.'
          ]
        },
        includes: {
          header: 'A full case course includes:',
          list: [
            '10-20 original HBPE cases,',
            'structured weekly preparation,',
            'group work and debates,',
            'English-support materials (glossaries, context notes),',
            'midterm and final assessment,',
            'certificates and personal Case Books.'
          ]
        },
        note: 'This format is the strongest for boosting program quality and supporting accreditation standards (AACSB, AMBA, EQUIS).'
      }
    ],
    processTitle: 'How the Process Works',
    processSteps: [
      {
        title: 'Needs Assessment',
        header: 'We identify:',
        list: [
          'academic programs,',
          'student level,',
          'learning goals,',
          'language level.'
        ]
      },
      {
        title: 'Case & Format Selection',
        header: 'We build a tailored program:',
        list: [
          'case selection by level,',
          'learning flow,',
          'assignments and testing,',
          'supporting materials.'
        ]
      },
      {
        title: 'HBPE Registration',
        description: 'We register each student in the Harvard Business Publishing Education system, assign each case individually.'
      },
      {
        title: 'Case Sessions',
        header: 'The instructor:',
        list: [
          'moderates discussions,',
          'guides analysis,',
          'encourages participation,',
          'explains context.'
        ]
      },
      {
        title: 'Monitoring & Analytics',
        header: 'The university receives:',
        list: [
          'performance data,',
          'attendance and activity reports,',
          'recommendations.'
        ]
      },
      {
        title: 'Certification',
        header: 'Students receive:',
        list: [
          'partner university certificate,',
          'personalized Case Book summarizing the materials.'
        ]
      }
    ],
    cta: {
      title: 'Ready to Bring Global-Level Case Learning to Your University?',
      subtitle: 'Let\'s build a customized case-based program tailored to your students, faculty, and academic goals.',
      buttonText: 'Contact Us for a Custom Proposal →'
    }
  },
  forStudentsPage: {
    hero: {
      title: 'For Students',
      image: '/for-students.png',
      whatYouGainTitle: 'What You Gain from the Program'
    },
    whatYouGain: {
      intro: 'Instead of memorizing theory, students learn how to:',
      list: [
        'analyze complex situations,',
        'make decisions under uncertainty,',
        'see cause-and-effect relationships,',
        'defend their position with arguments,',
        'understand how leaders think and act.'
      ],
      conclusion: 'Learning becomes practical, engaging, and directly applicable to future careers.'
    },
    skillsTitle: 'Skills You Will Develop',
    skills: [
      {
        title: 'Strategic thinking',
        description: 'Ability to see the bigger picture, evaluate multiple options, and understand long-term consequences.'
      },
      {
        title: 'Analytical skills',
        description: 'Breaking down complex problems, working with data, facts, and assumptions.'
      },
      {
        title: 'Decision-making confidence',
        description: 'Practicing managerial decisions in a safe learning environment.'
      },
      {
        title: 'Argumentation',
        description: 'Learning how to express ideas clearly, defend opinions, and engage in professional discussion.'
      },
      {
        title: 'Collaboration',
        description: 'Working in rotating groups and learning to interact with different thinking styles.'
      },
      {
        title: 'Global mindset',
        description: 'Understanding how international companies operate and how to apply global practices locally.'
      }
    ],
    certificates: {
      title: 'Certificates',
      description1: 'Students who successfully complete the program may receive an official certificate confirming participation in a case analysis program based on licensed Harvard Business School materials.',
      description2: 'Each participant also receives a personalized Case Book containing the cases studied during the program.',
      image: '/for-students2.jpeg'
    },
    faqTitle: 'FAQ',
    faq: [
      {
        question: 'Do I need a high level of English?',
        answer: 'No. The program is designed for students with different English levels. English development happens gradually and naturally.'
      },
      {
        question: 'Is this an English course?',
        answer: 'No. English improves as a result of working with real materials, but the focus is business thinking and decision-making.'
      },
      {
        question: 'Are the cases real?',
        answer: 'Yes. All cases are real business situations officially licensed through Harvard Business Publishing Education.'
      },
      {
        question: 'Will this help my future career?',
        answer: 'Yes. Case-based learning develops skills highly valued by employers: thinking, judgment, communication, and leadership potential.'
      },
      {
        question: 'Is this similar to MBA-style learning?',
        answer: 'Yes. The learning approach is based on the same methodology used in leading global business schools, adapted for students.'
      }
    ],
    cta: {
      buttonText: 'Apply Now'
    }
  }
}

