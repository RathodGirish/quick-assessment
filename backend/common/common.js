const crypto = require("crypto");
var multer = require("multer");
var mongodb = require('mongodb').ObjectId;
const CONSTANT  = require("./constant");
const ALGO = CONSTANT.ALGO;
const ENCRYPTION_KEY = CONSTANT.ENCRYPTION_KEY;
const IV_LENGTH = CONSTANT.IV_LENGTH;



exports.decryptPassword = _decryptPassword;
exports.encryptPassword = _encryptPassword; 
exports.isUndefinedOrNull = _isUndefinedOrNull;
exports.generateHashCode = _generateHashCode;
exports.isObjEmpty = _isObjEmpty;
exports.isValidObjId = _isValidObjId;
exports.isValidateEmail = _isValidateEmail;
exports.generateOTP = _generateOTP;


// password encrypt
function _encryptPassword(text, callback) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    callback(iv.toString("hex") + ":" + encrypted.toString("hex"));
  }
  
  // password decrypt
  function _decryptPassword(text, callback) {
    console.log("trxt", text)                                                                          
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    // console.log("iv", iv)

    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    // console.log("encryptedText", encryptedText)

    let decipher = crypto.createDecipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv);
    console.log("decipher", decipher)

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log("decrypted",decrypted)
    callback(decrypted.toString());
  }

  // to generate hashcode
function _generateHashCode() {
    return crypto.randomBytes(16).toString("hex");
  }
  
  // to generate email html
  function _getOtpVerificationHTML(OTP) {
    return '<html> <body><p style="font-size: 14px;">You are receiving this because you (or someone else) have requested the activate your account..</p><p style="font-size: 14px;font-weight: 900;"><strong>OTP : ' +
    OTP +
    '</strong></p><p style="font-size: 14px;">If you did not request this, please ignore this email..</p> </body></html>';
  }
  
  //Check Undefined and null value
  function _isUndefinedOrNull(value) {
    if (typeof value === CONSTANT.UNDEFINED || value == null || value == "") {
      return true;
    } else {
      return false;
    }
  }
  
  /*
  TYPE:GET
  To check id is valid or not.
  */
  function _isValidObjId(id) {
    if (!_isUndefinedOrNull(id)) {
      console.log("in if");
      return mongodb.isValid(id);
    } else {
      return false;
    }
  }
  
  /*
  Email Validation function
  */
  function _isValidateEmail(email) {
    const regex = CONSTANT.EMAIL_REGEX;
    return regex.test(String(email).toLowerCase());
  }
  
  /*
  TYPE:GET
  To value is undefined or null.
  */
  function _isObjEmpty(obj) {
    return obj == null || !Object.keys(obj).length;
  }
  
  /*
  Generate uniqueID  function
  */              
  function _UUID() {
    var result = "";
    var characters = CONSTANT.CHARACTERS;
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  /*
  OTP generator( 8 digit) function
  */
  function _generateOTP() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }