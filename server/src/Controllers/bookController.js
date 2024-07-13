import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getBookService } from "../service/bookService.js";

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