module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });


  app.get('/test', function(req, res) {
    res.render('test.ejs');
  });


//======================== Bring up each individual restaurant page by restaurant ID ===========================================

  app.get('/detail', function(req, res) {
    let id = req.query.id
    console.log("restID="+ id)
    db.collection('restaurants').findOne({"RestId": id },(err, result) => {
    console.log(err, result)
    res.render('restaurantdetail.ejs', {restaurant: result})
  });
})




// ====================Search for restaurant by name and/or by location==============================================================

        app.get("/restaurant", function(req, res){
          let nameSearch = req.query.search
          if (! nameSearch) {
            // if nothing is entered into the nameSearch field
            nameSearch = {"$exists": "true"}
          //  This query will select all documents in the inventory collection where the nameSearch field exists
          } else {
          nameSearch = {$regex: req.query.search, $options: 'i'}
          // search by name $options makes it a regex? the 'i' ignores case sensitivity so you can search without having to type all capitals
          }
          let search = { $and: [ {location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ -71.0638, 42.2843 ] }, $maxDistance: 1609 * (req.query.distance ? req.query.distance : 100) } } }, {Name: nameSearch }]};
          //the $and operator allows us to combine queries so we can search by name and by location
          // $nearsphere makes a circle and we get to search for points on an imaginary map which are restaurants and we search for a max distance which is in meters
          // 1609 is in meters and that's 1 mile we give the user the option to search the distance from 1-5 miles from the coordinates which is 50 milk street
          // trying to get geolocation to work so instead of me putting in the coordinates by hard code geolocation will determine your longitude and latitude
        db.collection('restaurants').find(search).toArray((err, result) => {
          // goes into the database collection restaurants and GETS all of the data and turn it into an array
          if (err) res.send (err);
           console.log(err)
          res.render('restaurant.ejs', {restaurants: result})
        })
      })

//---------------------------test------------------------------------

// app.post('/messages', (req, res) => {
//   db.collection('restaurants').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, bigMad:0}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })
//
// app.put('/messages', (req, res) => {
//   db.collection('restaurants')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.post('/messages', (req, res) => {
  db.collection('piperi').save({name: req.body.name, msg: req.body.msg,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/detail')
  })
})













//----------------------------------------------------------------





// ========================== individual restaurants ==============================================
app.get('/restaurantdetail', function(req, res) {
  // db.collection('restaurants').find(search).toArray((err, result) => {
  //   if (err) res.send (err);
  //    console.log(err)
  res.render('restaurantdetail.ejs');
});
// ========================== individual restaurants ==============================================



  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // // comment board routes ===============================================================
  //
  //     // This is the collection for customer orders
  //     app.post('/cashier', (req, res) => {
  //       db.collection('messages').save({type:req.body.type, size: req.body.size, quantity: req.body.quantity, other:req.body.other, name:req.body.name, complete: false }, (err, result) => {
  //         if (err) return console.log(err)
  //         console.log('saved to database')
  //         res.redirect('/menu')
  //       })
  //     })
  //
  //     // to add more restaurants check order complete
  //     app.put('/barista', (req, res) => {
  //       db.collection('messages')
  //       .findOneAndUpdate({type:req.body.type, size: req.body.size, quantity: req.body.quantity, other:req.body.other, name:req.body.name, complete: false }, {
  //         $set: {
  //           complete: true
  //         }
  //       }, {
  //         sort: {_id: -1},
  //         upsert: true
  //       }, (err, result) => {
  //         if (err) return res.send(err)
  //         res.send(result)
  //       })
  //     })

  // Will delete from customerOrder collections
  app.delete('/remove', (req, res) => {
    db.collection('restaurants').findOneAndDelete({name:req.body.name , type:req.body.type}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });

  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));



  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
