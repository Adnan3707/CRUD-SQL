const express = require('express');
const route = express.Router()
const controller = require('../database/connection')
const axios = require('axios')
route.get('/',(req,res)=> {
   axios.get('http://localhost:3000/api/users').then((response)=>{
      res.render('index',{users: response.data.rows});
   }).catch(err=>{
      res.send(err)
   })
}
)
route.get('/add-user',(req,res)=> {
   res.render('add_user');
}
)
route.get('/update-user',(req,res)=> {
    res.render('update_user');
})

route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route