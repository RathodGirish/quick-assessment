import * as yup from 'yup';

export const QuestionSchema = yup.object().shape({
    questionStatement: yup.string().required(),
    testType:yup.string().required(),
    level:yup.string().required(),
    topicArea:yup.string().required(),
    questionType:yup.string().required(),
    requiredTime:yup.string().required(),
    answer:yup.string().required(),
    subQuestionType:yup.string().required(),
})