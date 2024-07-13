import bookModel from "../Models/bookModel.js"

export const getBookService = async () => {
    const res = await bookModel.find({},{ title: 1, cover: { $slice: 1 } });
    return res;
}

export const getSearchService = async (data) => {
    const keyword = data?.word;
    const query = {
      $or: [
        { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
        { author: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
        { description: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
      ],
    };
    // if (keyword == "") {
    //   return [];
    // }
    const results = await bookModel.find(query, { title: 1, cover: { $slice: 1 } });
    return results;
  };