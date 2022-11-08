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

    //Skill//
    CREATE_SKILL : '/skills/createSkill',
    GET_SKILL_BY_ID : '/skills/getSkillById/',
    UPDATE_SKILL : '/skills/updateSkillById/',
    GET_ALL_SKILL : '/skills/getAllSkills',
    DELETE_SKILL_BY_ID : '/skills/deleteSkillById/',

    //Exam Result//
    CREATE_EXAM_RESULT: '/examresult/createExamResult',
    GET_EXAM_RESULTL_BY_ID: '/examresult/getExamResultById/',
    UPDATE_EXAM_RESULT: '/examresult/updateExamResultById/',
    GET_ALL_EXAM_RESULT: '/examresult/getAllExamResult',
    DELETE_EXAM_RESULT_BY_ID: '/examresult/deleteExamResultById/',
}

export const BASE_URL = "http://localhost:5000" // localhost