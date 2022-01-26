import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from '.'
import { BalanceInfo, IconTextButton } from '../components'
import { COLORS, icons, SIZES, styles } from '../constants'
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

  const totalAmount = React.useMemo(
    () => markets.reduce((a, b) => a + (b.total ?? 0), 0),
    [markets]
  )
  const valueChange = React.useMemo(
    () =>
      markets.reduce(
        (a, b) => a + (b.price_change_percentage_7d_in_currency ?? 0),
        0
      ),
    [markets]
  )
  const perChange = React.useMemo(
    () => (valueChange / (totalAmount - valueChange)) * 100,
    [valueChange, totalAmount]
  )
  // console.log('PRINT IN %s=====>', 'Home START ***', perChange);
  const renderWalletInfo = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.base,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance */}
        <BalanceInfo
          title={'Your Wallet'}
          displayAmount={totalAmount}
          changePtc={perChange}
          containerStyle={{
            marginTop: 50,
          }}
        />
        {/* Buttons */}
        <View
          style={[
            styles.row,
            {
              paddingHorizontal: SIZES.radius,
              marginBottom: -15,
              marginTop: 30,
            },
          ]}
        >
          <IconTextButton
            label={'Transfer'}
            icon={icons.send}
            containerStyle={{
              marginRight: SIZES.radius,
              flex: 1,
              height: 40,
            }}
            onPress={() => {
              console.log('Transfer')
            }}
          />

          <IconTextButton
            label={'Withdraw'}
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => {
              console.log('Withdraw')
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <MainLayout>
      <View style={[styles.containerBlack]}>
        <Text>{isLoading ? 'loading....' : 'done'}</Text>
        {/* Header wallet info */}
        {renderWalletInfo()}
        {/* Chart */}

        {/* Top cryptocurrency */}
      </View>
    </MainLayout>
  )
}

export default Home
