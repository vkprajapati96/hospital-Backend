import express from "express";
import { getAllMessage, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";


const Router = express.Router();
Router.post('/send',sendMessage);
Router.get('/getall', isAdminAuthenticated,getAllMessage);



export default Router;