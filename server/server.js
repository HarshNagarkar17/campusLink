const express = require('express');
const server = express();
const {keys} = require("./config");
const {connect} = require("./database/connect");


server.use(express.json());
server.use(express.urlencoded({ extended:true }));

server.use("/api", require("./routers/user.routes"), require("./routers/auth.routes"));

const connection = async() => {
    
    try {
        await connect(keys.mongo_uri);
        server.listen(keys.port, () => console.log(`server started on port: ${keys.port}`));
    } catch (error) {
        console.error(error);        
    }

}

connection();


