import bookModel from "../Models/bookModel.js"

export const getBookService = async () => {
    const res = await bookModel.find({});
    return res;
}