import { HEROES } from '../heroes/mock-heroes'

export class HttpClient {
  get<T extends any>(endpoint: string): Promise<T> {
    console.log(`HttpClient#get called with ${endpoint}`)
    return delay(500).then(() => mapEndpointToStore(endpoint))
  }
  post<T extends any>(endpoint: string, data: T): Promise<T> {
    return delay(500).then(() => ({} as T))
  }
}

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
const mapEndpointToStore = (key: string) => {
  const keys = Object.keys(store)
  const hasId = key.match(/(\d+)$/)
  const storeKey = keys.find((storeKey) => key.startsWith(storeKey))
  if (!storeKey) {
    throw new Error(`${key} not found in store!`)
  }

  const storeValue = store[storeKey]

  if (hasId) {
    console.log('HAS ID', hasId)
    const detailValue = storeValue.find((value) => value.id === Number(hasId[0]))
    return { ...detailValue }
  }

  return storeValue
}

const store: { [key: string]: any[] } = {
  heroes: HEROES,
}
