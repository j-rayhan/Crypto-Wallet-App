import { API } from './REST_API'
import ServiceX from './ServiceX'

const MarketService = new ServiceX(API.market)

export { MarketService }
