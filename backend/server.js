const express = require("express");
const cors = require("cors");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Career Readiness Navigator backend is running"
    });
});

app.post("/api/user", (req, res) => {

    const {
        education,
        college,
        year,
        skills,
        strengths
    } = req.body;

    console.log("Profile received:", {
        education,
        college,
        year,
        skills,
        strengths
    });

    res.json({
        message: "Profile received successfully",
        profile: {
            education,
            college,
            year,
            skills,
            strengths
        }
    });
});
app.post("/api/analyze", (req, res) => {
    const { career, skills } = req.body;

    const careerSkills = {
    "Engineering & Technology": {
        "HTML & CSS": 80,
        "Java": 70,
        "Python": 70,
        "C++": 70,
        "Mathematics": 70,
        "Problem Solving": 80
    },

    "Medicine & Healthcare": {
        "Biology": 80,
        "Human Anatomy": 80,
        "Human Physiology": 75,
        "Chemistry": 70,
        "Genetics": 60,
        "Medical Science Basics": 70
    },

    "Finance & Banking": {
        "Mathematics": 80,
        "Accounting": 80,
        "Financial Literacy": 75,
        "Economics": 70,
        "Data Analysis": 70,
        "Excel": 75
    },

    "Business & Management": {
        "Marketing": 75,
        "Finance Basics": 65,
        "Entrepreneurship": 80,
        "Business Strategy": 75,
        "Economics": 65,
        "Management": 80
    },

    "Law & Public Service": {
        "Legal Reasoning": 80,
        "Indian Constitution": 75,
        "Criminal Law Basics": 70,
        "Contract Law Basics": 65,
        "General Knowledge": 75,
        "Current Affairs": 70
    },

    "Design & Creative Arts": {
        "Graphic Design": 80,
        "UI/UX Design": 80,
        "Drawing & Illustration": 70,
        "Photography": 65,
        "Video Editing": 70,
        "Visual Communication": 80
    },

    "Science & Research": {
        "Physics": 75,
        "Chemistry": 75,
        "Biology": 75,
        "Mathematics": 80,
        "Scientific Reasoning": 80,
        "Research Methods": 75
    }
};

    
    console.log("Career received:", career);
    console.log("Available careers:", Object.keys(careerSkills));

    const requiredSkills = careerSkills[career];

    if (!requiredSkills) {
        return res.status(400).json({
            message: "Career not found"
        });
    }

        const gaps = [];

    for (const skill in requiredSkills) {
        const current = skills[skill] || 0;
        const required = requiredSkills[skill];

        if (current < required) {
            gaps.push({
                skill: skill,
                current: current,
                required: required,
                gap: required - current
            });
        }
    }

    res.json({
        career: career,
        skillGaps: gaps
    });
});

app.get("/api/test-firebase", async (req, res) => {
    try {
        await db.collection("careerPaths").doc("test").set({
            career: "Firebase Test",
            message: "Firebase connection is working"
        });

        res.json({
            message: "Firebase write successful"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Firebase write failed",
            error: error.message
        });
    }
});

