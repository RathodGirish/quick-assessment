import { connector } from "../common/http-common";
import { environment as API_URL } from "../../src/environment/environment";

export const CreateExamResult = (params) => {
    console.log(params)
    return connector.Post(API_URL.CREATE_SKILL, params).then((res) => res).catch((error) => error)
}

export const GetExamResultById = (id, data) => {
    var url = API_URL.GET_EXAM_RESULTL_BY_ID + id;
    return connector.Get(url, data).then(res => {
        return res
    })
}

export const UpdateExamResult = (id, data) => {
    var url = API_URL.UPDATE_EXAM_RESULT + id;
    return connector.Post(url, data).then(res => {
        return res
    })
}

export const GetAllExamResult = () => {
    var url = API_URL.GET_ALL_EXAM_RESULT;
    return connector.Get(url).then(res => {
        return res
    })
}

export const DeleteExamResulT = (id, data) => {
    var url = API_URL.DELETE_EXAM_RESULT_BY_ID + id;
    return connector.Post(url, data).then(res => {
        return res
    })
}