import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getBookService, getFilterService } from "../service/bookService.js";

export const getBookController = async(req,res,next) => {
    try {
        const data = req.body;
        const filter = {
            page: data.page || 0,
      pagesize: data.pagesize || 4,
      word: data.word || '',
      author: Array.isArray(data.author) ? data.author : [],
      language: Array.isArray(data.language) ? data.language : [],
        };
        
        const result = await getBookService(filter);
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


// if (data?.page) {
        //     filter.page = data.page;
        //   }
        //   if (data?.pagesize) {
        //     filter.pagesize = data.pagesize;
        //   }
        //   if (data?.word) {
        //     filter.word = data.word;
        //   }
        // if (data?.color) {
        //     if (Array.isArray(data.author)) {
        //       filter.author = data.author;
        //     } else {
        //       filter.author = [data.author];
        //     }
        //   }
        //   if (data?.language) {
        //     if (Array.isArray(data.language)) {
        //       filter.language = data.language;
        //     } else {
        //       filter.language = [data.language];
        //     }
        //   }
