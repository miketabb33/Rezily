import ChaosCoinService from "./services/chaosCoin/chaosCoinService"

const transactionCompletionCheckTime = 500
const chaosCoinService = new ChaosCoinService()

const performTransactionCycle = async () => {
  try {
    const minedGold = await chaosCoinService.excavate()
    console.log('Mined Gold: ', minedGold)
  } catch(err) {
    console.error("Excavate Error: ", err)
  }
}

const triggerTransactionLoop = () => {
  var isReadyForCycle = true
  setInterval(() => {
    if(isReadyForCycle) {
      isReadyForCycle = false
      performTransactionCycle()
        .finally(() => {
          isReadyForCycle = true
        })
    }
  }, transactionCompletionCheckTime)
}

const run = () => {
  triggerTransactionLoop()
}

run()
