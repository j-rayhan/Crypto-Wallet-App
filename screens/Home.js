import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MainLayout } from '.'
import { BalanceInfo, Chart, IconTextButton } from '../components'
import { COLORS, FONTS, icons, iconSize, SIZES, styles } from '../constants'
import { getCoinHoldings, getHoldings } from '../store/marketActions'

const Home = () => {
  const dispatch = useDispatch()
  const [selectedCoin, setSelectedCoin] = React.useState(null)
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
  const renderCoins = ({ item, index }) => {
    const {
      name,
      image,
      current_price,
      price_change_percentage_7d_in_currency,
    } = item ?? {}
    const priceColor =
      price_change_percentage_7d_in_currency == 0
        ? COLORS.lightGray3
        : price_change_percentage_7d_in_currency > 0
        ? COLORS.lightGreen
        : COLORS.red

    return (
      <TouchableOpacity
        style={[
          styles.container,
          styles.rowCenter,
          styles.center,
          {
            height: 55,
          },
        ]}
        onPress={() => setSelectedCoin(item)}
      >
        {/* Logo */}
        <View style={{ width: 30 }}>
          <Image
            source={{ uri: image }}
            style={{
              ...iconSize(20),
            }}
          />
        </View>
        {/* Name */}
        <View style={styles.container}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {name}
          </Text>
        </View>
        {/* Figures */}
        <View>
          <Text
            style={{
              textAlign: 'right',
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            $ {current_price}
          </Text>
          <View
            style={[styles.rowCenter,{
              justifyContent: 'flex-end'
            }]}
          >
            {price_change_percentage_7d_in_currency != 0 && (
              <Image
                source={icons.upArrow}
                style={{
                  ...iconSize(10),
                  tintColor: priceColor,
                  transform: [
                    {
                      rotate:
                        price_change_percentage_7d_in_currency > 0
                          ? '45deg'
                          : '125deg',
                    },
                  ],
                }}
              />
            )}
            <Text
              style={{
                color: priceColor,
                marginLeft: 5,
                ...FONTS.body5,
                lineHeight: 15,
              }}
              >
                {price_change_percentage_7d_in_currency.toFixed(2)} %
              </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <MainLayout>
      <View style={[styles.containerBlack]}>
        <Text>{isLoading ? 'loading....' : 'done'}</Text>
        {/* Header wallet info */}
        {renderWalletInfo()}
        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
        />
        {/* Top cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={(item) => `coin_${item.id}`}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}
              >
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={renderCoins}
          ListFooterComponent={
            <View style={{marginBottom: SIZES.padding * 2}} />
          }
        />
      </View>
    </MainLayout>
  )
}

export default Home
