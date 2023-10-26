// backend.js
import express from "express";
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 8000;
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

function generateRandomId(length = 8) {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';
   for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined && job != undefined){
       let result = findUserByNameJob(name, job);
       result = {users_list: result};
       res.send(result);
   }
   else{
      res.send(users);
   }
});

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

function findIndexById(id) {
   return users['users_list'].findIndex( (user) => user['id'] === id);
}

app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined && job != undefined){
       let result = findUserByNameJob(name, job);
       result = {users_list: result};
       res.send(result);
   }
   else{
      res.send(users);
   }
});


const findUserByName = (name) => { 
   return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByNameJob = (name, job) => { 
   return users['users_list'].filter( ((user) => user['name'] === name) && ((user) => user['job'] === job)); 
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});    

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   const newUser = addUser(userToAdd);
   res.status(201).send(newUser);
});

app.delete('/users/:id', (req, res) => {
   const id = req.params['id'];
   const index = findIndexById(id);
   if(index > -1){
      deleteUser(index);
      res.status(204).end();
   } else{
      res.status(404).send('User not found.');
   }
});


function addUser(user){
   user.id = generateRandomId(); 
   users['users_list'].push(user);
   return user;
}

function deleteUser(index){
   users['users_list'].splice(index, 1);
}
