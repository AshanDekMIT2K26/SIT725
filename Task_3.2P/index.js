var express = require("express")
var app = express()

// Tells Express to serve static files from the 'public' directory
app.use(express.static(__dirname+'/public'))
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); 


var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port)
})
