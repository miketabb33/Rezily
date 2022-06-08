import axios, { AxiosInstance } from "axios";
import { CHAOS_COIN_BASE_URL } from "../constants";

export default class ChaosCoinAPI {
  clientInstance: AxiosInstance
  private clientConfig = {
    baseURL: CHAOS_COIN_BASE_URL
  }

  constructor() {
    this.clientInstance = axios.create(this.clientConfig)
  }

  callRegister(userName: string, timeout: number) {
    return this.clientInstance.post(`/register?userName=${userName}`, {}, {timeout})
  }

  callExcavate(timeout: number) {
    return this.clientInstance.post(`/excavate`, {}, {timeout})
  }
  
  callStore(userId: string, bucketId: string, timeout: number) {
    return this.clientInstance.post(`/store?userId=${userId}&bucketId=${bucketId}`, {}, {timeout})
  }

  callTotals(userId: string, timeout: number) {
    return this.clientInstance.get(`/totals?userId=${userId}`, {timeout})
  }
} 
