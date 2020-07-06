const userName = 'Diego';
const userAge  = 32;

const usertest = {
    name: userName,
    age: userAge,
    alias: 'Pruebas'
}

console.log(usertest);

const {name, age, alias = 'Chelo'} = usertest;

const transaction = (type, { name, age }) => {
    console.log(type);
    console.log(name);
    console.log(age);
}
transaction('Read', usertest);