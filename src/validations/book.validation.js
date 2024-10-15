const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getBooks = {
  query: Joi.object().keys({
    search: Joi.string(),
    language: Joi.string(),
    slug: Joi.string(),
    fromPrice: Joi.number().integer(),
    toPrice: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    author: Joi.string().required(),
    published_date: Joi.date().required(),
    isbn: Joi.string().required(),
    genres: Joi.array().required(),
    summary: Joi.string().required().trim(),
    cover_image: Joi.string().required(),
    total_book_pages: Joi.number().required(),
    digital_content: Joi.string().required(),
    language: Joi.string().required(),
    prices: Joi.array().required(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId).required(),
  }),
};

const updateBook = {
  body: Joi.object().keys({
    title: Joi.string().trim(),
    author: Joi.string(),
    published_date: Joi.date(),
    isbn: Joi.string(),
    genres: Joi.array(),
    language: Joi.string(),
    summary: Joi.string().trim(),
    cover_image: Joi.string(),
    total_book_pages: Joi.number(),
    digital_content: Joi.string(),
    prices: Joi.array(),
  }),
};

const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId).required(),
  }),
};

const createCheckoutBook = {
  body: Joi.object().keys({
    books: Joi.array().required(),
  }),
};

const confirmCheckoutBook = {
  query: Joi.object().keys({
    paymentId: Joi.string().required(),
    token: Joi.string().required(),
    PayerID: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
  }),
};

const readBook = {
  params: Joi.object().keys({
    book_id: Joi.string().custom(objectId).required(),
  }),
};

const downloadBook = {
  params: Joi.object().keys({
    book_id: Joi.string().custom(objectId).required(),
  }),
};

const getBooksWithGenres = {
  query: Joi.object().keys({
    language: Joi.string(),
    fromPrice: Joi.number().integer(),
    toPrice: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    genre: Joi.string().required(),
  }),
};

const getBookBySlug = {
  params: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

const increaseView = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
  createCheckoutBook,
  confirmCheckoutBook,
  readBook,
  getBooksWithGenres,
  getBookBySlug,
  downloadBook,
  increaseView,
};
