import { Experience, Project, Skill, SocialLink, ExploringSkill } from '../models/portfolio.models';

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Sibam Sahu',
    role: 'Full Stack Java Developer',
    experience: '2+ Years',
    location: 'Noida, UP',
    titles: [
      'Full Stack Java Developer',
      'Angular Developer',
      'Spring Boot Developer',
      'Node.js Developer'
    ],
    heroDescription: 'I build scalable, secure, and high-performance web applications using modern frontend and backend technologies.',
    aboutDescription: 'I am a Java Full Stack Developer with 2+ years of experience building modern web applications. I have experience working with backend technologies such as Java, Spring Boot, REST APIs, Hibernate, and PostgreSQL, along with frontend technologies such as Angular, TypeScript, HTML, and CSS.\n\nI enjoy solving complex problems, designing scalable backend systems, and building clean, responsive user interfaces.',
    profileImage: 'profile.jpg',
    resumeUrl: 'documents/Sibam_Sahu_Resume.pdf',
    contactEmail: 'sibam.onwork23@gmail.com',
    mobile: '7909007315'
  },
  socialLinks: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sibam-sahu-23sp26', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:sibam.onwork23@gmail.com', icon: 'mail' }
  ] as SocialLink[],
  skills: [
    { name: 'Java', category: 'Backend', icon: 'devicon-java-plain colored' },
    { name: 'Spring Boot', category: 'Backend', icon: 'devicon-spring-original colored' },
    { name: 'Spring Security', category: 'Backend', icon: 'devicon-spring-original colored' },
    { name: 'Hibernate / JPA', category: 'Backend', icon: 'devicon-hibernate-plain colored' },
    { name: 'REST APIs', category: 'Backend', icon: 'devicon-express-original' },
    { name: 'Maven', category: 'Backend', icon: 'devicon-maven-plain colored' },
    { name: 'Node.js', category: 'Backend', icon: 'devicon-nodejs-plain colored' },
    { name: 'Express.js', category: 'Backend', icon: 'devicon-express-original' },
    { name: 'Angular', category: 'Frontend', icon: 'devicon-angularjs-plain colored' },
    { name: 'TypeScript', category: 'Frontend', icon: 'devicon-typescript-plain colored' },
    { name: 'JavaScript', category: 'Frontend', icon: 'devicon-javascript-plain colored' },
    { name: 'HTML5', category: 'Frontend', icon: 'devicon-html5-plain colored' },
    { name: 'CSS3', category: 'Frontend', icon: 'devicon-css3-plain colored' },
    { name: 'Responsive Design', category: 'Frontend', icon: 'devicon-bootstrap-plain colored' },
    { name: 'PostgreSQL', category: 'Database', icon: 'devicon-postgresql-plain colored' },
    { name: 'MySQL', category: 'Database', icon: 'devicon-mysql-plain colored' },
    { name: 'Git', category: 'Tools & Deployment', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', category: 'Tools & Deployment', icon: 'devicon-github-original' },
    { name: 'Nginx', category: 'Tools & Deployment', icon: 'devicon-nginx-original colored' },
    { name: 'Tomcat', category: 'Tools & Deployment', icon: 'devicon-tomcat-line colored' },
    { name: 'Linux', category: 'Tools & Deployment', icon: 'devicon-linux-plain' },
    { name: 'Postman', category: 'Tools & Deployment', icon: 'devicon-postman-plain colored' }
  ] as Skill[],
  currentlyExploring: [
    { name: 'AI & LLM', icon: 'devicon-tensorflow-original colored' },
    { name: 'Spring AI', icon: 'devicon-spring-original colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'System Design', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
    { name: 'Advanced Spring Boot', icon: 'devicon-spring-original colored' }
  ] as ExploringSkill[],
  experience: [
    {
      id: 'worklooper-fullstack',
      role: 'Full Stack Java Developer',
      company: 'WorkLooper Consultant Private Limited',
      duration: 'Feb 2025 – Present',
      responsibilities: [
        'Developed enterprise eCommerce systems using Spring Boot and Angular 16.',
        'Built role-based dashboards (Admin, Vendor, Merchant) and complex order workflows.',
        'Managed Linux production servers, SSL setup, DNS configuration, and deployments.',
        'Handled complete project lifecycle from architecture design to production support.'
      ]
    },
    {
      id: 'xapotech-java',
      role: 'Java Developer (Trainee)',
      company: 'Xapotech Systems Pvt Ltd',
      duration: 'Nov 2023 – Jan 2025',
      responsibilities: [
        'Developed Bus Ticket Booking system using Java 8, Spring Boot, Hibernate.',
        'Implemented REST APIs with JWT authentication and authorization.',
        'Designed MySQL schema and optimized search/indexing functionality.',
        'Integrated email services with PDF attachments for booking confirmations.'
      ]
    }
  ] as Experience[],
  projects: [
    {
      id: 'orderapp',
      title: 'OrderApp',
      shortDescription: 'Garment E-Commerce & Order Management Platform',
      fullDescription: 'A complete garment-based order management and e-commerce application where vendors can upload products, clients can browse and place orders, and administrators can manage users, vendors, products, orders, and invoices.',
      tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Hibernate', 'REST APIs', 'Full Stack'],
      liveUrl: 'https://orderapp.in/#/',
      image: 'images/orderapp.png',
      features: [
        'Role-based authentication',
        'Admin panel',
        'Vendor management',
        'Product management',
        'Order management',
        'Invoice management',
        'Permission-based system'
      ]
    },
    {
      id: 'blackpos',
      title: 'BlackPOS',
      shortDescription: 'Live Product Purchase & Billing System',
      fullDescription: 'BlackPOS is a live Point of Sale and billing application designed for garment-based product events. The system works alongside the OrderApp product platform to convert online product selections and orders into a fast live billing and checkout process.',
      tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Full Stack'],
      liveUrl: '#',
      image: 'images/pos.jpeg',
      features: [
        'Order Integration',
        'Live Billing',
        'Smart Cart Management',
        'Customer and Order Search',
        'Product Management',
        'Invoice Generation',
        'Real-Time Checkout'
      ]
    },
    {
      id: 'altermaster',
      title: 'AlterMaster',
      shortDescription: 'Garment POS & Alteration Tracking System',
      fullDescription: 'A trackable alteration management system integrated with the POS. Every garment can be traced from the customer\'s alteration request through Master assignment, scanning, alteration completion, Admin verification, and final delivery to the client.',
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Hibernate', 'REST APIs'],
      liveUrl: '#',
      image: 'images/Altermaster.png',
      features: [
        'POS Integration',
        'Role-based Workflows',
        'QR/Barcode Scanning',
        'Status Tracking',
        'Audit Logging'
      ]
    },
    {
      id: 'ai-payment-advisor',
      title: 'PaySmart AI',
      shortDescription: 'AI-Powered Payment Gateway Recommendation & Merchant Onboarding Platform',
      fullDescription: 'PaySmart AI is an intelligent platform designed to help businesses choose the most suitable payment gateway for their specific business requirements. Instead of requiring merchants to manually research multiple payment gateway providers, the platform uses AI to analyze the merchant\'s website and understand their business.',
      tags: ['AI', 'Node.js', 'Express.js', 'Angular', 'PostgreSQL', 'REST APIs', 'Full Stack'],
      liveUrl: 'https://buddype.com/pay-smart-ai/',
      image: 'images/PaymentGateway.png',
      features: [
        'AI Website Analysis',
        'Smart Merchant Profiling',
        'Intelligent Recommendations',
        'Explainable Recommendations',
        'Gateway Comparison',
        'Merchant Onboarding',
        'Document Management',
        'Verification Tracking',
        'Centralized Dashboard'
      ]
    }
  ] as Project[],
  testimonials: [
    {
      id: 'test-1',
      name: 'Rohan Sharma',
      role: 'Project Manager',
      company: 'Tech Solutions India',
      text: 'Sibam is an incredibly talented Full Stack Developer. His expertise in Java and Spring Boot significantly accelerated our backend development, and his Angular skills made the frontend seamless. Highly recommended!',
      avatar: 'assets/images/placeholder-avatar-1.jpg'
    },
    {
      id: 'test-2',
      name: 'Priya Patel',
      role: 'Lead Developer',
      company: 'InnovateX',
      text: 'Working with Sibam was a great experience. He has a deep understanding of scalable architectures and is always ready to tackle complex challenges. A true professional.',
      avatar: 'assets/images/placeholder-avatar-2.jpg'
    }
  ]
};
