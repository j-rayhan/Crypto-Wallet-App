import { holdings } from '../constants/dummy'
import { MarketService } from '../services'
import { getHoldingFailure, getHoldingSuccess } from './marketSlice'
import { setLoading } from './loadingSlice'
const query = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
  price_change_percentage: '7d',
  sparkline: true,
}
export const getHoldings = (payload) => async (dispatch) => {
  const loadingObj = {
    key: 'MARKETS',
    value: true,
  }
  try {
    dispatch(setLoading(loadingObj))
    const ids = holdings?.map((item) => item.id).join(',')
    const res = await MarketService.find({ ...query, ids })
    if (res?.length > 0) {
      let myHoldings = res?.map((item) => {
        const {
          id,
          name,
          symbol,
          image,
          current_price,
          price_change_percentage_7d_in_currency,
          sparkline_in_7d,
        } = item
        // console.log('PRINT IN %s=====>', 'MarketActions res ***', item);
        // Return our current holding and current quantity
        let coin = holdings?.find((a) => a.id == item.id)
        // price from 7 days ago
        let price7d =
          current_price / (1 + price_change_percentage_7d_in_currency * 0.01)
        return {
          id,
          name,
          symbol,
          image,
          current_price,
          qty: coin.qty,
          total: coin.qty * current_price,
          price_change_percentage_7d_in_currency,
          holding_value_change_7d: (current_price - price7d) * coin.qty,
          sparkline_in_7d: {
            value: sparkline_in_7d.price.map((v) => v * coin.qty),
          },
        }
      })
      // console.log('PRINT IN %s=====>', 'MarketActions START ***', myHoldings);
      dispatch(
        getHoldingSuccess({
          data: myHoldings,
          key: 'MARKETS',
        })
      )
    } else dispatch(getHoldingFailure(res.data))
    // if (typeof res === 'object' && !Array.isArray(res)) {
    //   dispatch(pagePaginationSuccess({
    //     data: res,
    //     key,
    //   }))
    // }
  } catch (e) {
    console.error('PRINT IN %s=====>', 'Pagination fetch', e)
    dispatch(getHoldingFailure(e))
  } finally {
    loadingObj.value = false
    dispatch(setLoading(loadingObj))
  }
}

export const getCoinHoldings = (payload) => async (dispatch) => {
  const loadingObj = {
    key: 'COINS',
    value: true,
  }
  try {
    dispatch(setLoading(loadingObj))
    const res = await MarketService.find({ ...query })
    if (res?.length > 0) {
      dispatch(
        getHoldingSuccess({
          data: res,
          key: 'COINS',
        })
      )
    } else dispatch(getHoldingFailure(res.data))
  } catch (e) {
    console.error('PRINT IN %s=====>', 'Pagination fetch', e)
    dispatch(getHoldingFailure(e))
  } finally {
    loadingObj.value = false
    dispatch(setLoading(loadingObj))
  }
}
