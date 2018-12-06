const jsonfile = require('jsonfile');
let file_path = "./DB/users.json";

module.exports = app => {

  //GET JSON DATA
  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/users.json", function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
    
  });
  //SEND JSON DATA TO DATABASE
  app.post("/users/new", (req, res) => {

    let {
      email,
      username
    } = req.body;

    jsonfile.readFile("./DB/users.json", function (err, content) {

      content.push({
        email,
        username
      });

      console.log("added " + email + "to DB");

      jsonfile.writeFile("./DB/users.json", content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  //DELETE JSON DATA FROM DATABASE
  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile("./DB/users.json", function (err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile("./DB/users.json", content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  //REPLACE USERNAME FROM LINKED EMAIL TO ANOTHER
  app.put("/user", (req, res) => {
    let user;
    let username = req.body.username;
    let email    = req.query.email;
  
    jsonfile.readFile(file_path, function(err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {
  
          console.log("updated user " + req.query.email + " has now username : " + username);
  
          user = content[i];
          user.username = username;
  
        }
      }
  
      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });
  
    });
    res.send(user);
  });
  
};