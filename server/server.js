var  express = require('express')
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// all get routes above catch all
app.use(express.static(__dirname + "/../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
   });


   mongoose
   .connect(process.env.MONGODB_URI )
   .then(() => {
     app.listen(process.env.PORT || 3000);
   })
   .catch(err => {
     console.log(err);
   });
 