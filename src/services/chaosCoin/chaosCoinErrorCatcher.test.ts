import { CONNECTION_ABORTED_ERROR, FORMAT_ERROR } from "../../constants"
import { isFormatError, isServerError, isTimeout } from "./chaosCoinErrorCatcher"

describe('Chaos Coin Error Catcher', () => {
  describe('Is Server Error', () => {
    it('should return false when status is below 500', () => {
      const error = { response: { status: 499 } }
      const result = isServerError(error)
      expect(result).toBeFalsy()
    })

    it('should return false when status is 600 or above', () => {
      const error = { response: { status: 600 } }
      const result = isServerError(error)
      expect(result).toBeFalsy()
    })

    it('should return true when status is between 500-599', () => {
      const error = { response: { status: 550 } }
      const result = isServerError(error)
      expect(result).toBeTruthy()
    })
  })

  describe('Is Timeout', () => {
    it('should return true when code is timeout error', () => {
      const error = { code: CONNECTION_ABORTED_ERROR }
      const result = isTimeout(error)
      expect(result).toBeTruthy()
    })

    it('should return false when code is NOT timeout error', () => {
      const error = { code: "OTHERERROR" }
      const result = isTimeout(error)
      expect(result).toBeFalsy()
    })
  })

  describe('Is Format Error', () => {
    it('should return true when code is formate error', () => {
      const error = { code: FORMAT_ERROR }
      const result = isFormatError(error)
      expect(result).toBeTruthy()
    })

    it('should return false when code is NOT formate error', () => {
      const error = { code: "OTHERERROR" }
      const result = isFormatError(error)
      expect(result).toBeFalsy()
    })
  })
})
