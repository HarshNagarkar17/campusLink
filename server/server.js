const express = require('express');
const server = express();
const {keys} = require("./config");
const {connect} = require("./database/connect");
const path = require("path");
const {CustomError} = require("./utils/customError")
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(express.urlencoded({ extended:true }));
server.use(cookieParser());

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use('/public', express.static(path.join(__dirname, 'public')));

server.use("/", require("./routers/render.routes"));
server.use("/api",require("./routers/auth.routes"), require("./routers/user.routes"));
server.use("/api/post", require("./routers/post.routes"));

//error handler
server.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ error: err.message, status:"failed" });
      console.log("error from server: ", err.message);
    } else {
      console.log("bug: ", err);
      res.status(500).json({ error: err.message, status:"failed" });
    }
  });
const connection = async() => {
    
    try {
        await connect(process.env.URI);
        server.listen(keys.port, () => console.log(`server started on port: ${keys.port}`));
    } catch (error) {
        console.error(error);        
    }

}

connection();


