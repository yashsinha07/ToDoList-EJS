const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set("view engine", "ejs");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//GET Request for Root endpoint
app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

//POST Request for Root endpoint
app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

//GET Request for Work endpoint
app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

//POST Request for Work endpoint
app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

//GET Request for About endpoint
app.get("/about", function (req, res){
    res.render("about");
});

//SERVER PORT SETUP
app.listen(3000, function () {
    console.log("Server started running on port 3000...");
});