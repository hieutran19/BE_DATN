const httpStatus = require('http-status');
const moment = require('moment');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { borrowRecordService } = require('../services');

const getAllRecords = catchAsync(async (req, res) => {
  if (req.user.role === 'user') req.params.user_id = req.user._id;
  if (!req.query.sortby) req.query.sortBy = 'borrow_date:desc';
  const filter = pick(req.params, ['book_id', 'user_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (req.query.from && req.query.to) {
    filter.borrow_date = {
      $gte: moment(req.query.from).startOf('day').toDate(),
      $lte: moment(req.query.to).endOf('day').toDate(),
    };
  } else {
    if (req.query.from) filter.borrow_date = { $gte: moment(req.query.from).startOf('day').toDate() };
    if (req.query.to) filter.borrow_date = { $lte: moment(req.query.to).endOf('day').toDate() };
  }
  const result = await borrowRecordService.getAllRecords(filter, options);
  res.status(httpStatus.OK).json({
    status: 'success',
    data: { result },
  });
});

const createRecord = catchAsync(async (req, res) => {
  const record = await borrowRecordService.createRecord(req.body);
  res.status(httpStatus.CREATED).json({
    status: 'success',
    data: { record },
  });
});

const getRecord = catchAsync(async (req, res) => {
  const record = await borrowRecordService.getRecordById(req.params.id);
  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Record not found');
  }
  res.status(httpStatus.OK).json({
    status: 'success',
    data: { record },
  });
});

module.exports = {
  getAllRecords,
  createRecord,
  getRecord,
};
