const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Admin = require('../schemas/Admin.schema')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, cb) {		      
      Admin.findOne({ username: 'admin' }, async (err, user) => {        
        if (err) {
          console.log(err)
          return cb(err)
        }
        if (!(await bcrypt.compare(password, user.password))) {          
          return cb(403)
        } else {
          console.log('worked');
          
          return cb(null, user)
        }
      })
    }
  )
)

passport.serializeUser(function (user, cb) {  
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

module.exports = passport
