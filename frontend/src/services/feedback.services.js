import { BASE_URL, environment } from "../environment/environment";
import { handler } from "../services/handler"


function addfeedback(data){
    var url = BASE_URL + environment.USER_FEEDBACK;
    return handler.Post(url, data).then (res =>{
        return res
    })
}

function updatefeedbackById(id, data) {
    var url = BASE_URL + environment.UPDATE_FEEDBACK_BY_ID + id;
    return handler.Post(url, data).then(res => {
        return res
    })
}

function getfeedbbackById(id) {
    var url = BASE_URL + environment.GET_FEEDBACK_BY_ID + id;
    return handler.Get(url).then(res => {
        return res
    })
}



function getAllfeedback(params){
    var url = BASE_URL + environment.GET_ALL_FEEDBACK ;
    return handler.Post(url,params).then(res => {
        return res
    })
}

function deletefeedbackById(id) {
    var url = BASE_URL + environment.DELETE_FEEDBACK_BY_ID + id;
    return handler.Post(url, id).then(res => {
        return res
    }) 
}

export {
    addfeedback,
    updatefeedbackById,
    getfeedbbackById,
    getAllfeedback,
    deletefeedbackById
}