// const { createPool }= require('mysql') ;
// const pool = createPool({
//    host: "database-do-user-10312936-0.b.db.ondigitalocean.com",
//   user: "doadmin",
//   password: "AVNS_BvBYzrF4U6SJbmP",
//   database: "dummy",
//   port: "25060",
//   table:"Testing"
// })
// pool.query(`select * from Testing`,(err,result,fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result)
// })
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "database-do-user-10312936-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_BvBYzrF4U6SJbmP",
  database: "dummy",
  port: "25060",
  table:"Testing"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});
// create and save new user
exports.create = (req,res)=>{
  console.log("entered create")
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

//  console.log(req.body)
    
 // new user

    // const user = new Userdb({
    //     name : req.body.name,
    //     email : req.body.email,
    //     gender: req.body.gender,
    //     status : req.body.status
    // })

      con.query(
        // `INSERT INTO Testing (name, email, gender, status) VALUES (${req.body.name},${req.body.email},${req.body.gender},${req.body.status})`
'INSERT INTO Testing SET name = ?, email = ?, gender = ?, status = ?', [req.body.name, req.body.email, req.body.gender,req.body.status]
, function (err, result) {
    if (err) throw err;
    // res.status(200).send({
    //   message:'Inserted',
    //   data: result
    // })
     res.status(200).redirect('/add-user')
    // console.log("Result: " + result);
  });

    // save user in the database

    // user
    //     .save(user)
    //     .then(data => {
    //         //res.send(data)
    //         res.redirect('/add-user');
    //     })
    //     .catch(err =>{
    //         res.status(500).send({
    //             message : err.message || "Some error occurred while creating a create operation"
    //         });
    //     });

}


// // retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;
              con.query('SELECT * FROM Testing WHERE id = ? ',[id], (err, rows) => {
    // When done with the connection, release it
    // console.log('The data from user table: \n', rows);

    // console.log(rows)
    
    res.send({
      rows:rows
    })
  })
        // Userdb.findById(id)
        //     .then(data =>{
        //         if(!data){
        //             res.status(404).send({ message : "Not found user with id "+ id})
        //         }else{
        //             res.send(data)
        //         }
        //     })
        //     .catch(err =>{
        //         res.status(500).send({ message: "Erro retrieving user with id " + id})
            }
   else{
              con.query('SELECT * FROM Testing ', (err, rows) => {
    // When done with the connection, release it
    // console.log('The data from user table: \n', rows);
    res.send({
      rows:rows
    })
    // }else{
        // Userdb.find()
        //     .then(user => {
        //         res.send(user)
        //     })
        //     .catch(err => {
        //         res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        //     })
      })
    }
}

// // Update a new idetified user by user id

exports.update = (req, res)=>{
//     if(!req.body){
//         return res
//             .status(400)
//             .send({ message : "Data to update can not be empty"})
//     }
  console.log("entered Update")
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // console.log(req.body)

  // const { first_name, last_name, email, phone, comments } = req.body;
  // // User the connection
  // connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
    con.query(
        // `INSERT INTO Testing (name, email, gender, status) VALUES (${req.body.name},${req.body.email},${req.body.gender},${req.body.status})`
'UPDATE Testing SET name = ?, email = ?, gender = ?, status = ? WHERE id = ?', [req.body.name, req.body.email, req.body.gender,req.body.status ,req.params.id]
, function (err, result) {
    if (err) throw err;
    res.status(200).send({
      message:'Updated',
      data: result
    })
    console.log("Result: " + result);
  });

//     const id = req.params.id;
//     Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update user information"})
//         })
}

// // Delete a user with specified user id in the request
exports.delete = (req, res)=>{
  // console.log('Entered Delete')
  con.query('DELETE FROM Testing WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.status(200).send({message:'User Status succcessly set Deleted'})
    } else {
      console.log(err);
    }

    // console.log('The data from beer table are: \n', rows);
  
  });
  //   con.query('UPDATE Testing SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     res.status(200).send({message:'User Status succcessly set removed'})
  //     let removedUser = encodeURIComponent('User successeflly removed.');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });
//     const id = req.params.id;

//     Userdb.findByIdAndDelete(id)
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
//             }else{
//                 res.send({
//                     message : "User was deleted successfully!"
//                 })
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message: "Could not delete User with id=" + id
//             });
//         });
}