app.get("/api/seed-careers", async (req, res) => {
    try {
        const careers = [
            {
                id: "full_stack_developer",
                career: "Full Stack Developer",
                category: "Engineering & Technology",
                description: "Build complete websites and web applications using frontend and backend technologies.",
                skills: [
                    "HTML & CSS",
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Express.js",
                    "SQL",
                    "Git & GitHub",
                    "Problem Solving"
                ],
                roadmap: [
                    "Learn HTML and CSS",
                    "Learn JavaScript",
                    "Build interactive frontend projects",
                    "Learn React",
                    "Learn Node.js and Express.js",
                    "Learn SQL and databases",
                    "Learn Git and GitHub",
                    "Build and deploy a full-stack project"
                ]
            },
            {
                id: "data_scientist",
                career: "Data Scientist",
                category: "Engineering & Technology",
                description: "Use data, statistics and machine learning to discover patterns and support decisions.",
                skills: [
                    "Python",
                    "Mathematics",
                    "Statistics",
                    "SQL",
                    "Data Analysis",
                    "Machine Learning",
                    "Data Visualization",
                    "Problem Solving"
                ],
                roadmap: [
                    "Learn Python",
                    "Learn mathematics and statistics",
                    "Learn SQL",
                    "Practice data analysis",
                    "Learn data visualization",
                    "Learn machine learning",
                    "Work on real datasets",
                    "Build data science projects"
                ]
            },
            {
                id: "ai_ml_engineer",
                career: "AI/ML Engineer",
                category: "Engineering & Technology",
                description: "Develop artificial intelligence and machine learning systems that solve real-world problems.",
                skills: [
                    "Python",
                    "Mathematics",
                    "Statistics",
                    "Machine Learning",
                    "Deep Learning",
                    "Data Structures",
                    "Problem Solving",
                    "Git & GitHub"
                ],
                roadmap: [
                    "Learn Python",
                    "Strengthen mathematics",
                    "Learn statistics",
                    "Learn machine learning",
                    "Learn deep learning",
                    "Practice data structures",
                    "Build AI projects",
                    "Deploy an AI model"
                ]
            },
            {
                id: "doctor",
                career: "Doctor / Medical Practitioner",
                category: "Medicine & Healthcare",
                description: "Diagnose and treat patients while applying medical knowledge and clinical skills.",
                skills: [
                    "Biology",
                    "Human Anatomy",
                    "Human Physiology",
                    "Chemistry",
                    "Medical Science Basics",
                    "Communication",
                    "Critical Thinking",
                    "Empathy"
                ],
                roadmap: [
                    "Strengthen biology",
                    "Learn human anatomy",
                    "Learn human physiology",
                    "Strengthen chemistry",
                    "Study medical science",
                    "Develop communication skills",
                    "Develop clinical reasoning",
                    "Pursue medical education and training"
                ]
            },
            {
                id: "financial_analyst",
                career: "Financial Analyst",
                category: "Finance & Banking",
                description: "Analyze financial information to help organizations make informed financial decisions.",
                skills: [
                    "Mathematics",
                    "Accounting",
                    "Financial Literacy",
                    "Economics",
                    "Data Analysis",
                    "Excel",
                    "Communication",
                    "Problem Solving"
                ],
                roadmap: [
                    "Learn financial basics",
                    "Learn accounting",
                    "Strengthen mathematics",
                    "Learn economics",
                    "Master Excel",
                    "Practice financial data analysis",
                    "Improve communication",
                    "Work on financial analysis projects"
                ]
            },
            {
                id: "business_analyst",
                career: "Business Analyst",
                category: "Business & Management",
                description: "Analyze business problems and use data to help organizations improve their decisions and processes.",
                skills: [
                    "Business Strategy",
                    "Economics",
                    "Data Analysis",
                    "Excel",
                    "Communication",
                    "Problem Solving",
                    "Critical Thinking",
                    "Entrepreneurship"
                ],
                roadmap: [
                    "Learn business fundamentals",
                    "Learn economics",
                    "Learn Excel",
                    "Practice data analysis",
                    "Develop communication skills",
                    "Learn business analysis methods",
                    "Study real business cases",
                    "Build business analysis projects"
                ]
            },
            {
                id: "ui_ux_designer",
                career: "UI/UX Designer",
                category: "Design & Creative Arts",
                description: "Design simple, useful and attractive digital experiences for users.",
                skills: [
                    "UI/UX Design",
                    "Graphic Design",
                    "Visual Communication",
                    "Drawing & Illustration",
                    "User Research",
                    "Prototyping",
                    "Creativity",
                    "Problem Solving"
                ],
                roadmap: [
                    "Learn design fundamentals",
                    "Learn UI/UX principles",
                    "Practice user research",
                    "Learn prototyping",
                    "Create wireframes",
                    "Design digital interfaces",
                    "Build a design portfolio",
                    "Work on real user problems"
                ]
            },
            {
                id: "cybersecurity_analyst",
                career: "Cybersecurity Analyst",
                category: "Engineering & Technology",
                description: "Protect computer systems, networks and information from security threats.",
                skills: [
                    "Computer Networks",
                    "Operating Systems",
                    "Cybersecurity Fundamentals",
                    "Python",
                    "Linux",
                    "Problem Solving",
                    "Cryptography Basics",
                    "Critical Thinking"
                ],
                roadmap: [
                    "Learn computer networks",
                    "Learn operating systems",
                    "Learn Linux",
                    "Study cybersecurity fundamentals",
                    "Learn basic cryptography",
                    "Practice Python",
                    "Study security tools and concepts",
                    "Build cybersecurity projects"
                ]
            },
            {
                id: "lawyer",
                career: "Lawyer",
                category: "Law & Public Service",
                description: "Apply legal knowledge and reasoning to advise and represent people and organizations.",
                skills: [
                    "Legal Reasoning",
                    "Indian Constitution",
                    "Criminal Law Basics",
                    "Contract Law Basics",
                    "General Knowledge",
                    "Current Affairs",
                    "Communication",
                    "Critical Thinking"
                ],
                roadmap: [
                    "Learn constitutional basics",
                    "Develop legal reasoning",
                    "Study major areas of law",
                    "Follow current affairs",
                    "Improve communication",
                    "Practice legal research",
                    "Analyze legal cases",
                    "Pursue formal legal education"
                ]
            },
            {
                id: "research_scientist",
                career: "Research Scientist",
                category: "Science & Research",
                description: "Conduct scientific research, analyze evidence and develop knowledge through experiments and investigation.",
                skills: [
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "Mathematics",
                    "Scientific Reasoning",
                    "Research Methods",
                    "Data Analysis",
                    "Critical Thinking"
                ],
                roadmap: [
                    "Strengthen core science subjects",
                    "Strengthen mathematics",
                    "Learn scientific reasoning",
                    "Learn research methods",
                    "Practice data analysis",
                    "Read scientific papers",
                    "Conduct small research projects",
                    "Build research experience"
                ]
            }
        ];

        const batch = db.batch();

        careers.forEach((career) => {
            const ref = db.collection("careerPaths").doc(career.id);
            batch.set(ref, career);
        });

        await batch.commit();

        res.json({
            message: "10 career paths added successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add career paths",
            error: error.message
        });
    }

});

