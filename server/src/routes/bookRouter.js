import { Router } from "express";
import { getBookController } from "../Controllers/bookController.js";



export const bookRouter = Router();

bookRouter.get("/getBook",getBookController);
