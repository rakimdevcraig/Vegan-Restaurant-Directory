module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    app.get('/test', function(req, res) {
      res.render('test.ejs');
    });



    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };



  app.get("/restaurant", function(req, res){
// if the user performs a search
      if(req.query.search) {
          db.collection('restaurants').find({Name: req.query.search}).toArray((err, result) =>{
            // if they search through the restaurants collection using the name property, turn it to an array
             if(err){
                 console.log(res);
             } else {  res.render("restaurant.ejs",{restaurants: result});
             // render the results
           }
          });
      } else {
          // Get all restaurants from DB
          db.collection('restaurants').find().toArray((err, result) =>{
             if(err){
                 console.log(err);
             } else {
                res.render("restaurant.ejs",{restaurants: result});
             }
          });
      }
    })


// restaurants loads but searching doesnt work
//     app.get("/restaurant", function(req, res){
//         if(req.query.search) {
//             const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//             // Get all campgrounds from DB
//             db.collection('restaurants').find({name: regex}, function(err, Name){
//                if(err){
//                    console.log(err);
//                }
//             });
//         } else {
//             // Get all campgrounds from DB
//             db.collection('restaurants').find().toArray((err, result) =>{
//                if(err){
//                    console.log(err);
//                } else {
//                   res.render("restaurant.ejs",{restaurants: result});
//                }
//             });
//         }
//       })








    // restaurant SECTION =========================
    // app.get('/restaurant', function(req, res) {
    //     db.collection('restaurants').find().toArray((err, result) => {
    //       // goes into the database collection restaurants and GETS all of the data and turn it into an array
    //       if (err) return console.log(err)
    //       res.render('restaurant.ejs', {restaurants: result})
    //       // renders or displays the information from th
    //     })
    // });

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
