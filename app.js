const http = require('http');
const express = require('express');
const db = require('./model/db.js')



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
    title: "CEO Reference!!!",    
  });
})
app.get('/ceo-list', (req, res) => {
  res.render('ceo-list', {
    title: "Ceo's",
    // db.specials is allowing me to pull an list from an object in the db.js
    
  })
})

app.get("/ceo-details/:slug", (req,res) => {
    // get data from the db.specials
    const foundCeo = db.find((ceo) => {
      return ceo.id === parseInt(req.params.slug)
    })  
  // render the template
  res.render("ceo-details", {
    title: "Ceo Details",
    Ceo: foundCeo
  })
})


app.get('/*', (req, res) => {
  res.status(404)
  res.send('Not Found')
})
// needed to listen for req and res 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
