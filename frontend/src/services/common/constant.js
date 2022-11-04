import { BASE_URL } from "../../environment/environment";

export const Constant = {
    BASE_API_URL: BASE_URL,
    SUCCESS: 'success',
    FAIL: 'fail',
    ERROR: 'error',
    YES:'yes',
    NO:'no',
    JWT_TOKEN: "session",
    SESSION_DATA: 'user-data',
    EMAIL_REGEX:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ACTIVE:'active',
    DEACTIVE:'deactive',
    MESSAGE:{

    },
    FORM_VALIDATION:{
        EMAIL_REQUIRED:'Email is required...!!',
        PASSWORD_REQUIRED:"Password is required...!!"
    }
};