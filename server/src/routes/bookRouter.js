import { Router } from "express";
import { getBookController, getBookDetailController, getFilterController } from "../Controllers/bookController.js";



export const bookRouter = Router();

bookRouter.post("/getBook",getBookController);
bookRouter.get("/getFilter",getFilterController);
bookRouter.post("/getBookDetail",getBookDetailController);
