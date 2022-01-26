import * as React from 'react'
import { View, Image, Text } from 'react-native'
import { COLORS, FONTS, icons, iconSize, SIZES, styles } from '../constants'

const BalanceInfo = ({ title, displayAmount, changePtc, containerStyle }) => {
  return (
    <View style={{ ...containerStyle }}>
      <Text style={{ color: COLORS.lightGray, ...FONTS.h3 }}>{title}</Text>
      {/* Figures */}
      <View style={styles.rowEnd}>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>$</Text>
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h2 }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>{'USD'}</Text>
      </View>
      {/* Change Percentage */}
      <View style={styles.rowEnd}>
        {changePtc != 0 && (
          <Image
            source={icons.upArrow}
            resizeMode='contain'
            style={{
              alignSelf: 'center',
              tintColor: changePtc > 0 ? COLORS.lightGreen : COLORS.red,
              transform: [{ rotate: changePtc > 0 ? '45deg' : '125deg' }],
              ...iconSize(10),
            }}
          />
        )}
        <Text
          style={{
            alignSelf: 'flex-end',
            marginLeft: SIZES.base,
            color:
              changePtc == 0
                ? COLORS.lightGray3
                : changePtc > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}
        >
          {changePtc.toFixed(2)} %
        </Text>
        <Text
          style={{
            alignSelf: 'flex-end',
            marginLeft: SIZES.radius,
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  )
}

export default BalanceInfo
