export default class ExponentialBackoff {
  private timeoutTimeInMS = 800
  private timeoutCoefficient = 1.3
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