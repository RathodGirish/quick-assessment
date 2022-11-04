import {connector} from "../common/http-common";
import {environment as API_URL} from "../../src/environment/environment";

export const CreateSkills = (params) => {
    return connector.Post(API_URL.CREATE_SKILL, params).then((res) => res).catch((error) => error)
}

export const GetSkillById =(id,data) => {
    var url =API_URL.GET_SKILL_BY_ID+id;
    return connector.Get(url,data).then(res => {
        return res
    })
}

export const UpdateSkill =(id,data) => {
    var url =API_URL.UPDATE_SKILL+id;
    return connector.Post(url, data).then(res => {
        return res
    })
}

export const GetAllSkill =() => {
    var url =API_URL.GET_ALL_SKILL;
    return connector.Get(url).then(res => {
        return res
    })
}

export const DeleteSkill = (id,data) => {
    var url = API_URL.DELETE_SKILL_BY_ID+id;
    return connector.Post(url,data).then(res => {
        return res
    })
}