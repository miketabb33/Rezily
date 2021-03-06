export default class ExponentialBackoff {
  private timeoutTimeInMS = 2000
  private timeoutCoefficient = 2
  private requestAttempts = 1

  getCurrentTimeout = () => {
    const multiplier = this.timeoutCoefficient * this.requestAttempts
    return this.timeoutTimeInMS * multiplier
  }

  registerAttempt = () => {
    this.requestAttempts += 1
    if(this.requestAttempts > 12) {
      console.warn("Request attempts have exceeding the tolerance threshold - current request attempt: ", this.requestAttempts)
    }
  }

  resetAttempts = () => {
    this.requestAttempts = 1
  }
}