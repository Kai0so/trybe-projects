const httpStatus = (errorType: string) => {
  const badRequest = 400;
  const unprocEntity = 422;

  if (errorType === 'any.required') return badRequest;
  return unprocEntity;
};

export default httpStatus;