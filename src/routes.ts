const userController = require("./controllers/UserController");
const profileController = require("./controllers/ProfileController");
const jobController = require("./controllers/JobController");
const authController = require("./controllers/AuthController");
const applicationController = require("./controllers/ApplicationController");

const authMiddleware = require("./middlewares/AuthMiddleware");

const express = require("express");
const routes = express.Router();


//                 MIDDLEWARE
// routes.use(authMiddleware);
//                    AUTH
routes.post("/auth/register", authController.register);
routes.post("/auth/login", authController.login);
//                    USER
routes.get("/user/findById/:id", userController.get);
routes.patch("/user/patch/:id", userController.update);
routes.delete("/user/delete/:id", userController.del);
//                   PROFILE
routes.get("/profile/:id", profileController.get);
routes.patch("/profile/patch/:id", profileController.update);
//                    JOB
routes.post("/job", jobController.create);
routes.post("/job/search", jobController.search);

routes.get("/job/suggesteds/:limit", jobController.getSuggesteds);
routes.get("/job/:id", jobController.get);
routes.get("/job", jobController.getAll);

routes.patch("/job/patch/:id", jobController.update);
routes.delete("/job/delete/:id", jobController.del);
//                APPLICATION
routes.post("/application", applicationController.create);
routes.get("/application/findByUserId/:id", applicationController.get);
routes.patch("/application/patch/:id", applicationController.update);
routes.delete("/application/delete/:id", applicationController.del);
//               JOB CATEGORY


export { routes };
