export const profile = {
  name: 'Sakshi',
  title: 'Full Stack Developer | MERN | Java & Spring Boot',
  location: 'New Delhi, India',
  bio: `I have experience building full-stack applications using the MERN stack, where I worked on developing user interfaces and backend APIs. Currently, I’m expanding my backend skills with Java and Spring Boot, focusing on building secure REST APIs, authentication systems, and scalable application architecture.`,
  initials: 'SS',
  links: {
    githubUsername: 'SakshiSharma6789',
    linkedin: 'https://www.linkedin.com/in/sakshi-sharma-83b3ab2a5',
    email: 'sakshishkp2002@gmail.com',
    // Put your PDF at: public/sakshi-resume.pdf
    resume: '/sakshi-resume.pdf',
  },
  skills: [
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'Java',
    'Spring Boot',
    'REST APIs',
    'JWT/Auth',
    'Git/GitHub',
  ],
  experience: [
    {
      role: 'Full Stack Developer (Project)',
      company: 'AI Code Reviewer',
      period: '2026',
      location: 'Remote',
      tagline:
        'An AI-powered code reviewer that analyzes code and provides smart suggestions to improve quality, readability, and performance.',
      summary:
        'A smart web-based application that analyzes source code and provides intelligent feedback using AI. It leverages the Google Gemini API to understand code structure, detect issues, and suggest improvements in real-time.',
      impact: [
        'Improves code quality by detecting errors, bad practices, and potential vulnerabilities.',
        'Acts like a virtual mentor by explaining issues in simple terms and recommending better approaches.',
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Gemini API'],
    },
  ],
  projects: {
    /**
     * Optional: override descriptions for specific repos.
     * Key = repo name exactly as on GitHub (case-sensitive).
     */
    descriptionOverrides: {
      // Works with exact repo names OR normalized keys (lowercase, spaces/dashes/underscores treated the same).
      'ai code reviewer':
        'An AI-powered MERN code reviewer using Google Gemini API to analyze source code, explain issues clearly, and suggest improvements for quality, readability, performance, and security.',
    },
  },
}

