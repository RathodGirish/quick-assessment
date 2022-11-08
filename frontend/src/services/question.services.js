import { BASE_URL, environment } from "../environment/environment";
import { handler } from "../services/handler" 



function createQuestion(data){
    var url = BASE_URL + environment.CREATE_QUESTION;
    return handler.Post(url, data).then (res =>{
        return res
    })
}

function getquestionById(id) {
    var url = BASE_URL + environment.GET_QUESTION_BY_ID + id;
    return handler.Get(url).then(res => {
        return res
    })
}

function updatequestionById(id,data) {
    var url = BASE_URL + environment.UPDATE_QUESTION_BY_ID + id;
    return handler.Post(url,data).then(res => {
        return res
    })
}


function getAllquestion(params){
    var url = BASE_URL + environment.GET_ALL_QUESTION_LIST ;
    return handler.Post(url,params).then(res => {
        return res
    })
}

function deletequestionById(id) {
    var url = BASE_URL + environment.DELETE_QUESTIONS_BY_ID + id;
    return handler.Post(url, id).then(res => {
        return res
    }) 
}

export {
    createQuestion,
    getquestionById,
    updatequestionById,
    getAllquestion,   
    deletequestionById
}