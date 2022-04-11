var  express = require('express'),
         app = express();
const path = require("path");
    
app.use(express.static(__dirname + "/../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
   });

app.listen(
    process.env.PORT || 3030)