import * as React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import {
  ChartPath,
  ChartDot,
  ChartYLabel,
  ChartXLabel,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts'
import { COLORS, FONTS, iconSize, SIZES, styles } from '../constants'

const Chart = ({ containerStyle, chartPrices }) => {
  let startUnixTimeStamp = moment().subtract(7, 'day').unix()
  let data = React.useMemo(
    () =>
      chartPrices?.map((item, index) => ({
        x: startUnixTimeStamp + (index + 1) * 3600,
        y: item,
      })) ?? [],
    [chartPrices]
  )
  let points = monotoneCubicInterpolation({ data, range: 40 })
  let formatUSD = (value) => {
    'worklet'
    if (value == '') {
      return ''
    }
    return `$${Number(value).toFixed(2)}`
  }
  let formatDateTime = (value) => {
    'worklet'
    if (value == '') {
      return ''
    }
    let selectedDate = new Date(value * 1000)
    let date = `0${selectedDate.getDate()}`.slice(-2)
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2)
    return `${date} / ${month}`
  }
  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`
    } else {
      return `${value.toFixed(roundingPoint)}`
    }
  }
  const getYAxisLabelValues = React.useMemo(() => {
    if (chartPrices) {
      const minValue = Math.min(...chartPrices)
      const maxValue = Math.max(...chartPrices)
      const midValue = (minValue + maxValue) / 2
      const higherMidValue = (midValue + maxValue) / 2
      const lowerMidValue = (minValue + midValue) / 2
      const roundingPoint = 2
      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ]
    }
    return []
  }, [chartPrices])
  return (
    <View style={{ ...containerStyle }}>
      {/* Y Axis Label */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}
      >
        {getYAxisLabelValues.map((item, index) => (
          <Text
            key={`y_axis_level_${index}`}
            style={{
              color: COLORS.lightGray3,
              ...FONTS.body3,
            }}
          >
            {item}
          </Text>
        ))}
      </View>
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier',
          }}
        >
          <ChartPath
            width={SIZES.width}
            height={150}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 100,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}
            >
              {/* Dot */}
              <View
                style={[
                  styles.center,
                  {
                    borderRadius: 15,
                    backgroundColor: COLORS.white,
                    ...iconSize(25),
                  },
                ]}
              >
                <View
                  style={{
                    ...iconSize(15),
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                />
              </View>
              {/* Y-Label */}
              <ChartYLabel
                format={formatUSD}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              />
              {/* X-Label */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: COLORS.white,
                  ...FONTS.body5,
                  lineHight: 15,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  )
}

export default Chart
