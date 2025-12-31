export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  category: 'Web' | 'AI' | 'Security' | 'Mobile' | 'Cloud' | 'IoT' | 'Data' | 'Portfolio' | 'Chatbot';
  problem: string;
  solution: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Icon name reference
}