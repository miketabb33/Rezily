import ExponentialBackoff from "./exponentialBackoff"

describe('Exponential Backoff', () => {
  var subject: ExponentialBackoff

  beforeEach(() => {
    subject = new ExponentialBackoff()
  })

  it('should get timeout and increase timeout on attempts', () => {
    const initialTimeout = subject.getCurrentTimeout()
    expect(initialTimeout).toEqual(1040)

    subject.registerAttempt()

    const timeout1 = subject.getCurrentTimeout()
    expect(timeout1).toBeCloseTo(2080, 0.1)

    subject.registerAttempt()

    const timeout2 = subject.getCurrentTimeout()
    expect(timeout2).toBeCloseTo(3120, 0.1)

    subject.registerAttempt()

    const timeout3 = subject.getCurrentTimeout()
    expect(timeout3).toBeCloseTo(4160, 0.1)

    subject.registerAttempt()

    const timeout4 = subject.getCurrentTimeout()
    expect(timeout4).toBeCloseTo(5200, 0.1)

    subject.registerAttempt()

    const timeout5 = subject.getCurrentTimeout()
    expect(timeout5).toBeCloseTo(6240, 0.1)

    subject.registerAttempt()

    const timeout6 = subject.getCurrentTimeout()
    expect(timeout6).toBeCloseTo(7280, 0.1)

    subject.resetAttempts()

    const resetedTimeout = subject.getCurrentTimeout()
    expect(resetedTimeout).toEqual(1040) 
  })
})