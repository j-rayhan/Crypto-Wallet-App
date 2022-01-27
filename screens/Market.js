import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { LineChart } from 'react-native-chart-kit'
import { MainLayout } from '.'
import { HeaderBar, TextButton } from '../components'
import {
  COLORS,
  constants,
  FONTS,
  icons,
  iconSize,
  SIZES,
  styles,
} from '../constants'
import { getCoinHoldings } from '../store/marketActions'
const marketTabs = constants.marketTabs.map((item) => ({
  ...item,
  ref: React.createRef(),
}))
const Tabs = () => {
  return (
    <View style={styles.row}>
      {marketTabs.map((tab, index) => (
        <TouchableOpacity
          key={`market_tab_${index}`}
          style={styles.container}
          // onPress={}
        >
          <View
            ref={tab.ref}
            style={[
              styles.center,
              {
                paddingHorizontal: 15,
                height: 40,
                backgroundColor: index == 0 ? COLORS.lightGray : null,
                borderRadius: SIZES.radius,
              },
            ]}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {tab.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
const Market = () => {
  const dispatch = useDispatch()
  const [selectedCoin, setSelectedCoin] = React.useState(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCoinHoldings())
    }, [dispatch])
  )
  const { isLoading, coins } = useSelector(({ loading, market }) => ({
    isLoading: loading['COINS'],
    coins: market['COINS'],
  }))
  const renderTabs = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs />
      </View>
    )
  }
  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label={'USD'} />
        <TextButton
          label={'% (7d)'}
          containerStyle={{ marginLeft: SIZES.base }}
        />
        <TextButton label={'Top'} containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    )
  }
  const renderList = () => {
    return (
      <Animated.FlatList
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `tab_${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.container, { width: SIZES.width }]}>
              <FlatList
                data={coins}
                keyExtractor={(item) => `coin_${item.id}`}
                renderItem={({ item, index }) => {
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
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* Coin */}
                      <View style={[styles.rowCenter, { flex: 1.5 }]}>
                        <Image
                          source={{ uri: image }}
                          style={{
                            ...iconSize(20),
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {name}
                        </Text>
                      </View>
                      {/* Line Chart */}
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <LineChart
                          data={{
                            datasets: [{ data: item.sparkline_in_7d?.price }],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                          withDots={false}
                          withVerticalLines={false}
                          withHorizontalLabels={false}
                          withVerticalLines={false}
                          withInnerLines={false}
                          withOuterLines={false}
                        />
                      </View>
                      {/* Figures */}
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}
                      >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          $ {current_price.toLocaleString()}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
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
                            {price_change_percentage_7d_in_currency.toFixed(2)}{' '}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </View>
          )
        }}
      />
    )
  }
  return (
    <MainLayout>
      <View style={styles.containerBlack}>
        {/* Header */}
        <HeaderBar title={'Market'} />
        {/* Top bar */}
        {renderTabs()}
        {/* Buttons */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  )
}

export default Market
