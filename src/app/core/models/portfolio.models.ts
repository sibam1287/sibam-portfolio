export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  features?: string[];
  challenges?: string[];
  architecture?: string;
}

export interface Skill {
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools & Deployment';
  icon?: string;
}

export interface ExploringSkill {
  name: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}
