const userController = require("./controllers/UserController");
const profileController = require("./controllers/ProfileController");
const jobController = require("./controllers/JobController");
const authController = require("./controllers/AuthController");
const applicationController = require("./controllers/ApplicationController");

const express = require("express");
const routes = express.Router();

//                      AUTH
routes.post("/auth/register", authController.register);
routes.post("/auth/login", authController.login);
//                     USER
routes.get("/user/:id", userController.get);
routes.patch("user/:id", userController.update);
routes.delete("/user/:id", userController.del);
//                    PROFILE
routes.post("/profile", profileController.create);
routes.get("/profile/:id", profileController.get);
routes.patch("profile/:id", profileController.update);
//                   JOB
routes.post("/job", jobController.create);
routes.get("/job/:id", jobController.get);
routes.get("/job", jobController.getAll);
routes.patch("job/:id", jobController.update);
routes.delete("/job/:id", jobController.del);
//                APPLICATION
routes.post("/application", applicationController.create);
routes.get("/application/:id", applicationController.get);
routes.patch("/application/:id", applicationController.update);
routes.delete("/application/:id", applicationController.del);
//             JOB CATEGORY


export { routes };
