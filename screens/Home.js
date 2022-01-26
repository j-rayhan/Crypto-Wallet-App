import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from '.'
import { styles } from '../constants'
import { getCoinHoldings, getHoldings } from '../store/marketActions'

const Home = () => {
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings())
      dispatch(getCoinHoldings())
    }, [dispatch])
  )
  const { isLoading, markets, coins } = useSelector(({ loading, market }) => ({
    isLoading: loading['MARKETS'] || loading['COINS'],
    markets: market['MARKETS'],
    coins: market['COINS'],
  }))
  // console.log('PRINT IN %s=====>', 'Home START ***', markets);
  return (
    <MainLayout>
      <View style={[styles.container, styles.center]}>
        <Text>Home</Text>
        <Text>{isLoading ? 'loading....' : 'done'}</Text>
      </View>
    </MainLayout>
  )
}

export default Home
