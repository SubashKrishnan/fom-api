export const createSuccessResponse = (
  message: string,
  data: any = {},
  statusCode = 200
): any => {
  return {
    statusCode,
    body: JSON.stringify({
      success: true,
      message,
      data,
    }),
  };
};

export const createErrorResponse = (message: any, statusCode = 500): any => {
  const errorMessage =
    typeof message === 'string'
      ? message
      : message.message || 'An error occurred';
  return {
    statusCode,
    body: JSON.stringify({
      success: false,
      message: errorMessage,
    }),
  };
};
