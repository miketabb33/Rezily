import { MinedGold } from "../models/minedGold";
import { User } from "../models/user";
import { GoldTotal } from "../models/goldTotal"
import { FORMAT_ERROR } from "../constants";
import { NetworkResponse } from "../models/networkResponse";
import { flatStringify } from "../utils/parser";

export const formatRegisterResponse = (response: NetworkResponse) => {
  try {
    const userId: string = unpackProperty(response.data.user, "user id", response)
    const userName: string = unpackProperty(response.data.name, "user name", response)
    const user: User = { userId, userName }
    return user
  } catch(err) {
    throw err
  }
}

export const formatExcavateResponse = (response: NetworkResponse) => {
  try {
    const bucketId: string = unpackProperty(response.data.bucketId, "bucket id", response)
    const amount: number = unpackProperty(response.data.gold?.units, 'gold or units', response)
    const minedGold: MinedGold = { bucketId, amount}
    return minedGold
  } catch(err) {
    throw err
  }
}

export const formatStoreResponse = (response: NetworkResponse) => {
  try {
    const success: boolean = unpackProperty(response.data, 'store response', response)
    return success
  } catch(err) {
    throw err
  }
}

export const formatTotalResponse = (response: NetworkResponse) => {
  try {
    const userName: string = unpackProperty(response.data.userName, "username", response)
    const amount: number = unpackProperty(response.data.goldTotal, "gold total", response)
    const goldTotal: GoldTotal = { userName, amount }
    return goldTotal
  } catch(err) {
    throw err
  }
}

const unpackProperty = <T>(property: any, title: string, response: any): T => {
  if(property as T) {
    return property
  } else {
    throw {
      code: FORMAT_ERROR,
      title: `property unpack error - ${title}`,
      response: `${flatStringify(response)}`
    }
  }
}