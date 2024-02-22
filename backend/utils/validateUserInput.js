import validator from "validator";
export const validateData = (email)=>{
    if(email && !validator.isEmail(email)){
        throw new Error("Invalid email address");
    }
}