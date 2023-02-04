const userController = require("./controllers/UserController");

const express = require("express");
const routes = express.Router();

//  POST
routes.post("/user",userController.create);
//  GET
routes.get("/user/:id",userController.get);
//  PATCH
routes.patch("user/:id",()=>{console.log('patch')})
//  DELETE
routes.delete("/user/:id",()=>{console.log('delete')})


export { routes };
