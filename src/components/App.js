import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../styles/App.css";
import { saveResume, loadResume } from "../api/resumeApi";

function App() {
  const dispatch = useDispatch();

  const resume = useSelector((state) => state);

  const [page, setPage] = useState(1);

  const [educationForm, setEducationForm] = useState({
    courseName: "",
    completionYear: "",
    college: "",
    percentage: "",
  });

  const [editingEducation, setEditingEducation] = useState(null);

  const [skill, setSkill] = useState("");

  const [editingSkill, setEditingSkill] = useState(null);

  const [projectForm, setProjectForm] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });

  const [editingProject, setEditingProject] = useState(null);

  const [social, setSocial] = useState("");

  const [editingSocial, setEditingSocial] = useState(null);


const handleSaveResume = async () => {
  try {
    const result = await saveResume(resume);

    if (result.success) {
      alert("Resume saved successfully");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to save resume");
  }
};

const handleLoadResume = async () => {
  try {
    const result = await loadResume();

    if (!result) {
      alert("No saved resume found");
      return;
    }

    dispatch({
      type: "LOAD_RESUME",
      payload: {
        profile: result.resume.profile || {
          fname: "",
          lname: "",
          phone: "",
          address: "",
          url: "",
        },
        education: result.resume.education || [],
        skills: result.resume.skills || [],
        projects: result.resume.projects || [],
        social: result.resume.social || [],
      },
    });

    alert("Resume loaded successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to load resume");
  }
};



  const handleProfileChange = (e) => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  // ---------------- EDUCATION ----------------

  const handleEducationChange = (e) => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value,
    });
  };

  const addEducation = () => {
    if (!educationForm.courseName) return;

    if (editingEducation !== null) {
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: {
          index: editingEducation,
          education: educationForm,
        },
      });

      setEditingEducation(null);
    } else {
      dispatch({
        type: "ADD_EDUCATION",
        payload: educationForm,
      });
    }

    setEducationForm({
      courseName: "",
      completionYear: "",
      college: "",
      percentage: "",
    });
  };

  const editEducation = (index) => {
    setEducationForm(resume.education[index]);
    setEditingEducation(index);
  };

  const deleteEducation = (index) => {
    dispatch({
      type: "DELETE_EDUCATION",
      payload: index,
    });
  };

  // ---------------- SKILLS ----------------

  const addSkill = () => {
    if (!skill.trim()) return;

    if (editingSkill !== null) {
      dispatch({
        type: "UPDATE_SKILL",
        payload: {
          index: editingSkill,
          skill: skill,
        },
      });

      setEditingSkill(null);
    } else {
      dispatch({
        type: "ADD_SKILL",
        payload: skill,
      });
    }

    setSkill("");
  };

  const editSkill = (index) => {
    setSkill(resume.skills[index]);
    setEditingSkill(index);
  };

  const deleteSkill = (index) => {
    dispatch({
      type: "DELETE_SKILL",
      payload: index,
    });
  };

  // ---------------- PROJECTS ----------------

  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = () => {
    if (!projectForm.projectName) return;

    if (editingProject !== null) {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: {
          index: editingProject,
          project: projectForm,
        },
      });

      setEditingProject(null);
    } else {
      dispatch({
        type: "ADD_PROJECT",
        payload: projectForm,
      });
    }

    setProjectForm({
      projectName: "",
      techStack: "",
      description: "",
    });
  };

  const editProject = (index) => {
    setProjectForm(resume.projects[index]);
    setEditingProject(index);
  };

  const deleteProject = (index) => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: index,
    });
  };

  // ---------------- SOCIAL ----------------

  const addSocial = () => {
    if (!social.trim()) return;

    if (editingSocial !== null) {
      dispatch({
        type: "UPDATE_SOCIAL",
        payload: {
          index: editingSocial,
          social: social,
        },
      });

      setEditingSocial(null);
    } else {
      dispatch({
        type: "ADD_SOCIAL",
        payload: social,
      });
    }

    setSocial("");
  };

  const editSocial = (index) => {
    setSocial(resume.social[index]);
    setEditingSocial(index);
  };

  const deleteSocial = (index) => {
    dispatch({
      type: "DELETE_SOCIAL",
      payload: index,
    });
  };

  // ---------------- NAVIGATION ----------------

  const handleNext = (e) => {
    e.preventDefault();
    setPage((currentPage) => {
      if (currentPage < 5) {
        return currentPage + 1;
      }
      return currentPage;
    });
  };
  const handleBack = (e) => {
    e.preventDefault();
    setPage((currentPage) => {
      if (currentPage > 1) {
        return currentPage - 1;
      }
      return currentPage;
    });
  };
  const handleSaveContinue = async(e) => {
    e.preventDefault();

    await handleSaveResume();
    setPage(6);
  };

  // ---------------- FINAL RESUME ----------------

  if (page === 6) {
    return (
      <div className="container">
        <div className="resume">
          <h1>
            {resume.profile.fname} {resume.profile.lname}
          </h1>

          <p>{resume.profile.phone}</p>
          <p>{resume.profile.address}</p>

          {resume.profile.url && <p>{resume.profile.url}</p>}

          <hr />

          {resume.education.length > 0 && (
            <section>
              <h2>Education</h2>

              {resume.education.map((item, index) => (
                <div key={index}>
                  <h3>{item.courseName}</h3>
                  <p>{item.college}</p>
                  <p>
                    {item.completionYear} | {item.percentage}
                  </p>
                </div>
              ))}
            </section>
          )}

          {resume.skills.length > 0 && (
            <section>
              <h2>Skills</h2>

              <ul>
                {resume.skills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {resume.projects.length > 0 && (
            <section>
              <h2>Projects</h2>

              {resume.projects.map((item, index) => (
                <div key={index}>
                  <h3>{item.projectName}</h3>
                  <p>
                    <strong>Technology:</strong> {item.techStack}
                  </p>
                  <p>{item.description}</p>
                </div>
              ))}
            </section>
          )}

          {resume.social.length > 0 && (
            <section>
              <h2>Social Media</h2>

              {resume.social.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </section>
          )}

          <button onClick={() => setPage(5)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-card">
        {/* PAGE 1 */}

        {page === 1 && (
          <>
            <h1>Profile</h1>

            <button
              type="button"
              onClick={handleLoadResume}
            >
              Load Saved Resume
            </button>

            <input
              name="fname"
              placeholder="First Name"
              value={resume.profile.fname}
              onChange={handleProfileChange}
            />

            <input
              name="lname"
              placeholder="Last Name"
              value={resume.profile.lname}
              onChange={handleProfileChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={resume.profile.phone}
              onChange={handleProfileChange}
            />

            <input
              name="address"
              placeholder="Address"
              value={resume.profile.address}
              onChange={handleProfileChange}
            />

            <input
              name="url"
              placeholder="Profile Image URL"
              value={resume.profile.url}
              onChange={handleProfileChange}
            />
          </>
        )}

        {/* PAGE 2 */}

        {page === 2 && (
          <>
            <h1>Education</h1>

            <input
              name="courseName"
              placeholder="Course Name"
              value={educationForm.courseName}
              onChange={handleEducationChange}
            />

            <input
              name="completionYear"
              placeholder="Completion Year"
              value={educationForm.completionYear}
              onChange={handleEducationChange}
            />

            <input
              name="college"
              placeholder="College"
              value={educationForm.college}
              onChange={handleEducationChange}
            />

            <input
              name="percentage"
              placeholder="Percentage"
              value={educationForm.percentage}
              onChange={handleEducationChange}
            />

            <button id="add_education" onClick={addEducation}>
              {editingEducation !== null ? "Update Education" : "Add Education"}
            </button>

            <div className="entries">
              {resume.education.map((item, index) => (
                <div className="entry" key={index}>
                  <div>
                    <strong>{item.courseName}</strong>
                    <p>{item.college}</p>
                    <p>
                      {item.completionYear} - {item.percentage}
                    </p>
                  </div>

                  <button onClick={() => editEducation(index)}>Edit</button>

                  <button id="delete" onClick={() => deleteEducation(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PAGE 3 */}

        {page === 3 && (
          <>
            <h1>Skills</h1>

            <input
              name="skill"
              placeholder="Enter Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />

            <button id="add_skill" onClick={addSkill}>
              {editingSkill !== null ? "Update Skill" : "Add Skill"}
            </button>

            <div className="entries">
              {resume.skills.map((item, index) => (
                <div className="entry" key={index}>
                  <span>{item}</span>

                  <button onClick={() => editSkill(index)}>Edit</button>

                  <button id="delete_skill" onClick={() => deleteSkill(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PAGE 4 */}

        {page === 4 && (
          <>
            <h1>Projects</h1>

            <input
              name="projectName"
              placeholder="Project Name"
              value={projectForm.projectName}
              onChange={handleProjectChange}
            />

            <input
              name="techStack"
              placeholder="Technology Stack"
              value={projectForm.techStack}
              onChange={handleProjectChange}
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={projectForm.description}
              onChange={handleProjectChange}
            />

            <button id="add_project" onClick={addProject}>
              {editingProject !== null ? "Update Project" : "Add Project"}
            </button>

            <div className="entries">
              {resume.projects.map((item, index) => (
                <div className="entry" key={index}>
                  <div>
                    <strong>{item.projectName}</strong>

                    <p>{item.techStack}</p>
                    <p>{item.description}</p>
                  </div>

                  <button onClick={() => editProject(index)}>Edit</button>

                  <button id="delete" onClick={() => deleteProject(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PAGE 5 */}

        {page === 5 && (
          <>
            <h1>Social Media</h1>

            <input
              name="Social"
              placeholder="Social Media URL"
              value={social}
              onChange={(e) => setSocial(e.target.value)}
            />

            <button id="add_social" onClick={addSocial}>
              {editingSocial !== null ? "Update Social" : "Add Social"}
            </button>

            <div className="entries">
              {resume.social.map((item, index) => (
                <div className="entry" key={index}>
                  <span>{item}</span>

                  <button onClick={() => editSocial(index)}>Edit</button>

                  <button onClick={() => deleteSocial(index)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NAVIGATION */}

        <div className="navigation">
          {" "}
          {page > 1 && (
            <button id="back" type="button" onClick={handleBack}>
              {" "}
              Back{" "}
            </button>
          )}{" "}
          {page < 5 && (
            <button id="next" type="button" onClick={handleNext}>
              {" "}
              Next{" "}
            </button>
          )}{" "}
          {page === 5 && (
            <button
              id="save_continue"
              type="button"
              onClick={handleSaveContinue}
            >
              {" "}
              Save & Continue{" "}
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
