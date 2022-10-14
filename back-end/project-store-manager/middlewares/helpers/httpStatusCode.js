// Object Literals
function httpStatus(type) {
  const Code = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422,
  };
  return Code[type];
}

const httpStatusCheck = (errorType) => {
  if (errorType === 'number.min' || errorType === 'string.min') {
    return httpStatus('unprocessableEntity');
  }
  if (errorType === 'any.required') return httpStatus('badRequest');
};

module.exports = {
  httpStatus,
  httpStatusCheck,
};