app.get("/api/roadmap", async (req, res) => {
    try {
        const { category, skills } = req.query;

        if (!category) {
            return res.status(400).json({
                message: "Category is required"
            });
        }

        // Convert skills received from frontend into an array
        const studentSkills = skills
            ? skills.split(",").map(skill => skill.trim())
            : [];

        // Get careers from Firebase for the selected category
        const snapshot = await db
            .collection("careerPaths")
            .where("category", "==", category)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({
                message: "No careers found for this category"
            });
        }

        const careerResults = [];

        snapshot.forEach((doc) => {

            const career = doc.data();

            // Find skills the student already has
            const matchedSkills = career.skills.filter(skill =>
                studentSkills.includes(skill)
            );

            // Find skills the student needs to learn
            const missingSkills = career.skills.filter(skill =>
                !studentSkills.includes(skill)
            );

            // Calculate match percentage
            const matchPercentage = Math.round(
                (matchedSkills.length / career.skills.length) * 100
            );

            careerResults.push({
                career: career.career,
                description: career.description,
                matchPercentage: matchPercentage,
                matchedSkills: matchedSkills,
                missingSkills: missingSkills,
                roadmap: career.roadmap
            });
        });

        // Sort careers by highest skill match
        careerResults.sort(
            (a, b) => b.matchPercentage - a.matchPercentage
        );

        // Select the career with the highest match
        const bestMatch = careerResults[0];

        res.json({
            category: category,
            career: bestMatch.career,
            description: bestMatch.description,
            matchPercentage: bestMatch.matchPercentage,
            matchedSkills: bestMatch.matchedSkills,
            missingSkills: bestMatch.missingSkills,
            roadmap: bestMatch.roadmap
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to generate roadmap",
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});