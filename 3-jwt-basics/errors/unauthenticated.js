const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnauthenticadedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED // 401
  }
}

module.exports = UnauthenticadedError
