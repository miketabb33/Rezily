import ChaosCoinAPI from "./services/chaosCoin/chaosCoinAPI"

describe('test', () => {

  const chaosCoinClient = new ChaosCoinAPI()

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