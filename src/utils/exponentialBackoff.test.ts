import ExponentialBackoff from "./exponentialBackoff"

describe('Exponential Backoff', () => {
  var subject: ExponentialBackoff

  beforeEach(() => {
    subject = new ExponentialBackoff()
  })

  it('should get timeout and increase timeout on attempts', () => {
    const initialTimeout = subject.getCurrentTimeout()
    expect(initialTimeout).toEqual(4000)

    subject.registerAttempt()

    const timeout1 = subject.getCurrentTimeout()
    expect(timeout1).toBeCloseTo(8000, 0.1)

    subject.registerAttempt()

    const timeout2 = subject.getCurrentTimeout()
    expect(timeout2).toBeCloseTo(12000, 0.1)

    subject.registerAttempt()

    const timeout3 = subject.getCurrentTimeout()
    expect(timeout3).toBeCloseTo(16000, 0.1)

    subject.registerAttempt()

    const timeout4 = subject.getCurrentTimeout()
    expect(timeout4).toBeCloseTo(20000, 0.1)

    subject.registerAttempt()

    const timeout5 = subject.getCurrentTimeout()
    expect(timeout5).toBeCloseTo(24000, 0.1)

    subject.registerAttempt()

    const timeout6 = subject.getCurrentTimeout()
    expect(timeout6).toBeCloseTo(28000, 0.1)

    subject.resetAttempts()

    const resetedTimeout = subject.getCurrentTimeout()
    expect(resetedTimeout).toEqual(4000) 
  })
})