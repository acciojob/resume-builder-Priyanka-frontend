const express = require("express");
const cors = require("cors"); 

const mongoose = require("mongoose");


const Resume = require("./Resume");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json());

const PORT = 5001;

const MONGO_URI =
  "mongodb://127.0.0.1:27017/resume_builder";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

/*
  SAVE RESUME
  POST /api/resume
*/
app.post("/api/resume", async (req, res) => {
  try {
    const resume = await Resume.create(req.body);

    res.status(201).json({
      success: true,
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save resume",
    });
  }
});

/*
  LOAD LATEST RESUME
  GET /api/resume
*/
app.get("/api/resume", async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load resume",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Backend running at http://localhost:${PORT}`
  );
});

