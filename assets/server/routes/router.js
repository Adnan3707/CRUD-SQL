const express = require('express');
const route = express.Router()
const controller = require('../database/connection')
const axios = require('axios')
route.get('/',async (req,res)=> {
   try {
     const clmn =  await axios.get('http://localhost:3000/api/users/clmn')
     const response = await axios.get("http://localhost:3000/api/users");
        const data = {
          colmn: clmn.data.data,
          users: response.data.rows,
        };
        // console.log(test.data.data)
        res.render("index", { users: data });
   } catch (err) {
     console.error(err);
   }

//   await axios
//     .get("http://localhost:3000/api/users")
//     .then((response) => {
//       // console.log(response.data.rows)
//       res.render(
//         "index",
//         { users: response.data.rows }
//         //   { col: clmn.data.data }
//       );
//     })
//     .catch((err) => {
//       res.send(err);
//     });
}
)

route.get('/add-user',(req,res)=> {
   res.render('add_user');
}
)
route.get('/update-user',(req,res)=> {
      axios.get('http://localhost:3000/api/users',{ params : { id:req.query.id }}).then((userdata)=>{
         console.log(req.query.id)
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
      console.log(response.data.data);
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
route.get("/api/users/search/new", controller.Searchnew);
route.get("/api/users/search/id",controller.Byid);
route.get("/api/users/search/sta",controller.ByStatus);
route.get("/api/users/clmn", controller.Test);
route.get("/api/users/addclm",controller.Addclm)
module.exports = route