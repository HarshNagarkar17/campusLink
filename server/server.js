const express = require('express');
const server = express();
const {keys} = require("./config");
const {connect} = require("./database/connect");


server.use(express.json());
server.use(express.urlencoded({ extended:true }));

server.use("/api",require("./routers/auth.routes"), require("./routers/user.routes"));

const connection = async() => {
    
    try {
        await connect(keys.mongo_uri);
        server.listen(keys.port, () => console.log(`server started on port: ${keys.port}`));
    } catch (error) {
        console.error(error);        
    }

}

connection();


