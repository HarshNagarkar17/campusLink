const mongoose = require("mongoose");
const {MongoClient} = require("mongodb")


const connect = (url) => {
        mongoose.set("strictQuery", false);
        return mongoose.connect(url);
    }
// const client = new MongoClient(process.env.URI);

// const connect = async() => {
//     try {
//         client.connect();
//         console.log("Connected to mongodb");
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {connect};
