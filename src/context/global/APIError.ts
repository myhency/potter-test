class APIError extends Error {
  static readonly INVALID_PARAMS = new APIError(400, 'Invalid params')
  static readonly SAMPLE_ERROR = new APIError(
    400,
    'This is a sample error message'
  )
  static readonly INVALID_EMAIL_ERROR = new APIError(
    400,
    'Invalid email. Please check your email and try again.'
  )
  static readonly EMAIL_REGEX_ERROR = new APIError(
    400,
    'Email regex is not correct.'
  )

  static readonly DUPLICATE_EMAIL = new APIError(409, 'Duplicate email')
  static readonly ARTIST_NOT_FOUND = new APIError(
    404,
    'No matching artist found.'
  )
  static readonly USER_NOT_FOUND = new APIError(404, 'No matching user found.')
  static readonly PLAN_NOT_FOUND = new APIError(404, 'No matching plan found.')
  static readonly PAYMENT_NOT_FOUND = new APIError(
    404,
    'No matching payment found.'
  )
  static readonly CLASS_NOT_FOUND = new APIError(
    404,
    'No matching class found.'
  )
  static readonly PRODUCT_NOT_FOUND = new APIError(
    404,
    'No matching product found.'
  )
  static readonly ORDER_NOT_FOUND = new APIError(
    404,
    'No matching order found.'
  )
  static readonly SETTLEMENT_NOT_FOUND = new APIError(
    404,
    'No matching settlement found.'
  )
  static readonly ORDER_IS_NOT_YOURS = new APIError(
    403,
    'This order is not yours'
  )
  static readonly VOOUCHER_CANNOT_BE_REFUNDED = new APIError(
    403,
    'Voucher cannot be refunded'
  )
  static readonly COUPON_CODE_NOT_FOUND = new APIError(
    404,
    'No matching coupon found.'
  )
  static readonly COUPON_CODE_WAS_EXPIRED = new APIError(
    403,
    'This code was expired'
  )
  static readonly COUPON_CODE_IS_NOT_YOURES = new APIError(
    403,
    'This code is not yours'
  )
  static readonly COUPON_CODE_WAS_EXCEEDED = new APIError(
    403,
    'This code was exceeded limit'
  )
  static readonly COUPON_CODE_CANNOT_BE_APPLIED = new APIError(
    403,
    'This code cannot be applied to this product'
  )
  static readonly COUPON_CODE_ALREADY_REGISTRED = new APIError(
    403,
    'This code already is registered'
  )
  static readonly INVALID_OTP = new APIError(
    400,
    'Invalid OTP. Please check your code and try again.'
  )
  static readonly INVALID_PASSWORD = new APIError(
    400,
    'Invalid Password. Please check your password and try again.'
  )

  static readonly PAYMENT_FAILED = new APIError(401, 'Payment failed')
  static readonly REFUND_FAILED = new APIError(401, 'Refund failed')
  static readonly IAMPORT_TRANSACTION_NOT_FOUND = new APIError(
    404,
    'No matching transaction found(IAMPORT).'
  )

  static readonly IAMPORT_TRANSACTION_NOT_PAID = new APIError(
    403,
    'Transaction was not paid(IAMPORT).'
  )

  static readonly INVALID_AUTHENTICATION = new APIError(
    401,
    'Authentication is invalid'
  )

  static readonly MISSING_REQUIRED_FIELDS = new APIError(
    400,
    'Required fields are missing'
  )

  static readonly WRONG_PASSWORD = new APIError(403, 'Password is wrong')

  static readonly UNAUTHORIZED = new APIError(403, 'Unauthorized')

  static readonly EVENT_NOT_FOUND = new APIError(
    404,
    'No matching event found.'
  )

  static readonly EVENT_WAS_EXPIRED = new APIError(
    403,
    'This event was expired'
  )
  static readonly EXPIRED_TOKEN = new APIError(419, 'expired token')
  static readonly INVALID_TPKEN = new APIError(401, 'invalid token')

  public readonly code: number
  public readonly error: string

  constructor(code: number, message?: string, error?: Error | string) {
    super(message)
    this.code = code
    this.error = error instanceof Error ? error.toString() : error
  }

  throw(code?: number, error?: string) {
    const newCode = code | this.code
    const newError = error || this.error
    const e = new APIError(newCode, this.message, newError)
    throw e
  }

  cause(error: Error | string) {
    return new APIError(this.code, this.message, error)
  }
}
// @ts-ignore
global.APIError = APIError
