var dburl = 'mongodb://localhost:27017/music';
var collections = ['music'];
var db = require('mongo.js').connect(dburl, collections);


//short form 
//var db = require('mongo.js).connect('localhost/mongoapp', ['users']);

function user(firstname, lastname, email){
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email; 
}
// {"firstname" : "Philip", "lastname": "Fry", "email": "philip@fry.com"}

var user1 = new user("Philip", "Fry", "philip@fry.com");
db.users.save(user1, function(err, saveUser){
    if (err || savedUser) console.log("User"+ user.mail + "not saved because of error"+err);
    else console.log("User"+savedUser.email + "saved");
});
