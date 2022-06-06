import ChaosCoinClient from "./services/chaosCoinClient"

describe('test', () => {

  const chaosCoinClient = new ChaosCoinClient()

  it('default', () => {
    expect(true).toBeTruthy()
  })

  // it('should', (done) => {
  //   chaosCoinClient.store("", "")
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err.response.data.error)
  //     })
  //     .finally(() => {
  //       done()
  //     })
  // })
})