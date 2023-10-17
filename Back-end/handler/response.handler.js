const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);
const badRequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });
const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something wrong!",
  });
const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

export default {
  error,
  badRequest,
  ok,
  created,
};
