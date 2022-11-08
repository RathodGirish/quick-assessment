module.exports = {
    SUCCESS: 'success',
    FAIL: 'fail',
    ERROR: 'error',
    UNDEFINED:'undefined',
    ACTIVE: 'active',
    DEACTIVE: 'deactive',
    PAID: 'paid',
    ADMIN: 'admin',
   
    AUTHENTICATION_TOKEN_FAIL: 'Authentication token fail..!!',
    NO_TOKEN_PROVIDED: 'No token provided..!!',
    ALGO: 'aes-256-cbc',
    ENCRYPTION_KEY: 'rbzYbCrwd4M2fFutsdCtexHANdBTK9hs',
    CHARACTERS:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    EMAIL_REGEX:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    IV_LENGTH: 16,   
    MESSAGE: {
        USER_NOT_FOUND: 'User not found!',
        LOGIN_SUCESSFULLY: 'Login success!',
        REGISTER_SUCCESSFULLY:'Register successfully!!!',
        EMAIL_REQUIRED: 'Email address is required',
        EMAIL_INVALID: 'Incorrect Email',
        PASSOWRD_INVALID: 'Incorrect Password',
        REQUIRED_FIELDS_MISSING: 'Required fields are missing!',
        SKILL_EXIST: 'Skill already exists please try with another skill!',
        EMAIL_EXIST: 'Email already exists please try with another email!',
        CATEGORY_RECORD_EXIST: 'You can not delete this Category. Please first delete existing records with this Category.',
        NOT_FOUND_BY_ID: 'not found with ID ',
        Data_GET: 'Data not get',
        DATA_FOUND: 'Data found',
        DATA_NOT_FOUND: 'Data not found',
        IS_UPDATED_SUCCESSFULLY: 'is Updated Successfully!!!',
        ACTIVE_SUCCESSFULLY: 'active successfully!!!',
        ADDED_SUCCESSFULLY: 'added successfully!!!',
        DELETE_SUCCESSFULLY: 'deleted successfully!',
        IMG_UPLOAD_SUCCESSFULLY: 'image upload successfully',
        IMAGE_NOT_FOUND: 'Image not found',
        FAILED_ADDED_IMAGE: 'Fail to added image..!',
        IMAGE_DELETE_SUCCESSFULLY: 'Image deleted successfully',
        FOUND_SUCCESSFULLY: 'found Successfully',
        NOT_FOUND: 'not found',
        ERROR_OCCURRED:'Some error occurred while retrieving data',
        FOLLOW_SUCCESSFULLY: 'follow successfully ..!!!',
        UNFOLLOW_SUCCESSFULLY: 'unfollow successfully ..!!!',
        ALREADY_FOLLOWED:'you are already followed..!!!',
        U_MUST_FOLLOW_FIRST:'you must follow first..!!!',
        FAIL_TO_GET_EVENT_POINT:'Fail to get user eventPoints',
        FAIL_TO_UPDATE_EVENT_POINT:'Fail to update user eventPoints',
        INVALID_PRODUCT_ID:'Please enter valid product id ..!!',
        INVALID_BRAND_ID:'Please enter valid brand id ..!!',
        INVALID_CATEGORY_ID:'Please enter valid category id ..!!',
        INVALID_USER_ID:'Please enter valid user id ..!!',
        STATUS_UPDATE_SUCCESSFULLY:'status update succussfully ...!! '
    },
    COLLECTION: {
        USER: 'User ',
        CUSTOMER: 'Customer ',
        SKILL: 'Skill ',
        FEEDBACK: "Feedback ",
        QUESTION: "Question ",
        EXAM: "EXAM Details ",
    },
    DIR:'./uploaded_attachment',
    UPLOAD_PRODUCT_CATEGORY_IMAGE: 'uploaded_attachment/productCategory/productCategory_images/',

    
}