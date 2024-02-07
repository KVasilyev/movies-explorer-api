const URL_CHECK = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#'()*+,:;<>@[\\\]`{|}~]*$/;
const CREATED = 201;
const OK = 200;
const MONGO_DUPLICATE_ERROR = 11000;

module.exports = {
  URL_CHECK,
  CREATED,
  OK,
  MONGO_DUPLICATE_ERROR,
};
