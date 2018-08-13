module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page
  app.get('/', function(req, res) {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
    console.log("ip defined" + ip)
    var iplocation = require('iplocation')
    iplocation(ip, function (error, ipres) {
      console.log(ipres)
      req.session.location = {lat: ipres.latitude, lng: ipres.longitude}
      res.render('index.ejs');
      // console.log(res);
    });
  });



  // testing just to make sure i can render piperi database
  app.get('/messages', (req, res) => {
    db.collection('piperi').find().toArray((err, result) => {
      console.log(err, result)
      if (err) return console.log(err)
      res.render('test.ejs', {piperi: result})
    })
  })



  // ================================renders information for each individual restaurant & renders all of the comments currently ========================================//
  app.get('/detail', function(req, res) {
    let id = req.query.id
    console.log("restID="+ id)
    db.collection('restaurants').findOne({"RestId": id },(err, result) => {
      console.log(err, result)
      db.collection('reviews').find({"RestId": id }).toArray((er, r) => {
        // getting comments from the comments database this is nested inside the other find so i'm making an asynchronous request
        // we do it as a find and we find everything that matches up with the restid of the page that we're on
        res.render('restaurantdetail.ejs', {restaurant: result, piper: r})
        // render the information back from the restaurant database and the comments
      })
    });
  })

  // =================================================================================== ========================================//




  // ====================Search for restaurant by name and/or by location==============================================================

  app.get("/restaurant", function(req, res){
    let nameSearch = req.query.search
    // the nameSearch variable is whatever the user types into the search bar
    if (! nameSearch) {
      // if nothing is entered into the nameSearch field
      nameSearch = {"$exists": "true"}
      //  This query will select all documents in the inventory collection where the nameSearch field exists
    } else {
      nameSearch = {$regex: req.query.search, $options: 'i'}
      // search by name $regex makes it a regexpression the 'i' is an option  mongo provides
      // ignores case sensitivity so you can search without having to type all capitals
    }
    let search = { $and: [ {location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ req.session.location.lng || -71.058884 , req.session.location.lat || 42.360081  ] }, $maxDistance: 1609 * (req.query.distance ? req.query.distance : 100) } } }, {Name: nameSearch }]};
    console.log("longitude from session"+ req.session.lng + "latitude from session"+ req.session.latitude)
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

  // ================================================================================================================================================

  // ================================form that reviews are posted thru ====================================================================
  app.post('/detail1', (req, res) => {
    db.collection('reviews').save({name: req.body.name, review: req.body.review, RestId: req.body.RestId}, (err, result) => {
      // sends the name the review and the restaurant ID to the database so that each document can be found later on by restaurant ID when I want to render
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect("/detail?id=" + req.body.RestId)
      // redirects after submitting the form to the detail?id= + the id of whichever page you were on the ID is found by the form you submit
    })
  })

  // ================================================================================================================================

  // =================================== search ===============================================
  app.get('/stest', function(req, res) {
    db.collection('restaurants').find().toArray((err, result) => {
      // goes into the database collection restaurants and GETS all of the data and turn it into an array
      if (err) return console.log(err)
      res.render('searchtest.ejs', {restaurants: result})
      // renders or displays the information from th
    })
  });
  //----------------------------------------------------------------








  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



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
