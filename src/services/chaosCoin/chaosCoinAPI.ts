import axios, { AxiosInstance } from "axios";
import { CHAOS_COIN_BASE_URL } from "../../constants";

export default class ChaosCoinAPI {
  clientInstance: AxiosInstance
  private clientConfig = {
    baseURL: CHAOS_COIN_BASE_URL
  }

  constructor() {
    this.clientInstance = axios.create(this.clientConfig)
  }

  callRegister(userName: string) {
    return this.clientInstance.post(`/register?userName=${userName}`)
  }

  callExcavate() {
    return this.clientInstance.post(`/excavate`)
  }
  
  callStore(userId: string, bucketId: string) {
    return this.clientInstance.post(`/store?userId=${userId}&bucketId=${bucketId}`)
  }

  callTotals(userId: string) {
    return this.clientInstance.get(`/totals?userId=${userId}`)
  }
} 
