const userSet = (objUser) => {
    return {
        UserId: objUser.UserId,
        UserName: objUser.UserName,
        UserPassword: objUser.UserPassword,
        UserBirthDay: new Date(objUser.UserBirthDay),
        UserAge: objUser.UserAge,
        UserActive: objUser.UserActive
    }
}

module.exports = {
    set: userSet
};