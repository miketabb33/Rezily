import { User } from "./models/user"
import ChaosCoinService from "./services/chaosCoin/chaosCoinService"

var user: User

const transactionCompletionCheckTime = 500
const chaosCoinService = new ChaosCoinService()

const registerMiner = async (userName: string) => {
  try {
    user = await chaosCoinService.register(userName)
    console.log("( *・∀・)ノ゛")
    console.log(`Welcome to Chaos Coin, ${userName}`)
    console.log("")
  } catch(err) {
    console.error("Register Error: ", err)
  }
}

const addGoldToBucket = async () => {
  try {
    const minedGold = await chaosCoinService.excavate()
    console.log('⛏️  Mined Coins: ', minedGold.amount)
    return minedGold.bucketId
  } catch(err) {
    console.error("Excavate Error: ", err)
  }
}

const storeBucketedGold = async (bucketId: string) => {
  try {
    await chaosCoinService.store(user.userId, bucketId)
    console.log('✅ Stored Mined Coins!')
  } catch(err) {
    console.error("Store Error: ", err)
  }
}

const revealGoldTotal = async () => {
  try {
    const goldTotal = await chaosCoinService.getTotal(user.userId)
    console.log("🏦 Total Coins: ", goldTotal.amount)
  } catch(err) {
    console.error("Gold Total Error: ", err)
  }
}

const mineAndStoreGoldOnce = async () => {
  const bucketId = await addGoldToBucket() ?? "failfast"
  await storeBucketedGold(bucketId)
  await revealGoldTotal()
  console.log("")
}

const mineAndStoreGoldForever = () => {
  var isReadyForCycle = true
  setInterval(async() => {
    if(isReadyForCycle) {
      isReadyForCycle = false
      await mineAndStoreGoldOnce()
      isReadyForCycle = true
    }
  }, transactionCompletionCheckTime)
}

const run = async () => {
  await registerMiner("Michael")
  mineAndStoreGoldForever()
}

run()
