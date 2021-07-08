module.exports = {
  // HTTP 20X
  success: {
    userLogin: {
      status: 'login-success',
      title: 'Welcome back',
      message: 'You have successfully logged in.'
    },

    userRegister: {
      status: 'register-success',
      title: 'Welcome on board',
      message: 'You have successfully registered and are now able to log in.'
    },

    userLoginExtend: {
      status: 'login-extend-success',
      title: 'Session extended',
      message: 'Your session has been extended'
    },

    // Standard messages
    httpOperationSuccess: {
      status: 'success',
      message: 'OK',
    },

    httpResourceCreated: {
      status: 'success',
      message: 'Item created',
    },

    httpResourceUpdated: {
      status: 'success',
      title: 'Item updated',
      message: 'Your data have been updated successfully',
    },

    httpResourceDeleted: {
      status: 'success',
      message: 'Item deleted',
    },
  },

  // HTTP 40X
  clientError: {
    userExists: {
      status: 'client-error',
      title: 'Username already taken',
      message: 'This username is already taken, please choose another',
    },

    mailExists: {
      status: 'client-error',
      title: 'Email already registered',
      message: 'This email adress is already taken, please choose another',
    },

    invalidRequest: {
      status: 'client-error',
      message: 'The action you tried to perform cannot be fulfilled'
    },

    notAuthorizedResource: {
      status: 'not-authorized',
      message: 'You are not permitted to access this resource',
    },

    notAuthorizedAction: {
      status: 'not-authorized',
      message: 'You are not permitted to perform this operation',
    },

    missingAuthHeaders: {
      status: 'client-error',
      message: 'The request did not contain a valid authentication token',
    },

    missingRequestBody: {
      status: 'client-error',
      message: 'The request did not contain a body',
    },

    // 404
    authNotFound: {
      status: 'not-found',
      title: 'Login not found',
      message: 'User - password combination not found. Please try again or sign up',
    },

    itemNotFound: {
      status: 'not-found',
      message: 'This item cannot be found',
    },
  },

  // HTTP 50X
  serverError: {
    internalError: {
      status: 'internal-server-error',
      message: 'An unexpected error has occured, please try again later',
    },
  },
};
