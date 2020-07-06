require('../01Entities/user.js');
const fs = require('fs');
const log = require('../../Generic/log');
const enumerator = require('../../Generic/Enumerators');
const { isArray } = require('util');
const className = 'User';

const UserSave = (LstUser) => {
    try {
        const userJSON = JSON.stringify(LstUser);
        fs.writeFileSync('user.json', userJSON);
        log.Write({class:className, method: 'UserDA.UserSave', message:'Operation executed', TypeMessage: enumerator.TypeMessage.Success});
    } catch (error) {
        log.Write({class:className, method: 'UserDA.UserSave',message:error});
    }
}

const UserCreate =(objUser)=>{
    try {
        let LstUser = UserRead({});
        objUser.UserId = LstUser.length + 1
        LstUser.push(objUser);
        UserSave(LstUser);
        log.Write({class:className, method: 'UserDA.UserCreate', message:'User added with Id ' + objUser.UserId});
    } catch (error) {
        log.Write({class:className, method: 'UserDA.UserCreate', message:error});
    }
}

const UserRead=(objUser, blnomite)=>{
    try {
        const dataBuffer = fs.readFileSync('user.json');
        const dataJSON = dataBuffer.toString();
        let lstUser = JSON.parse(dataJSON);
        if (isArray(lstUser)){
            if (objUser !== undefined){
                if (blnomite === true){
                    if (objUser.UserId !== undefined){
                        lstUser = lstUser.filter((usr)=> usr.UserId !== objUser.UserId);
                    }
                    if (objUser.UserName !== undefined){
                        lstUser = lstUser.filter((usr)=> usr.UserName !== objUser.UserName);
                    }
                }else{
                    if (objUser.UserId !== undefined){
                        lstUser = lstUser.filter((usr)=> usr.UserId === objUser.UserId);
                    }
                    if (objUser.UserName !== undefined){
                        lstUser = lstUser.filter((usr)=> usr.UserName === objUser.UserName);
                    } 
                }
            }
            return lstUser;
        }else{
          return [];
        }
    } catch (error) {
        return []
    }
}

const UserUpdate =(objUser)=>{
    try {
        let LstUser = UserRead({UserId : objUser.UserId}, true);
        LstUser.push(objUser);
        UserSave(LstUser);
        log.Write({class:className, method: 'UserDA.UserUpdate', message:'User updated with Id ' + objUser.UserId, TypeMessage: enumerator.TypeMessage.Success});
    } catch (error) {
        log.Write({class:className, method: 'UserDA.UserUpdate', message:error});
    }
}

const UserDelete = (UserId) => {
    try {
        let lstUser = UserRead({UserId:UserId}, true);
        UserSave(lstUser);
        log.Write({class:className, method: 'UserDA.UserDelete', message:'User deleted with Id ' + UserId, TypeMessage: enumerator.TypeMessage.Success});
    } catch (error) {
        log.Write({class:className, method: 'UserDA.UserDelete', message:error});
    }
}

module.exports = {
    Create : UserCreate,
    Read : UserRead,
    Update : UserUpdate,
    Delete : UserDelete
}