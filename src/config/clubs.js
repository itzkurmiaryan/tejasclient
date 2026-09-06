import socialLogo from "../assets/tsc1.png";
import aakritiLogo from "../assets/tac.png";
import spardhaLogo from "../assets/tsc.png";
import prayatnaLogo from "../assets/tpc.png";
import impressionsLogo from "../assets/tic.png";
import goonjLogo from "../assets/tgc.png";
import einsteinLogo from "../assets/tec.png";

export const clubs = [
  {
    key: "social",
    name: "The Social Club",
    shortDescription: "Building community, social responsibility, teamwork, and meaningful student engagement.",
    about: "The Social Club focuses on building a sense of community, collaboration, and social responsibility among students. It creates opportunities for social initiatives, awareness activities, community engagement, and collaborative events.",
    activities: ["Social awareness campaigns", "Community initiatives", "Student engagement activities", "Volunteering", "Social events", "Awareness drives", "Team-building activities"],
    logo: socialLogo,
    color: "#f97316",
    gradient: "from-orange-400 to-orange-600",
    email: "social@gmail.com",
  },
  {
    key: "aakriti",
    name: "The Aakriti Club",
    shortDescription: "A creative space for art, design, imagination, self-expression, and innovative ideas.",
    about: "The Aakriti Club is a platform for students interested in creativity, artistic expression, and innovative ideas. It encourages students to express themselves through art, design, creativity, and cultural activities.",
    activities: ["Creative activities", "Art & design", "Creative competitions", "Cultural activities", "Exhibitions", "Student showcases", "Innovation and creative projects"],
    logo: aakritiLogo,
    color: "#a855f7",
    gradient: "from-purple-400 to-purple-600",
    email: "aakriti@gmail.com",
  },
  {
    key: "spardha",
    name: "The Spardha Club",
    shortDescription: "Inspiring students to compete, challenge themselves, develop skills, and pursue excellence.",
    about: "The Spardha Club is focused on competition, performance, and the spirit of excellence. It encourages students to participate in competitive activities, challenge themselves, and develop confidence through healthy competition.",
    activities: ["Competitions", "Competitive events", "Inter-college activities", "Team challenges", "Skill-based competitions", "Quizzes and contests", "Performance-based events"],
    logo: spardhaLogo,
    color: "#22c55e",
    gradient: "from-green-400 to-green-600",
    email: "spardha@gmail.com",
  },
  {
    key: "prayatna",
    name: "The Prayatna Club",
    shortDescription: "Encouraging effort, determination, leadership, skill development, and continuous growth.",
    about: "The Prayatna Club represents the spirit of effort, determination, and continuous improvement. It creates opportunities for students to transform their efforts into achievements while developing leadership, teamwork, discipline, and confidence.",
    activities: ["Skill development", "Student initiatives", "Workshops", "Competitions", "Leadership activities", "Team projects", "Personal development activities"],
    logo: prayatnaLogo,
    color: "#3b82f6",
    gradient: "from-blue-400 to-blue-600",
    email: "prayatna@gmail.com",
  },
  {
    key: "impressions",
    name: "The Impressions Club",
    shortDescription: "Creating opportunities for creativity, communication, presentation, and memorable experiences.",
    about: "The Impressions Club focuses on creativity, communication, presentation, and creating a positive impact through student activities. It provides a platform to showcase talents and ideas while developing confidence and communication skills.",
    activities: ["Creative projects", "Presentation activities", "Communication activities", "Media & content", "Student showcases", "Events", "Creative campaigns"],
    logo: impressionsLogo,
    color: "#16a34a",
    gradient: "from-green-500 to-green-700",
    email: "impressions@gmail.com",
  },
  {
    key: "goonj",
    name: "The Goonj Club",
    shortDescription: "Giving students a platform to express, perform, participate, and connect with the campus community.",
    about: "The Goonj Club encourages students to express their voices, ideas, creativity, and talent. It brings energy to campus life through engaging student activities and events.",
    activities: ["Student events", "Performances", "Cultural activities", "Communication activities", "Interactive events", "Talent showcases", "Campus engagement"],
    logo: goonjLogo,
    color: "#ef4444",
    gradient: "from-red-400 to-red-600",
    email: "goonj@gmail.com",
  },
  {
    key: "einstein",
    name: "The Einstein Club",
    shortDescription: "Promoting curiosity, logical thinking, innovation, knowledge, and problem-solving.",
    about: "The Einstein Club promotes curiosity, logical thinking, knowledge, innovation, and problem-solving. It encourages students to explore new ideas, learn beyond the classroom, and develop analytical and innovative abilities.",
    activities: ["Quizzes", "Knowledge-based competitions", "Problem-solving activities", "Innovation projects", "Workshops", "Technical/intellectual events", "Brainstorming sessions"],
    logo: einsteinLogo,
    color: "#2563eb",
    gradient: "from-blue-500 to-blue-700",
    email: "einstein@gmail.com",
  },
];

export const clubsByKey = Object.fromEntries(clubs.map((club) => [club.key, club]));
export const clubsData = clubs;
