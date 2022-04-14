const fs = require('fs');

var  express = require('express')
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');

const app = express();

const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
//     next();
//   });
  
  app.use('/api/places', placesRoutes);
  app.use('/api/users', usersRoutes);
  
//   app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
//   });
  
//   app.use((error, req, res, next) => {
//     if (req.file) {
//       fs.unlink(req.file.path, err => {
//         console.log(err);
//       });
//     }
//     if (res.headerSent) {
//       return next(error);
//     }
//     res.status(error.code || 500);
//     res.json({ message: error.message || 'An unknown error occurred!' });
//   });

// all get routes above catch all
app.use(express.static(__dirname + "/../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
   });


   mongoose
   .connect(process.env.MONGODB_URI || 'mongodb+srv://lucasmo066:01020304Corinthians@cluster0.at8bl.mongodb.net/places?retryWrites=true&w=majority')
   .then(() => {
     app.listen(process.env.PORT || 3001);
   })
   .catch(err => {
     console.log(err);
   });
 