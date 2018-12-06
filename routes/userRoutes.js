const jsonfile = require('jsonfile');
let file_path = "./DB/toDo.json"; //<----my custom json

module.exports = app => {

  //GET JSON DATA
  app.get("/toDo", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/toDo.json", function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
    
  });

  //SEND JSON DATA TO DATABASE
  app.post("/toDo", (req, res) => {

    let {
      email,
      username,
        toDo
    } = req.body;

    jsonfile.readFile("./DB/toDo.json", function (err, content) {

      content.push({
        email,
        username,
        toDo
      });

      console.log("added " + email + "to DB");

      jsonfile.writeFile("./DB/toDo.json", content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  //DELETE JSON DATA FROM DATABASE
  app.delete("/toDo", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile("./DB/toDo.json", function (err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile("./DB/toDo.json", content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  //REPLACE USERNAME FROM LINKED EMAIL TO ANOTHER
  app.put("/toDo", (req, res) => {
    let user;
    let username = req.body.username;
    let email    = req.query.email;
    let todo    = req.body.toDo;
  
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
