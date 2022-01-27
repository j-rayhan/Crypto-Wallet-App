import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MainLayout } from '.'
import { BalanceInfo, Chart } from '../components'
import { COLORS, FONTS, icons, iconSize, SIZES, styles } from '../constants'
import { getHoldings } from '../store/marketActions'

const Portfolio = () => {
  const dispatch = useDispatch()
  const [selectedCoin, setSelectedCoin] = React.useState(null)
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings())
    }, [dispatch])
  )
  const { isLoading, markets } = useSelector(({ loading, market }) => ({
    isLoading: loading['MARKETS'],
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
  const renderCurrentBalance = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.base,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{ color: COLORS.white, marginTop: 50, ...FONTS.largeTitle }}
        >
          Portfolio
        </Text>
        {/* Balance */}
        <BalanceInfo
          title={'Current Balance'}
          displayAmount={totalAmount}
          changePtc={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    )
  }
  const renderCoins = ({ item }) => {
    const {
      name,
      image,
      current_price,
      total,
      qty,
      symbol,
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
          styles.row,
          {
            height: 55,
          },
        ]}
        onPress={() => setSelectedCoin(item)}
      >
        {/* Assets */}
        <View style={[styles.container, styles.rowCenter]}>
          <Image
            source={{ uri: image }}
            style={{
              ...iconSize(20),
            }}
          />
          <Text
            style={{
              marginLeft: 5,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {name}
          </Text>
        </View>
        {/* Price */}
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'right',
              ...FONTS.h4,
              lineHeight: 15,
            }}
          >
            $ {current_price.toLocaleString()}
          </Text>
          <View
            style={[
              styles.rowCenter,
              {
                justifyContent: 'flex-end',
              },
            ]}
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
        {/* Holdings */}
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Text
            style={{
              textAlign: 'right',
              color: COLORS.white,
              ...FONTS.h4,
              lineHeight: 15,
            }}
          >
            $ {total.toLocaleString()}
          </Text>
          <Text
            style={{
              textAlign: 'right',
              color: COLORS.lightGray3,
              ...FONTS.body5,
              lineHeight: 15,
            }}
          >
            {qty} {symbol.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <MainLayout>
      <View style={styles.containerBlack}>
        {/* Header Current balance */}
        {renderCurrentBalance()}
        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : markets[0]?.sparkline_in_7d?.value
          }
        />

        {/* Your assets */}
        <FlatList
          data={markets}
          keyExtractor={(item) => `market_${item.id}`}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}
              >
                Your Assets
              </Text>
              {/* Header label */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>Asset</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={renderCoins}
          ListFooterComponent={
            <View style={{ marginBottom: SIZES.padding * 2 }} />
          }
        />
      </View>
    </MainLayout>
  )
}

export default Portfolio
