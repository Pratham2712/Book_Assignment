import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getBookService, getFilterService } from "../service/bookService.js";

export const getBookController = async(req,res,next) => {
    try {
        const result = await getBookService(req.body);
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

export const getFilterController = async(req,res,next) => {
    try {
        const result = await getFilterService();
        if(result){
            const authorsSet = new Set();
    const languagesSet = new Set();

    result.forEach(item => {
        item.author.forEach(author => authorsSet.add(author));
        languagesSet.add(item.language);
    });

    const uniqueAuthors = Array.from(authorsSet);
    const uniqueLanguages = Array.from(languagesSet);
            return res.status(200).json({
                type: SUCCESS,
                message: "Fetch successfully",
                data: {
                    uniqueAuthors:uniqueAuthors,
                    uniqueLanguages:uniqueLanguages
                }
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
