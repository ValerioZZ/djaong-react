import forOwn from 'lodash/forOwn'


export const getErrorMessage = (payload) => {
  let { status } = payload
  let message = ''

  if (status === 401 || status === 403) {
    // Invalid authentication credentials
    try {
      message = payload.data.data[0]
    } catch (err) {
      message = 'Unauthorized.'
    }
  } else if (status === 400) {
    // Bad request
    try {
      message = payload.data.message
    } catch (err) {
      try {
        const errors = []

        forOwn(payload.data.data, (value, key) => {
          errors.push(`"${key}": ${value}`)
        })
        message = errors.join(', ')
      } catch (err) {
        message = 'Bad request.'
      }
    }
  } else if (status >= 500) {
    // Server side error
    try {
      message = payload.data.data
    } catch (err) {
      message = 'A server error occurred while sending your data!'
    }
  } else if (status === 404) {
    // User content error
    message = 'No record found for this user.'
  } else {
    status = 'Connection Error'
    message = 'An error occurred while sending your data!'
  }

  return { status, message }
}
