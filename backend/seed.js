const sequelize = require("./config/database");
const Course = require("./models/Course");

const coursesData = [
  {
    title: "React for Beginners",
    instructor: "John Doe",
    price: 49.99,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    description:
      "Learn the fundamentals of React: components, JSX, state, props, and hooks. Build small apps and a final project to solidify skills.",
    duration: "6 weeks",
    level: "Beginner",
    syllabus: JSON.stringify([
      "Introduction to React & JSX",
      "Components & Props",
      "State & Lifecycle",
      "React Hooks (useState, useEffect)",
      "Routing with react-router",
      "Final project",
    ]),
    rating: 4.7,
    studentsEnrolled: 1240,
  },
  {
    title: "JavaScript Mastery",
    instructor: "Sarah Smith",
    price: 39.99,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description:
      "Deep dive into modern JavaScript: ES6+, asynchronous programming, patterns, and practical exercises to become a confident JS developer.",
    duration: "8 weeks",
    level: "Intermediate",
    syllabus: JSON.stringify([
      "ES6+ syntax and features",
      "Asynchronous JS: Promises, async/await",
      "Functional programming patterns",
      "DOM manipulation & events",
      "Testing and debugging",
    ]),
    rating: 4.8,
    studentsEnrolled: 980,
  },
  {
    title: "Fullstack Web Dev",
    instructor: "Mike Johnson",
    price: 59.99,
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description:
      "Build fullstack applications using Node.js, Express, and a React frontend. Covers APIs, databases, authentication, and deployment.",
    duration: "12 weeks",
    level: "Advanced",
    syllabus: JSON.stringify([
      "Node.js & Express fundamentals",
      "RESTful API design",
      "Databases: MongoDB / SQL",
      "Authentication & Authorization",
      "React frontend integration",
      "Deployment (Heroku / Vercel)",
    ]),
    rating: 4.6,
    studentsEnrolled: 720,
  },
  {
    title: "UI/UX Design Basics",
    instructor: "Emma Watson",
    price: 29.99,
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    description:
      "Get started with UI/UX: design principles, user research, wireframing, and prototyping using industry tools like Figma.",
    duration: "4 weeks",
    level: "Beginner",
    syllabus: JSON.stringify([
      "Design fundamentals",
      "User research & personas",
      "Wireframing & prototyping",
      "Figma basics",
      "Design systems & handoff",
    ]),
    rating: 4.5,
    studentsEnrolled: 450,
  },
];

const seed = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");

    // Check if courses already exist
    const existingCourses = await Course.count();
    if (existingCourses > 0) {
      console.log("Courses already exist in database. Skipping seed.");
      process.exit(0);
    }

    await Course.bulkCreate(coursesData);
    console.log("✅ Database seeded with course data successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seed();
