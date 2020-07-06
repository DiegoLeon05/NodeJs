const className = 'User';
const dataAccess = require('../02DataAccess/userDA.js');
const log = require('../../Generic/log.js');
const enumerator = require('../../Generic/Enumerators.js');
const validate = require('../../Generic/Validations.js');
const validator = require('validator');

const UserValidation = (objValidate, TypeCrud) => {
    try {
        let strError = '';
        if (TypeCrud === enumerator.TypeCrud.Create || TypeCrud === enumerator.TypeCrud.Update){
            strError += validate.String({ text: objValidate.UserName , field : 'Name', maxLength : 50, minLength: 3});
            strError += validate.String({ text: objValidate.UserPassword , field : 'Password', maxLength : 10, minLength: 10});
            strError += validate.Date({ date: objValidate.UserBirthDay , field : 'Birthday', max : new Date(), min: '01/01/1930'});
            strError += validate.Number({ number: objValidate.UserAge , field : 'Age', max : 100, min: 18});
        }
        if (TypeCrud === enumerator.TypeCrud.Delete || TypeCrud === enumerator.TypeCrud.Update){
            strError += validate.Number({ number: objValidate.UserId , field : 'Identifier', min: 1});
        }
        if (!validator.isEmpty(strError)){
            log.Write({class:className, method: 'UserBL.UserValidation', message:strError});
            return false;
        }else{
            return true;
        }
    } catch (error) {
        log.Write({class:className, method: 'UserBL.UserValidation', message:error});
        return false;
    }
}

const UserCreate =(objUser)=>{
    try {
        if (UserValidation(objUser, enumerator.TypeCrud.Create)){
            dataAccess.Create(objUser);
        }
    } catch (error) {
        log.Write({class:className, method: 'UserBL.UserCreate', message:error});
    }
}

const UserRead=(objUser)=>{
    try {
        return dataAccess.Read(objUser);
    } catch (error) {
        return []
    }
}

const UserUpdate =(objUser)=>{
    try {
        if (UserValidation(objUser, enumerator.TypeCrud.Update)){
            dataAccess.Update(objUser);
        }
    } catch (error) {
        log.Write({class:className, method: 'UserBL.UserUpdate', message:error});
    }
}

const UserDelete = (UserId) => {
    try {
        if (UserValidation({UserId: UserId}, enumerator.TypeCrud.Delete)){
            dataAccess.Delete(UserId);
        }
    } catch (error) {
        log.Write({class:className, method: 'UserBL.UserDelete', message:error});
    }
}

module.exports = {
    Create : UserCreate,
    Read : UserRead,
    Update : UserUpdate,
    Delete : UserDelete
}