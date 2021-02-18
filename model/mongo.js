const mongoose = require('mongoose');

let conn = mongoose.connect("mongodb+srv://Peter:1010@testcluster1.afazs.mongodb.net/adminstration?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.log("Connection failed!");
})

module.exports = conn;