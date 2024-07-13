import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getBookService, getSearchService } from "../service/bookService.js";

export const getBookController = async(req,res,next) => {
    try {
        const result = await getBookService();
        if(result){
            return res.status(200).json({
                type: SUCCESS,
                message: "Fetch successfully",
                data: result
            });
        }else {
            return res.status(400).json({
                type: FAILURE,
                message: "Failed to fetch",
            })
        }
    } catch (error) {
        next(error);
    }
}
export const getSearchController = async(req,res,next) => {
    try {
        const data = {
            word: req.body?.word,
          };
        //   if (req.body?.word == "") {
        //     return res.status(400).json({
        //       type: FAILURE,
        //       message: "Failed to fetch search result",
        //       errors: [],
        //     });
        //   }
        const result = await getSearchService(data);
        if(result){
            return res.status(200).json({
                type: SUCCESS,
                message: "Search successfully",
                data: result
            });
        }else {
            return res.status(400).json({
                type: FAILURE,
                message: "Failed to search",
            })
        }
    } catch (error) {
        next(error);
    }
}