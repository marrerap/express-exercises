const http = require('http');
const express = require('express');
const db = require('./db')



const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')
const server = http.createServer(app)

// setting up the server ^^^^
// adding paths below

// root route
app.get('/', (req, res) => {
  res.render('home', {
    title: "JJ's Diner",
    special: "Free Bacon",
    user: null
  });
})
app.get('/menu', (req, res) => {
  res.render('menu', {
    title: "JJ's Menu",
    // db.specials is allowing me to pull an list from an object in the db.js
    specials: db.specials
  })
})
app.get("/menu/:id", (req,res) => {
    // get data fomr the db.specials
    const foundSpecial = db.specials.find((special) => {
      return special.id === parseInt(req.params.id)
    })  
  // render the template
  res.render("menuItem", {
    title: "JJ's Menu",
    special: foundSpecial
  })
})

app.get('/hello', (req, res) => {
  res.send('Hello World')
})
app.get("/api/friends", (req, res) => {
  res.json(db.friends)
})


app.get('/api/friends/:handle', (req, res) => {
  console.log(req.params.handle)
  const foundFriends =db.friends.find((friend) => {
    if (friend.handle === req.params.handle) {
      return true
    } else {
      return false
    }
    
  })
  res.json(foundFriends)
})

app.get('/*', (req, res) => {
  res.status(404)
  res.send('Not Found')
})
// needed to listen for req and res 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
