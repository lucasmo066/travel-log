var  express = require('express')
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
   
const placesRoutes = require('./routes/places-routes');

app.use(express.static(__dirname + "/../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
   });
app.use(placesRoutes);

app.listen(
    process.env.PORT || 3030)