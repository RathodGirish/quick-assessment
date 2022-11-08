export const environment = {
    production:false,

    // Questions //
    CREATE_QUESTION : "/question/createQuestion",
    UPDATE_QUESTION_BY_ID : "/question/updateQuestionById/",
    GET_QUESTION_BY_ID : "/question/getQuestionById/",
    GET_ALL_QUESTIONS : "/question/findAllQuestions",
    GET_ALL_QUESTION_LIST : "/question/findAllQuestionList",
    DELETE_QUESTIONS_BY_ID : "/question/deleteQuestionById/",

    //Feeddback //
    USER_FEEDBACK : "/feedback/userFeedback",
    UPDATE_FEEDBACK_BY_ID : "/feedback/updateFeedbackById/",
    GET_ALL_FEEDBACK : "/feedback/getAllFeedback",
    GET_FEEDBACK_BY_ID : "/feedback/getFeedbackById/",
    DELETE_FEEDBACK_BY_ID : "/feedback/deleteFeedbackById/",

    CREATE_SKILL : 'skills/createSkill',
    GET_SKILL_BY_ID : 'skills/getSkillById/',
    UPDATE_SKILL : 'skills/updateSkillById/',
    GET_ALL_SKILL : 'skills/getAllSkills',
    DELETE_SKILL_BY_ID : 'skills/deleteSkillById/'
}

export const BASE_URL = "http://localhost:5000" // localhost