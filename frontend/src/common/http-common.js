import axios from "axios"
import {BASE_URL} from "../../src/environment/environment";



const Post = (url, params) => {
    
    const URL = BASE_URL + url;
    let token = localStorage.getItem("token")
    // const config = token ? { headers: {"Authorization" : `Bearer ${token}`} }: {}
    const config = token ? { headers: {"Authorization" : `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImVtYWlsIjoiZGF0YTc4NjFAZ21haWwuY29tIiwiY29udGFjdG5vIjoiIiwiYW5vbnltb3VzTmFtZSI6IiIsInVzZXJUeXBlIjoiIiwic2NvcmUiOm51bGwsImlkIjoiNjM0YTM5YWJiYzdiOWU5N2Q0ZDU5MjUyIiwiaWF0IjoxNjY2NDI1NDQ2LCJleHAiOjE2NjkwMTc0NDZ9.XtawvtYKUJO-L-EZDM9zRhSbkFCYvq9IY9_lNEtREKU"}`} }: {}
    return axios.post(URL, params, config).then((response) => {
        if(!response || response.statusText !== "OK") {
            const error =  response.statusText;
            return Promise.reject(error)
        }
        return response.data
    })
}
const Get = (url) => {
    const URL = BASE_URL + url;
    let token = localStorage.getItem("token")
    // const config = token ? { headers: {"Authorization" : `Bearer ${token}`} }: {}
    const config = token ? { headers: {"Authorization" : `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImVtYWlsIjoiZGF0YTc4NjFAZ21haWwuY29tIiwiY29udGFjdG5vIjoiIiwiYW5vbnltb3VzTmFtZSI6IiIsInVzZXJUeXBlIjoiIiwic2NvcmUiOm51bGwsImlkIjoiNjM0YTM5YWJiYzdiOWU5N2Q0ZDU5MjUyIiwiaWF0IjoxNjY2NDI1NDQ2LCJleHAiOjE2NjkwMTc0NDZ9.XtawvtYKUJO-L-EZDM9zRhSbkFCYvq9IY9_lNEtREKU"}`} }: {}
    return axios.get(URL,config).then((response) => {
        if(!response || response.statusText !== "OK") {
            const error =  response.statusText;
            return Promise.reject(error)
            
        }
        return response.data
    })
}

export const connector = {
    Post, Get
}