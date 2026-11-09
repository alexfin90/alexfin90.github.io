/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Alessandro Finocchiaro: Portfolio Data Source
 * All text, facts, metrics, links, and project records originate strictly from the CV.
 * Decoupled data model ready for export or Kotlin Multiplatform migration.
 */

// Single source for the Technogym role (timeline, project card, detail view, logcat).
export const technogymRole = "Senior Android Engineer & Design System Lead";

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
  category: 'Telecom' | 'Fintech' | 'Automotive' | 'Utilities' | 'Connected Fitness';
  summary: string;
  story: ProjectStory;
  bulletPoints: string[];
  techStack: string[];
  publicUrl: string;
  screenshots: string[];
  deviceType: 'phone' | 'console';
}

export interface TimelineEntry {
  company: string;
  role: string;
  roleDetail?: string; // optional second line under the role
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
  tagline: string;
  summary: string;
  email: string;
  linkedin: string;
  github: string;
  profilePhoto: string;
  about: string[];
  coreFocus: string[];
}

export interface CaseStudy {
  title: string;
  company: string;
  period: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  tags: string[];
}

export interface BeyondMobileItem {
  title: string;
  proof: string;
  targetId: string; // section or element id to scroll to
}

export interface UiText {
  workSubtitle: string;
  consoleDeviceLabel: string;
  consoleStatusLabel: string;
  consoleTag: string;
  consolePlaceholder: string;
  logcatTechnogym: string;
}

