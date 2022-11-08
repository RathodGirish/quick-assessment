import axios from "axios";
import { Constant } from "./common/constant";

export const handler = {
    Post, Get , removeCurrentUserData
};

function Post (URL, Params) {
    var token = localStorage.getItem(Constant.JWT_TOKEN);
    return axios.post(URL, Params, {
        headers: { 'Authorization': token }
    }).then (response =>{
        if(!response.statusText === "OK") {
            const error = response.statusText;
            return Promise.reject(error);
        }
        return response.data
    })
}


function Get (URL) {
    var token = localStorage.getItem(Constant.JWT_TOKEN);
    return axios.get(URL, {
        headers : { 'Authorization' : token}
    }).then (response => {
        if(!response.statusText === "OK"){
            const error = response.statusText;
            return Promise.reject(error);
        }
        return response.data
    })
}

function removeCurrentUserData () {
    localStorage.removeItem("session");
    localStorage.removeItem(Constant.JWT_TOKEN);
  };

