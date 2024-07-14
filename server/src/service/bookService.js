import bookModel from "../Models/bookModel.js"

export const getBookService = async (data) => {
  const keyword = data?.word;
    const query = {
      $or: [
        { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
        { author: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
        { description: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
      ],
    };
    if (data.author.length > 0) {
      query.author = { $in: data.author };
    }

    if (data.language.length > 0) {
      query.language = { $in: data.language };
    }
  const total = await bookModel.find(query).count();
  const pagesize = data.pagesize || 4;
  const page = data.page || 0;
    const res = await bookModel.find(query,{ title: 1, cover: { $slice: 1 } }).limit(pagesize)
    .skip(pagesize * Math.abs(page));
    return { total: Math.ceil(total / pagesize), data: res };
  }

  export const getFilterService = async () => {
    const res = await bookModel.find({}, 'author language');
    return res;
  }
