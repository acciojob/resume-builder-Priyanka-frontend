const initialState = {
  profile: {
    fname: "",
    lname: "",
    phone: "",
    address: "",
    url: "",
  },

  education: [],

  skills: [],

  projects: [],

  social: [],
};

function resumeReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.name]: action.payload.value,
        },
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, action.payload],
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((item, index) =>
          index === action.payload.index
            ? action.payload.education
            : item
        ),
      };

    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((item, index) =>
          index === action.payload.index
            ? action.payload.skill
            : item
        ),
      };

    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((item, index) =>
          index === action.payload.index
            ? action.payload.project
            : item
        ),
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "ADD_SOCIAL":
      return {
        ...state,
        social: [...state.social, action.payload],
      };

    case "UPDATE_SOCIAL":
      return {
        ...state,
        social: state.social.map((item, index) =>
          index === action.payload.index
            ? action.payload.social
            : item
        ),
      };

    case "DELETE_SOCIAL":
      return {
        ...state,
        social: state.social.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "LOAD_RESUME":
      return action.payload;

    default:
      return state;
  }
}

export default resumeReducer;

