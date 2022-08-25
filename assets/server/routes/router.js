const express = require('express');
const route = express.Router()
const controller = require('../database/connection')
const axios = require('axios')
route.get('/',(req,res)=> {
   axios.get('http://localhost:3000/api/users').then((response)=>{
      // console.log(response.data.rows[1])
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
      axios.get('http://localhost:3000/api/users',{ params : { id:req.query.id }}).then((userdata)=>{
         // console.log(req.query.id)
         // console.log("Router",userdata.data.rows[0].Email)
      res.render('update_user',{user: userdata.data.rows});
   }).catch(err=>{
      res.send(err)
   })
   //  res.render('update_user');
})


route.get("/Search", (req, res) => {
  axios
    .get("http://localhost:3000/api/users/search", {
      params: { first: req.query.first },
    })
    .then((response) => {
      // console.log(response.data.data);
      res.render("search", { users: response.data.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
route.get('/api/users/search/', controller.Search);

module.exports = route