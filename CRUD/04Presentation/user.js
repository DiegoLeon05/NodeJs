const className = 'User';
const log = require('../../Generic/log');
try {
    const yargs = require('yargs');
    const useret = require('../01Entities/user');
    const userbl = require('../03BusinessLogic/userBL');
    const enumerator = require('../../Generic/Enumerators');

    const user = (argv)=>{
        try {
            return useret.set({
                UserId: argv['UserId'],
                UserName: argv['UserName'],
                UserPassword: argv['UserPassword'],
                UserBirthDay: new Date(argv['UserBirthDay']),
                UserAge: argv['UserAge'],
                UserActive: argv['UserActive']
            })
        } catch (error) {
            log.Write({class:className, method: 'Presentation.user', message:error});
        }
    };
    
    const userBuilder = (typeCrud)=>{
        return{
            TypeCrud:{
                describe: 'Type of action to execute [Create:1,Read: 2,Update: 3,Detele: 4]',
                demandOption: false,
                type:'number'
            },
            UserId:{
                describe:'Identification of the user',
                demandOption: (typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Delete),
                type:'number'
            },
            UserName:{
                describe:'Name of the user',
                demandOption:(typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Create),
                type:'string'
            },
            UserPassword:{
                describe:'Password of the user',
                demandOption:(typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Create),
                type:'string'
            },
            UserBirthDay:{
                describe:'Date of birthday of the user "dd/mm/yyyy"',
                demandOption:(typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Create),
                type:'string'
            },
            UserAge:{
                describe:'Age of the user',
                demandOption:(typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Create),
                type:'number'
            },
            UserActive:{
                describe:'The user is active?',
                demandOption:(typeCrud === enumerator.TypeCrud.Update || typeCrud === enumerator.TypeCrud.Create),
                type:'boolean'
            }
        }
    }
    const userList = (user) =>{
        debugger
        userbl.Read(user).forEach(objUser => {
            console.log(objUser);
        });
    }

    const executeOperation = (typeCrud, user)=>{
        try {
            switch (typeCrud) {
                case enumerator.TypeCrud.Create:
                    userbl.Create(user);
                    break;
                case enumerator.TypeCrud.Read:
                    userList(user);
                    break;
                case enumerator.TypeCrud.Update:
                    userbl.Update(user);
                    break;
                case enumerator.TypeCrud.Delete:
                    userbl.Delete(user.UserId);
                    break;
            }
        } catch (error) {
            log.Write({class:className, method: 'Presentation.executeOperation', message:error});
        }
    }
    //Operation CRUD
    yargs.command({
        command:'Operation',
        describe:'Information of the user for the acces in the system',
        builder: userBuilder(enumerator.TypeCrud.Create),
        handler: (argv)=>{
            executeOperation(argv['TypeCrud'], user(argv));
        }
    })

    //Create
    yargs.command({
        command:'Create',
        describe:'Create User in the System',
        builder: userBuilder(enumerator.TypeCrud.Create),
        handler: (argv)=>{executeOperation(enumerator.TypeCrud.Create, user(argv));}
    })
    .argv;

    //Read
    yargs.command({
        command:'Read',
        describe:'Read User in the System',
        builder: userBuilder(enumerator.TypeCrud.Read),
        handler: (argv)=>{executeOperation(enumerator.TypeCrud.Read, user(argv));}
    })
    .argv;

    //Update
    yargs.command({
        command:'Update',
        describe:'Update User in the System',
        builder: userBuilder(enumerator.TypeCrud.Update),
        handler: (argv)=>{executeOperation(enumerator.TypeCrud.Update, user(argv));}
    })
    .argv;

    //Delete
    yargs.command({
        command:'Delete',
        describe:'Delete User in the System',
        builder: userBuilder(enumerator.TypeCrud.Delete),
        handler: (argv)=>{executeOperation(enumerator.TypeCrud.Delete, user(argv));}
    })
    .argv;
} catch (error) {
        log.Write({class:className, method: 'Presentation', message:error});
}