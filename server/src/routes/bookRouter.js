import { Router } from "express";
import { getBookController, getSearchController } from "../Controllers/bookController.js";



export const bookRouter = Router();

bookRouter.get("/getBook",getBookController);
bookRouter.post("/getSearch",getSearchController);
