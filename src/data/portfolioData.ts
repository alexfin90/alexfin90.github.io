/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Alessandro Finocchiaro — Portfolio Data Source
 * All text, facts, metrics, links, and project records originate strictly from the CV.
 * Decoupled data model ready for export or Kotlin Multiplatform migration.
 */

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface ProjectStory {
  problem: string;
  whatIDid: string;
  result: string;
}

export interface Project {
  id: string;
  name: string;
  clientContext: string; // e.g. "Work done at TIM", "Built at Deloitte Digital for Lamborghini"
  company: string;
  period: string;
  category: 'Telecom' | 'Fintech' | 'Automotive' | 'Utilities' | 'Embedded';
  summary: string;
  story: ProjectStory;
  bulletPoints: string[];
  techStack: string[];
  publicUrl: string;
  screenshots: string[];
}

export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  companyUrl: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    projectIds: string[]; // Links to project id for reciprocal highlight
  }[];
}

export interface OpenSourceRepo {
  title: string;
  description: string;
  tech: string[];
  url: string;
  isPlaceholder?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  credentialUrl: string;
  date?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  email: string;
  linkedin: string;
  github: string;
  profilePhoto: string;
  about: string[];
}

export interface PortfolioConfig {
  formEndpoint: string;
  privacyNote: string;
  githubProfileUrl: string;
  linkedinProfileUrl: string;
}

