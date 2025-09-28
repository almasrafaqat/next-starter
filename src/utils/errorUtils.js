export const formatValidationErrors = (errorDetails) => {
  if (!errorDetails) return [];

  // Handle array of error_details with field, messages, and value
  if (Array.isArray(errorDetails)) {
    return errorDetails.map(detail => ({
      field: detail.field,
      message: Array.isArray(detail.messages) ? detail.messages[0] : detail.messages,
      value: detail.value
    }));
  }

  // Handle plain object of errors
  if (typeof errorDetails === 'object') {
    return Object.entries(errorDetails).map(([field, messages]) => ({
      field,
      message: Array.isArray(messages) ? messages[0] : messages,
      value: null
    }));
  }

  // Handle string error
  if (typeof errorDetails === 'string') {
    return [{
      field: 'general',
      message: errorDetails,
      value: null
    }];
  }

  return [];
};

export const getErrorMessage = (error) => {
  // Handle Axios errors
  if (error.isAxiosError) {
    const responseData = error.response?.data;
    
    // Handle detailed validation errors
    if (responseData?.error_details) {
      const formattedErrors = formatValidationErrors(responseData.error_details);
      return formattedErrors.map(err => 
        `${err.field}: ${err.message}${err.value ? ` (provided: ${err.value})` : ''}`
      ).join('\n');
    }

    // Handle simple errors object
    if (responseData?.errors) {
      const formattedErrors = formatValidationErrors(responseData.errors);
      return formattedErrors.map(err => err.message).join('\n');
    }

    // Handle error message
    if (responseData?.message) {
      return responseData.message;
    }

    return error.response?.statusText || 'An error occurred while processing your request';
  }

  // Handle regular errors
  if (typeof error === 'string') {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const createErrorAlert = (error) => {
  if (!error) return null;

  const formattedErrors = formatValidationErrors(
    error.error_details || error.errors || error
  );

  return {
    title: error.message || 'Validation Error',
    errors: formattedErrors
  };
};


export function getQueryErrorMessage(error) {
  if (!error) return "Unknown error";
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return String(error);
}

