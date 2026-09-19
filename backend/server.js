const express = require("express");
const cors = require("cors");

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

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});