export const portfolioData: {
  personalInfo: PersonalInfo;
  metrics: Metric[];
  projectCategories: string[];
  projects: Project[];
  timeline: TimelineEntry[];
  skills: SkillCategory[];
  openSource: OpenSourceRepo[];
  certifications: Certification[];
  education: {
    degree: string;
    institution: string;
    honors: string;
    period: string;
    institutionUrl: string;
  }[];
  config: PortfolioConfig;
} = {
  personalInfo: {
    name: "Alessandro Finocchiaro",
    title: "Senior Android Engineer & Tech Lead",
    summary: "Senior Android Engineer and Tech Lead with 10+ years architecting and delivering high-scale consumer mobile applications for 100M+ active users across telecom, fintech, automotive, utilities, and embedded systems.",
    email: "alexfinocchiaro90@gmail.com",
    linkedin: "https://www.linkedin.com/in/alexfinocchiaro",
    github: "https://github.com/alexfin90",
    profilePhoto: "/assets/aistudio/AlexImage_d3df8d68.jpg",
    about: [
      "I wrote my first lines of code when I was six. That curiosity never left me. It took me to a Master's degree in Computer Engineering, and then to more than ten years of building apps used by millions of people.",
      "Life has not always been easy. Some hard moments taught me resilience, patience and how to keep going when things get tough. I bring that into my work: I stay calm under pressure, and I care about the people around me.",
      "I like clean, testable code that is easy to change. I follow new technology closely, but I adopt it only when it makes the product better.",
      "Outside work, you'll find me at the gym, following motorsport, or traveling."
    ]
  },

  metrics: [
    {
      value: "10+",
      label: "Years of Experience",
      description: "Delivering production mobile architectures"
    },
    {
      value: "100M+",
      label: "Active Users Served",
      description: "Across telecom, fintech, and utilities"
    },
    {
      value: "20M+",
      label: "MAU Scale Owned",
      description: "Consumer apps technical leadership"
    }
  ],

  projectCategories: ['All', 'Telecom', 'Fintech', 'Embedded', 'Automotive', 'Utilities'],

  projects: [
    {
      id: "mytim",
      name: "MyTIM",
      clientContext: "Led at TIM (Telecom Italia)",
      company: "TIM (Telecom Italia)",
      period: "2019 – 2024",
      category: "Telecom",
      summary: "Italy's most-used telecom application powering account management, billing, and connectivity for over 20M active users.",
      story: {
        problem: "The application had legacy code maintained by an external consultancy, causing high bug volume and slow loading times.",
        whatIDid: "Led the internalization transition to an internal squad, modernized the codebase to Kotlin and Clean Architecture, and coordinated cross-functional release plans.",
        result: "Cut load times in half in key areas, reduced critical bugs by ~30%, and maintained 99.5% uptime SLA."
      },
      bulletPoints: [
        "Led the Android team for MyTIM, Italy's most-used telecom app, coordinating with marketing, product, design, and backend teams.",
        "Led internalization from an external consultancy: absorbed full ownership over 3-4 months, grew squad to 4 Android and 3 iOS engineers.",
        "Transitioned codebase to Kotlin and Clean Architecture, delivering a full UI restyling with strict SLA compliance.",
        "Coordinated Google Play Store release cycles across multiple apps with phased rollouts and telemetry monitoring.",
        "Integrated Adobe AEM-driven content and Adobe Analytics tracking to optimize user journey conversions."
      ],
      techStack: ["Kotlin", "Clean Architecture", "MVVM", "RxJava", "Retrofit", "Google Maps API", "Firebase", "Android Jetpack", "Adobe AEM"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.telecomitalia.centodiciannove",
      screenshots: [
        "/assets/projects/mytim_1.webp",
        "/assets/projects/mytim_2.webp",
        "/assets/projects/mytim_3.webp",
        "/assets/projects/mytim_4.webp",
        "/assets/projects/mytim_5.webp",
        "/assets/projects/mytim_6.webp"
      ]
    },
    {
      id: "timpay",
      name: "TIM Pay",
      clientContext: "Led at TIM in partnership with Hype / Banca Sella",
      company: "TIM / Hype",
      period: "2019 – 2021",
      category: "Fintech",
      summary: "Digital banking and payment app with 500K+ downloads and 4.6★ Play Store rating, featuring PSD2 biometric security.",
      story: {
        problem: "Strict regulatory deadline to build a compliant PSD2 banking experience with dynamic transaction linking from scratch.",
        whatIDid: "Designed and implemented Strong Customer Authentication (SCA), biometric authentication, and push-based two-factor flows as sole Android developer.",
        result: "Delivered on schedule with 500K+ downloads, zero regulatory breaches, and a sustained 4.6★ user rating."
      },
      bulletPoints: [
        "Led end-to-end development of TIM Pay in strategic partnership with Hype and Banca Sella.",
        "Designed and built PSD2 Strong Customer Authentication (SCA) from scratch as sole Android developer against regulatory deadline.",
        "Implemented biometric and push-based two-factor authentication flows with dynamic transaction linking.",
        "Delivered 500K+ downloads and sustained a 4.6★ Google Play Store rating.",
        "Managed secure token storage, banking APIs, and real-time fraud mitigation."
      ],
      techStack: ["Kotlin", "Clean Architecture", "Biometrics", "PSD2 / SCA", "Push 2FA", "Security & Encryption", "Retrofit", "Room"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.hype.app",
      screenshots: [
        "/assets/projects/timpay_1.webp",
        "/assets/projects/timpay_2.webp",
        "/assets/projects/timpay_3.webp",
        "/assets/projects/timpay_4.webp",
        "/assets/projects/timpay_5.webp",
        "/assets/projects/timpay_6.webp"
      ]
    },
    {
      id: "technogym",
      name: "Biostrength & Biocircuit",
      clientContext: "Architected at Technogym",
      company: "Technogym",
      period: "May 2024 – Present",
      category: "Embedded",
      summary: "Embedded Android OS powering AI-driven smart strength machines deployed in premium fitness facilities worldwide.",
      story: {
        problem: "Multiple legacy machine apps with divergent architectures and maintenance overhead across different fitness product lines.",
        whatIDid: "Unified multiple apps into a single mono-app under Clean Architecture, with progressive Jetpack Compose migration and real-time sensor processing.",
        result: "Cut maintenance overhead by ~50%, reduced release cycles by ~35%, and enabled real-time AI biodata feedback during workouts."
      },
      bulletPoints: [
        "Leading architectural modernization of embedded Android OS powering AI-driven strength machines (Biostrength, Biocircuit).",
        "Unified multiple legacy applications into a single mono-app under Clean Architecture with progressive Jetpack Compose migration, reducing maintenance overhead by ~50%.",
        "Refactored internal libraries using Kotlin Flow and reactive patterns, improving sensor data reliability and enabling real-time biodata processing.",
        "Architected a shared atomic design system across Cardio and Strength teams, accelerating feature development by ~50%.",
        "Implemented GitHub Actions CI/CD with device-based robotic testing and centralized Gradle convention plugins across 8+ product lines, cutting release cycles by ~35%."
      ],
      techStack: ["Kotlin", "Jetpack Compose", "Kotlin Flow", "Coroutines", "Android NDK", "Clean Architecture", "Media3", "GitHub Actions", "Gradle Plugins"],
      publicUrl: "https://www.technogym.com/en-INT/biostrength/",
      screenshots: [
        "/assets/projects/technogym_1.webp",
        "/assets/projects/technogym_2.webp",
        "/assets/projects/technogym_3.webp"
      ]
    },
    {
      id: "lamborghini",
      name: "Lamborghini Unica",
      clientContext: "Built at Deloitte Digital for Lamborghini",
      company: "Deloitte Digital",
      period: "2017 – 2019",
      category: "Automotive",
      summary: "Connected Car companion application delivering vehicle telemetry, exclusive brand experiences, and remote status for Lamborghini owners.",
      story: {
        problem: "Ultra-high-net-worth owners needed a secure, luxury mobile experience to monitor their vehicles and access private factory events.",
        whatIDid: "Developed vehicle connectivity modules, luxury UI interactions, and remote telemetry features matching Lamborghini brand guidelines.",
        result: "Delivered the official companion app for flagship Lamborghini vehicles with global client distribution."
      },
      bulletPoints: [
        "Developed the Lamborghini Unica Connected Car companion app for the premium automotive segment.",
        "Architected secure telemetry communications and vehicle remote status features.",
        "Engineered bespoke UI transitions matching the automotive brand aesthetic.",
        "Coordinated store submission and client certification processes."
      ],
      techStack: ["Native Android", "Java/Kotlin", "Connected Car Telemetry", "REST APIs", "Security Protocols", "Custom Animation"],
      publicUrl: "https://www.lamborghini.com/it-en/servizi-al-cliente/app-clienti#val-ht",
      screenshots: [
        "/assets/projects/lamborghini_1.webp"
      ]
    },
    {
      id: "eon",
      name: "E.ON B2C",
      clientContext: "Built at Deloitte Digital for E.ON",
      company: "Deloitte Digital",
      period: "2016 – 2018",
      category: "Utilities",
      summary: "Energy customer management and smart home IoT platform with millions of device interactions and CMS-driven content.",
      story: {
        problem: "High volume of concurrent smart meter interactions and complex billing visualization across millions of domestic customers.",
        whatIDid: "Architected the mobile client architecture supporting IoT device connectivity and CMS-driven campaign updates.",
        result: "Delivered a reliable, scalable utility app supporting millions of monthly meter readings and bill payments."
      },
      bulletPoints: [
        "Architected utilities mobile solutions for E.ON B2C with millions of IoT device interactions.",
        "Integrated Adobe CMS-driven dynamic content and personalized energy analytics.",
        "Delivered responsive cross-platform architectures across native Android and iOS.",
        "Owned app submission and QA testing cycles across diverse hardware profiles."
      ],
      techStack: ["Android (Java/Kotlin)", "IoT Connectivity", "Adobe CMS", "REST APIs", "Reactive Extensions", "Firebase"],
      publicUrl: "https://play.google.com/store/apps/details?id=com.eonenergia.eon",
      screenshots: [
        "/assets/projects/eon_1.webp",
        "/assets/projects/eon_2.webp",
        "/assets/projects/eon_3.webp",
        "/assets/projects/eon_4.webp",
        "/assets/projects/eon_5.webp",
        "/assets/projects/eon_6.webp"
      ]
    },
    {
      id: "estra",
      name: "Estra",
      clientContext: "Built at Deloitte Digital for Estra",
      company: "Deloitte Digital",
      period: "2017 – 2019",
      category: "Utilities",
      summary: "Energy customer engagement and billing portal providing self-service contract management, consumption graphs, and bill payment.",
      story: {
        problem: "Customers needed an intuitive digital channel to handle self-metering, billing checks, and energy usage tracking.",
        whatIDid: "Engineered user account management, bill payment modules, and dynamic consumption charts.",
        result: "Significantly decreased customer care call volumes by automating core billing and meter submission tasks."
      },
      bulletPoints: [
        "Engineered customer self-service mobile app for energy and gas customer engagement.",
        "Implemented real-time bill visualization, barcode/QR payment flows, and meter reading submissions.",
        "Built robust offline caching and retry mechanisms for irregular network connectivity.",
        "Coordinated multi-channel delivery on Google Play Store."
      ],
      techStack: ["Android (Java/Kotlin)", "REST APIs", "Room/SQLite", "Payment Integrations", "Charts & Telemetry"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.estraspa.areaclienti",
      screenshots: [
        "/assets/projects/estra_1.webp",
        "/assets/projects/estra_2.webp",
        "/assets/projects/estra_3.webp",
        "/assets/projects/estra_4.webp",
        "/assets/projects/estra_5.webp",
        "/assets/projects/estra_6.webp"
      ]
    }
  ],

  timeline: [
    {
      company: "Technogym",
      role: "Senior Android Engineer — Strength Team (Biostrength & Biocircuit)",
      period: "May 2024 – Present",
      location: "Remote, Italy",
      companyUrl: "https://www.linkedin.com/company/technogym/",
      summary: "Leading architectural modernization of embedded Android OS powering AI-driven strength machines deployed in premium fitness facilities globally.",
      achievements: [
        "Unified multiple legacy applications into a single mono-app under Clean Architecture redesign with progressive Jetpack Compose migration, reducing maintenance overhead by ~50%.",
        "Refactored internal libraries using Kotlin Flow and reactive patterns, improving sensor data reliability and enabling real-time biodata processing for AI-driven workouts.",
        "Architected a shared atomic design system across Cardio and Strength teams, accelerating feature development by ~50% and ensuring brand alignment.",
        "Implemented GitHub Actions CI/CD with device-based robotic testing and centralized Gradle convention plugins across 8+ product lines, cutting release cycles by ~35%.",
        "Supported team Agile transformation using CSM/CSPO expertise, optimizing sprint ceremonies and backlog refinement to deliver AI-enabled features 25% faster. Integrated AI tools (Claude Code, Cursor, Copilot) into team workflows."
      ],
      techStack: ["Kotlin", "Flow", "Coroutines", "Jetpack Compose", "Clean Architecture", "Android SDK/NDK", "GitHub Actions", "Gradle Conventions", "Android Media3"]
    },
    {
      company: "TIM (Telecom Italia)",
      role: "Tech Lead & Project Leader, Android (2021 – 2024) · Senior Android Engineer (2019 – 2021)",
      period: "May 2019 – May 2024",
      location: "Milan / Turin / Remote, Italy",
      companyUrl: "https://www.linkedin.com/company/tim/",
      summary: "Owned Android development strategy for TIM's mobile ecosystem (MyTIM, TIM Pay, TIMpersonal), powering digital experiences for 20M+ active users.",
      achievements: [
        "Led Android team for MyTIM, Italy's most-used telecom app, coordinating quarterly roadmaps with business priorities.",
        "Acted as Android technical lead at cross-functional planning tables translating commercial goals into deliverable release plans with strict deadline adherence.",
        "Led internalization of MyTIM from external consultancy: transitioned codebase to Kotlin and Clean Architecture, cut load times in half in key areas, and reduced critical bugs by ~30% while maintaining 99.5% uptime SLA.",
        "Led end-to-end development of TIM Pay (partnership with Hype / Banca Sella): designed PSD2 Strong Customer Authentication (SCA) from scratch as sole Android developer against regulatory deadline (500K+ downloads, 4.6★ rating).",
        "Coordinated Google Play Store release cycles across multiple apps, managing phased rollouts and telemetry monitoring in alignment with marketing campaigns.",
        "Integrated Adobe AEM content and Adobe Analytics tracking to optimize user journey conversions.",
        "Mentored engineers, ran sprint planning, code reviews, and technical interviews to scale the Android squad."
      ],
      techStack: ["Kotlin", "MVVM", "Clean Architecture", "RxJava", "Retrofit", "Google Maps API", "Firebase", "Android Jetpack", "Adobe AEM", "Adobe Analytics"]
    },
    {
      company: "Deloitte Digital",
      role: "Consultant and Mobile Engineer",
      period: "Sep 2016 – May 2019",
      location: "Milan, Italy",
      companyUrl: "https://www.linkedin.com/company/deloitte-digital/",
      summary: "Delivered enterprise mobile solutions for Fortune 500 clients across utilities, automotive, and consumer sectors.",
      achievements: [
        "Served as Tech Lead on RFPs and cost estimations, contributing to architecture decisions that won €2M+ in client projects.",
        "Architected utilities apps for E.ON B2C (millions of IoT device interactions, CMS-driven content) and Estra (energy customer engagement and content delivery).",
        "Developed the Lamborghini Unica Connected Car companion app for the premium automotive segment.",
        "Delivered solutions across native Android, iOS (Swift), Ionic, React Native, and Flutter stacks.",
        "Owned Play Store and App Store submission processes for client deliverables, including media asset preparation and release coordination.",
        "Speaker and organizer at DroidCon and CodeMotion industry events."
      ],
      techStack: ["Native Android (Java/Kotlin)", "iOS (Swift)", "Ionic", "React Native", "Flutter", "Firebase", "REST APIs"]
    },
    {
      company: "STMicroelectronics",
      role: "University Internship",
      period: "Apr 2015 – Sep 2015",
      location: "Catania, Italy",
      companyUrl: "https://www.linkedin.com/company/stmicroelectronics/",
      summary: "Performance optimization of embedded systems and mobile applications through static and dynamic code analysis.",
      achievements: [
        "Conducted static and dynamic code analysis to identify execution bottlenecks in embedded software.",
        "Profiled memory footprint and CPU utilization for resource-constrained platforms.",
        "Formulated optimization recommendations for low-power mobile execution."
      ],
      techStack: ["C / C++", "Embedded Systems", "Static & Dynamic Code Analysis", "Performance Profiling"]
    }
  ],

  skills: [
    {
      title: "Android & Mobile",
      skills: [
        { name: "Kotlin", projectIds: ["mytim", "timpay", "technogym", "eon", "estra"] },
        { name: "Jetpack Compose", projectIds: ["technogym"] },
        { name: "Kotlin Flow & Coroutines", projectIds: ["technogym", "mytim"] },
        { name: "Android SDK / NDK", projectIds: ["technogym", "lamborghini"] },
        { name: "Android Jetpack", projectIds: ["mytim", "timpay", "technogym"] },
        { name: "Android Media3", projectIds: ["technogym"] },
        { name: "Java", projectIds: ["mytim", "lamborghini", "eon", "estra"] },
        { name: "Room / SQLite", projectIds: ["timpay", "mytim", "estra"] },
        { name: "Retrofit & OkHttp", projectIds: ["mytim", "timpay", "eon", "estra"] },
        { name: "Hilt / Dagger / Koin", projectIds: ["technogym", "mytim"] }
      ]
    },
    {
      title: "Architecture & Standards",
      skills: [
        { name: "Clean Architecture", projectIds: ["mytim", "timpay", "technogym"] },
        { name: "MVVM / MVI / MVP", projectIds: ["mytim", "timpay", "technogym", "eon"] },
        { name: "Multi-Module Architecture", projectIds: ["technogym", "mytim"] },
        { name: "Atomic Design Systems", projectIds: ["technogym"] },
        { name: "SOLID Principles", projectIds: ["mytim", "timpay", "technogym"] },
        { name: "PSD2 / Biometric Security", projectIds: ["timpay"] },
        { name: "Sensor & Biodata Streams", projectIds: ["technogym"] }
      ]
    },
    {
      title: "DevOps, Release & Automation",
      skills: [
        { name: "Google Play Release Management", projectIds: ["mytim", "timpay", "eon", "estra", "lamborghini"] },
        { name: "Phased & Gradual Rollouts", projectIds: ["mytim", "timpay"] },
        { name: "GitHub Actions CI/CD", projectIds: ["technogym"] },
        { name: "Gradle Convention Plugins", projectIds: ["technogym"] },
        { name: "Fastlane", projectIds: ["mytim", "technogym"] },
        { name: "Device-based Robotic Testing", projectIds: ["technogym"] },
        { name: "Feature Flagging", projectIds: ["mytim", "technogym"] }
      ]
    },
    {
      title: "Leadership & Methodology",
      skills: [
        { name: "Mobile Tech Leadership", projectIds: ["mytim", "technogym", "deloitte"] },
        { name: "Team Hiring & Mentoring", projectIds: ["mytim"] },
        { name: "Cross-Functional Coordination", projectIds: ["mytim", "technogym"] },
        { name: "Agile & Sprint Planning (CSM/CSPO)", projectIds: ["technogym", "mytim"] },
        { name: "RFP & Technical Estimation (€2M+)", projectIds: ["deloitte"] },
        { name: "Code Review & Quality Standards", projectIds: ["mytim", "technogym"] },
        { name: "SLA & 99.5% Uptime Governance", projectIds: ["mytim"] }
      ]
    },
    {
      title: "Cross-Platform & Cloud",
      skills: [
        { name: "iOS (Swift)", projectIds: ["deloitte"] },
        { name: "Flutter", projectIds: ["deloitte"] },
        { name: "React Native", projectIds: ["deloitte"] },
        { name: "Ionic", projectIds: ["deloitte"] },
        { name: "Google Cloud Platform", projectIds: ["mytim"] },
        { name: "Firebase", projectIds: ["mytim", "timpay", "deloitte"] },
        { name: "Adobe AEM & Analytics", projectIds: ["mytim", "eon"] },
        { name: "Salesforce Platform", projectIds: [] }
      ]
    },
    {
      title: "AI-Augmented Development",
      skills: [
        { name: "Claude Code", projectIds: ["technogym"] },
        { name: "Cursor", projectIds: ["technogym"] },
        { name: "GitHub Copilot", projectIds: ["technogym"] },
        { name: "Antigravity", projectIds: ["technogym"] },
        { name: "AI-Enabled Feature Acceleration", projectIds: ["technogym"] }
      ]
    }
  ],

  openSource: [
    {
      title: "alexfin90 / public-repositories",
      description: "[ADD description - Public repositories on GitHub]",
      tech: ["Kotlin", "Android", "Gradle"],
      url: "https://github.com/alexfin90"
    },
    {
      title: "android-clean-architecture-sample",
      description: "[ADD description - Clean Architecture, Kotlin Coroutines, and Jetpack Compose patterns]",
      tech: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Coroutines"],
      url: "https://github.com/alexfin90"
    },
    {
      title: "gradle-convention-plugins-starter",
      description: "[ADD description - Centralized build logic and multi-module dependency management]",
      tech: ["Gradle", "Kotlin DSL", "CI/CD"],
      url: "https://github.com/alexfin90"
    }
  ],

  certifications: [
    {
      name: "Certified ScrumMaster® (CSM)",
      issuer: "Scrum Alliance",
      credentialUrl: "https://drive.google.com/file/d/1PYv7-I8gXZXYiRxeiHGiEU45Dedz8-B_/view"
    },
    {
      name: "Certified Scrum Product Owner® (CSPO)",
      issuer: "Scrum Alliance",
      credentialUrl: "https://drive.google.com/file/d/1ESL77pbJBdtrV43BxbhcKIp2lUTHzj8Z/view"
    },
    {
      name: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      credentialUrl: "https://www.credential.net/25566274-f04e-4788-a910-101e187ab2a0"
    },
    {
      name: "Salesforce Certified Platform Developer I",
      issuer: "Salesforce",
      credentialUrl: "https://drive.google.com/file/d/0B2rplhhDjcpjNG1SakFVWXdVYlk/view?resourcekey=0-KsPmPS0RsuIJN1ZNXdewVw"
    },
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      credentialUrl: "https://drive.google.com/file/d/0B2rplhhDjcpjVVNBQjlKOHFnOFU/view?resourcekey=0-9gMQhC8z4sXTggaudDRkHg"
    }
  ],

  education: [
    {
      degree: "MSc in Computer Engineering",
      institution: "Università degli Studi di Catania",
      honors: "110/110 summa cum laude",
      period: "2014 – 2016",
      institutionUrl: "https://www.unict.it/"
    },
    {
      degree: "BSc in Computer Engineering",
      institution: "Università degli Studi di Catania",
      honors: "110/110",
      period: "2011 – 2014",
      institutionUrl: "https://www.unict.it/"
    }
  ],

  config: {
    // Paste your Formspree endpoint URL here, e.g. "https://formspree.io/f/mqkvnxyz"
    formEndpoint: "https://formspree.io/f/[ADD_YOUR_FORMSPREE_ENDPOINT_ID]",
    privacyNote: "Your data is used only to reply to your message. It is never shared or stored for marketing.",
    githubProfileUrl: "https://github.com/alexfin90",
    linkedinProfileUrl: "https://www.linkedin.com/in/alexfinocchiaro"
  }
};