export interface PortfolioConfig {
  contactFormEnabled: boolean;
  contactSubtitle: string;
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
  caseStudies: CaseStudy[];
  beyondMobileIntro: string;
  beyondMobile: BeyondMobileItem[];
  certifications: Certification[];
  education: {
    degree: string;
    institution: string;
    honors: string;
    period: string;
    institutionUrl: string;
  }[];
  uiText: UiText;
  config: PortfolioConfig;
} = {
  personalInfo: {
    name: "Alessandro Finocchiaro",
    title: "Senior Android Engineer & Tech Lead",
    tagline: "Mobile tech lead with end-to-end digital experience: apps, CMS, analytics, CRM, cloud and payments.",
    summary: "Senior Android Engineer and Tech Lead with 10+ years architecting and delivering high-scale consumer mobile applications for 100M+ active users across telecom, fintech, automotive, utilities, and connected fitness.",
    email: "alexfinocchiaro90@gmail.com",
    linkedin: "https://www.linkedin.com/in/alexfinocchiaro",
    github: "https://github.com/alexfin90",
    profilePhoto: "/assets/aistudio/AlexImage_d3df8d68.jpg",
    about: [
      "I wrote my first lines of code when I was six. That curiosity never left me. It took me to a Master's degree in Computer Engineering, and then to more than ten years of building apps used by millions of people.",
      "Life has not always been easy. Some hard moments taught me resilience, patience and how to keep going when things get tough. I bring that into my work: I stay calm under pressure, and I care about the people around me.",
      "I like clean, testable code that is easy to change. I follow new technology closely, but I adopt it only when it makes the product better.",
      "I'm also passionate about finance and blockchain. I follow how money and technology meet, from mobile payments to DeFi, and it's part of why I enjoyed building TIM Pay.",
      "Outside work, you'll find me at the gym, following motorsport, or traveling."
    ],
    coreFocus: ["Clean Architecture", "Kotlin & Jetpack Compose", "AI-augmented development", "20M+ MAU Delivery", "CSM® & CSPO®"]
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

  projectCategories: ['All', 'Connected Fitness', 'Telecom', 'Fintech', 'Automotive', 'Utilities'],

  projects: [
    {
      id: "technogym",
      name: "Biostrength & Biocircuit",
      clientContext: `${technogymRole} at Technogym`,
      company: "Technogym",
      period: "May 2024 – Present",
      category: "Connected Fitness",
      summary: "Android platform powering Technogym's AI-driven strength machines, used in premium fitness facilities worldwide.",
      story: {
        problem: "Several legacy applications ran on the machines, each with its own architecture and maintenance cost.",
        whatIDid: "Unified them into a single mono-app with Clean Architecture and a progressive Jetpack Compose migration, and refactored internal libraries with Kotlin Flow for real-time sensor data.",
        result: "Maintenance overhead down by ~50%, plus more reliable sensor data for real-time biodata processing in AI-driven workouts."
      },
      bulletPoints: [
        "Leading the architectural modernization of the Android platform powering Technogym's AI-driven strength machines (Biostrength, Biocircuit).",
        "Unified multiple legacy applications into a single mono-app under a Clean Architecture redesign with progressive Jetpack Compose migration, reducing maintenance overhead by ~50%.",
        "Refactored internal libraries using Kotlin Flow and reactive patterns, improving sensor data reliability and enabling real-time biodata processing for AI-driven workouts.",
        "Architected a shared atomic design system used by 4 teams across 4 product touchpoints, accelerating feature development by ~50%.",
        "Implemented GitHub Actions CI/CD with device-based robotic testing and centralized Gradle convention plugins across 8+ product lines, cutting release cycles by ~35%."
      ],
      techStack: ["Kotlin", "Flow", "Coroutines", "Jetpack Compose", "Clean Architecture", "Android SDK/NDK", "GitHub Actions", "Gradle conventions", "Android Media3"],
      publicUrl: "https://www.technogym.com/en-INT/biostrength/",
      deviceType: "console",
      screenshots: [
        "/assets/projects/technogym_2.webp",
        "/assets/projects/technogym_1.webp"
      ]
    },
    {
      id: "mytim",
      name: "MyTIM",
      clientContext: "Led at TIM (Telecom Italia)",
      company: "TIM (Telecom Italia)",
      period: "2019 – 2024",
      category: "Telecom",
      summary: "Italy's most-used telecom app, part of TIM's mobile ecosystem serving 20M+ active users.",
      story: {
        problem: "MyTIM was developed by an external consultancy, and TIM wanted to bring it in-house.",
        whatIDid: "Led the internalization over 3-4 months, grew the squad to 4 Android and 3 iOS engineers, moved the code to Kotlin and Clean Architecture, and delivered a full UI restyling.",
        result: "Load times cut in half in key areas, critical bugs down by ~30%, and a 99.5% uptime SLA maintained."
      },
      bulletPoints: [
        "Led the Android team for MyTIM, Italy's most-used telecom app, coordinating with marketing, product, design, and backend teams to align quarterly release roadmaps with business priorities.",
        "Led the internalization of MyTIM from an external consultancy: absorbed full ownership over a 3-4 month transition and grew the internal squad to 4 Android and 3 iOS engineers.",
        "Transitioned the codebase to Kotlin and Clean Architecture and delivered a full UI restyling, cutting load times in half in key areas and reducing critical bugs by ~30% while maintaining a 99.5% uptime SLA.",
        "Coordinated Google Play Store release cycles across multiple apps, managing phased rollouts, store assets, and post-release monitoring in alignment with marketing campaigns.",
        "Integrated Adobe AEM-driven content and Adobe Analytics tracking, using usage data to inform feature prioritization."
      ],
      techStack: ["Kotlin", "MVVM", "Clean Architecture", "RxJava", "Retrofit", "Google Maps API", "Firebase", "Android Jetpack", "Adobe AEM", "Adobe Analytics"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.telecomitalia.centodiciannove",
      deviceType: "phone",
      screenshots: [
        "/assets/projects/mytim_3.webp",
        "/assets/projects/mytim_4.webp",
        "/assets/projects/mytim_5.webp",
        "/assets/projects/mytim_6.webp"
      ]
    },
    {
      id: "timpay",
      name: "TIM Pay",
      clientContext: "Led at TIM, in partnership with Hype / Banca Sella",
      company: "TIM / Hype",
      period: "2019 – 2024",
      category: "Fintech",
      summary: "Payments app built in partnership with Hype and Banca Sella: 500K+ downloads and a 4.6★ Play Store rating.",
      story: {
        problem: "European PSD2 rules required Strong Customer Authentication, with a fixed regulatory deadline.",
        whatIDid: "Designed and built SCA from scratch as the sole Android developer: biometric and push-based two-factor flows with dynamic transaction linking.",
        result: "Led the app end to end: 500K+ downloads and a 4.6★ Play Store rating."
      },
      bulletPoints: [
        "Led end-to-end development of TIM Pay, in partnership with Hype and Banca Sella.",
        "Designed and built PSD2 Strong Customer Authentication (SCA) from scratch, as sole Android developer against a regulatory deadline.",
        "Implemented biometric and push-based two-factor flows with dynamic transaction linking.",
        "500K+ downloads and a 4.6★ Google Play Store rating."
      ],
      techStack: ["Kotlin", "MVVM", "Clean Architecture", "PSD2 / SCA", "Biometrics", "Push-based 2FA", "Retrofit", "Firebase"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.hype.app",
      deviceType: "phone",
      screenshots: [
        "/assets/projects/timpay_3.webp",
        "/assets/projects/timpay_4.webp",
        "/assets/projects/timpay_5.webp",
        "/assets/projects/timpay_6.webp"
      ]
    },
    {
      id: "lamborghini",
      name: "Lamborghini Unica",
      clientContext: "Built at Deloitte Digital for Lamborghini",
      company: "Deloitte Digital",
      period: "2016 – 2019",
      category: "Automotive",
      summary: "Connected car companion app for Lamborghini, in the premium automotive segment.",
      story: {
        problem: "Lamborghini needed a companion app for its connected cars.",
        whatIDid: "Developed the Lamborghini Unica connected car companion app as part of the Deloitte Digital team.",
        result: "[ADD: the result you are proud of]"
      },
      bulletPoints: [
        "Developed the Lamborghini Unica Connected Car companion app for the premium automotive segment.",
        "Owned Play Store and App Store submission processes for client deliverables, including media asset preparation and release coordination."
      ],
      techStack: ["Native Android (Java/Kotlin)", "iOS (Swift)", "Firebase", "REST APIs"],
      publicUrl: "https://www.lamborghini.com/it-en/servizi-al-cliente/app-clienti#val-ht",
      deviceType: "phone",
      screenshots: [
        "/assets/projects/lamborghini_1.webp"
      ]
    },
    {
      id: "eon",
      name: "E.ON B2C",
      clientContext: "Built at Deloitte Digital for E.ON",
      company: "Deloitte Digital",
      period: "2016 – 2019",
      category: "Utilities",
      summary: "B2C utilities app for E.ON, with millions of IoT device interactions and CMS-driven content.",
      story: {
        problem: "A consumer energy app that had to handle IoT device interactions at scale and content managed from a CMS.",
        whatIDid: "Architected the E.ON B2C app as part of the Deloitte Digital team.",
        result: "[ADD: the result you are proud of]"
      },
      bulletPoints: [
        "Architected the E.ON B2C utilities app: millions of IoT device interactions and CMS-driven content.",
        "Owned Play Store and App Store submission processes for client deliverables, including media asset preparation and release coordination."
      ],
      techStack: ["Native Android (Java/Kotlin)", "iOS (Swift)", "Firebase", "REST APIs"],
      publicUrl: "https://play.google.com/store/apps/details?id=com.eonenergia.eon",
      deviceType: "phone",
      screenshots: [
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
      period: "2016 – 2019",
      category: "Utilities",
      summary: "Energy customer engagement and content delivery app for Estra.",
      story: {
        problem: "Estra wanted a mobile channel to engage its energy customers and deliver content.",
        whatIDid: "Architected the Estra app as part of the Deloitte Digital team.",
        result: "[ADD: the result you are proud of]"
      },
      bulletPoints: [
        "Architected the Estra app for energy customer engagement and content delivery.",
        "Owned Play Store and App Store submission processes for client deliverables, including media asset preparation and release coordination."
      ],
      techStack: ["Native Android (Java/Kotlin)", "iOS (Swift)", "Firebase", "REST APIs"],
      publicUrl: "https://play.google.com/store/apps/details?id=it.estraspa.areaclienti",
      deviceType: "phone",
      screenshots: [
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
      role: technogymRole,
      roleDetail: "Shared Android libraries and platform",
      period: "May 2024 – Present",
      location: "Remote, Italy",
      companyUrl: "https://www.linkedin.com/company/technogym/",
      summary: "Leading architectural modernization of the Android platform powering AI-driven strength machines deployed in premium fitness facilities globally.",
      achievements: [
        "Unified multiple legacy applications into a single mono-app under Clean Architecture redesign with progressive Jetpack Compose migration, reducing maintenance overhead by ~50%.",
        "Maintain the shared Android libraries, Gradle convention plugins and build setup used by all product teams, across 8+ product lines. This work keeps every app consistent and makes the other teams faster.",
        "Refactored internal libraries using Kotlin Flow and reactive patterns, improving sensor data reliability and enabling real-time biodata processing for AI-driven workouts.",
        "Lead the technical development of the shared Jetpack Compose design system, used by 4 teams across 4 product touchpoints and around 10 apps, accelerating feature development by ~50%.",
        "Implemented GitHub Actions CI/CD with device-based robotic testing and centralized Gradle convention plugins across 8+ product lines, cutting release cycles by ~35%.",
        "Supported team Agile transformation using CSM/CSPO expertise, optimizing sprint ceremonies and backlog refinement to deliver AI-enabled features 25% faster. Brought AI-augmented development into the team's daily workflow with Claude Code, Cursor, GitHub Copilot and Antigravity. I use coding agents for most daily tasks, from refactoring to tests and code review, and I choose when they help and when to do it by hand."
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
        "Performance optimization of embedded systems and mobile applications through static and dynamic code analysis."
      ],
      techStack: ["Embedded systems", "Static & dynamic code analysis", "Performance optimization"]
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
        { name: "Google Cloud Platform", projectIds: [] },
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
        { name: "Coding agents & agentic workflows", projectIds: ["technogym"] },
        { name: "AI-Enabled Feature Acceleration", projectIds: ["technogym"] }
      ]
    }
  ],

  openSource: [
    {
      title: "StocksTracker",
      description: "Real-time stock price tracker: WebSocket feed, 100% Jetpack Compose, MVVM + Clean Architecture, multi-module Gradle with convention plugins, Kotlin Flow, Hilt, unit and Compose UI tests.",
      tech: ["Kotlin", "Jetpack Compose", "Flow", "Hilt", "Clean Architecture"],
      url: "https://github.com/alexfin90/StocksTracker"
    }
  ],

  caseStudies: [
    {
      title: "PSD2 authentication for a fintech app",
      company: "TIM Pay, TIM",
      period: "2019 – 2024",
      situation: "I was the only Android developer on TIM Pay, a fintech app co-branded with Hype and Banca Sella: card payments, transfers, crypto. One iOS contractor, no dedicated backend team on our side.",
      task: "Build PSD2 Strong Customer Authentication from scratch, against a legal deadline. Every payment needed two independent factors, and each challenge had to be linked to the exact amount and recipient.",
      action: "I designed the whole flow: biometrics as the primary factor, push notification as the second, SMS OTP as fallback. I built the logic that ties each challenge to its transaction, so a captured challenge cannot be replayed on another payment, and spent a lot of time on edge cases (expired sessions, broken fallbacks, fraud attempts) before rollout.",
      result: "Shipped on time and fully compliant. The flow became the security backbone of an app with 500K+ downloads and a 4.6 rating on the Play Store.",
      tags: ["Fintech", "Security", "PSD2", "Android"]
    },
    {
      title: "Bringing MyTIM in-house",
      company: "MyTIM, TIM",
      period: "2019 – 2024",
      situation: "MyTIM, the main app of Italy's largest telecom operator (20M+ users), was built by an external consultancy, and TIM decided to bring it in-house.",
      task: "Lead the transition: take full ownership of a large legacy codebase in 3-4 months, without stopping releases.",
      action: "On the people side, I grew the internal squad to 4 Android and 3 iOS engineers, ran the technical interviews and paired new joiners with the outgoing team. On the code side, we moved to Kotlin and Clean Architecture module by module, never a big rewrite, and shipped a full UI restyling along the way.",
      result: "No gap in releases. Load times in key areas cut roughly in half, critical bugs down about 30%, 99.5% uptime SLA kept throughout.",
      tags: ["Leadership", "Hiring", "Kotlin", "Clean Architecture"]
    },
    {
      title: "One design system for many apps",
      company: "Technogym",
      period: "May 2024 – Present",
      situation: "Each team was building its own UI components, so the same button existed in several slightly different versions, with duplicated work and an inconsistent product.",
      task: "Create one shared Compose design system that every team could adopt.",
      action: "I built the shared library and the theming, and used Gradle convention plugins so every app stays on aligned versions. For adoption, I went team by team, starting with the components they were about to rebuild anyway, so using it saved them work from day one.",
      result: "Used by 4 teams, 4 product touchpoints and ~10 apps; feature development is roughly 50% faster and the apps look like one product.",
      tags: ["Jetpack Compose", "Design System", "Gradle"]
    }
  ],

  beyondMobileIntro: "Mobile is my core. These are the pieces around it that I have worked with.",
  beyondMobile: [
    { title: "AI-augmented development", proof: "Coding agents in most of my daily work with Claude Code, Cursor, GitHub Copilot and Antigravity, always with human review.", targetId: "exp-technogym" },
    { title: "Payments & security", proof: "Built PSD2 Strong Customer Authentication from scratch for TIM Pay.", targetId: "work" },
    { title: "Finance & fintech", proof: "Built TIM Pay with Hype and Banca Sella, including PSD2 authentication. Personal interest in finance, blockchain and DeFi.", targetId: "work" },
    { title: "CMS & content", proof: "Integrated Adobe AEM content into the TIM apps, and built CMS-driven apps for E.ON.", targetId: "work" },
    { title: "Analytics & data", proof: "Used Adobe Analytics data to prioritize features and support marketing campaigns at TIM.", targetId: "experience" },
    { title: "CRM", proof: "Salesforce Certified Platform Developer I and Administrator.", targetId: "certifications" },
    { title: "Cloud", proof: "Google Cloud Associate Cloud Engineer, and Firebase across many apps.", targetId: "certifications" },
    { title: "Release & DevOps", proof: "GitHub Actions CI/CD and Gradle convention plugins across 8+ product lines at Technogym; phased Play Store rollouts at TIM.", targetId: "experience" },
    { title: "Pre-sales & estimation", proof: "Tech lead on RFPs and estimations that won €2M+ in client projects at Deloitte Digital.", targetId: "experience" },
    { title: "Teams & Agile", proof: "Grew the MyTIM squad to 4 Android and 3 iOS engineers. CSM and CSPO certified.", targetId: "experience" },
    { title: "Cross-platform", proof: "Delivered apps in native Android, iOS (Swift), Flutter, React Native and Ionic.", targetId: "experience" }
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

  uiText: {
    workSubtitle: "Scroll through featured applications. The frame switches between a smartphone and a gym machine console.",
    consoleDeviceLabel: "Connected Fitness Console",
    consoleStatusLabel: "Android on equipment",
    consoleTag: "Connected Fitness",
    consolePlaceholder: "Android platform powering smart strength machines",
    logcatTechnogym: `${technogymRole}: shared Jetpack Compose design system used by 4 teams across 4 product touchpoints.`
  },

  config: {
    // Turn on only after formEndpoint has a real Formspree ID.
    contactFormEnabled: false,
    contactSubtitle: "Happy to talk about Android, mobile architecture and building great teams.",
    // Paste your Formspree endpoint URL here, e.g. "https://formspree.io/f/mqkvnxyz"
    formEndpoint: "https://formspree.io/f/[ADD_YOUR_FORMSPREE_ENDPOINT_ID]",
    privacyNote: "Your data is used only to reply to your message. It is never shared or stored for marketing.",
    githubProfileUrl: "https://github.com/alexfin90",
    linkedinProfileUrl: "https://www.linkedin.com/in/alexfinocchiaro"
  }
};
