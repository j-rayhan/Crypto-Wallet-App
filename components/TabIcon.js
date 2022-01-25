import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { COLORS, styles, iconSize, FONTS } from '../constants'

const TabIcon = ({ focused, icon, label, isTrade, iconStyle }) => {
  if (isTrade) {
    return (
      <View
        style={[
          styles.center,
          {
            ...iconSize(60),
            borderRadius: 30,
            backgroundColor: COLORS.black,
          },
        ]}
      >
        <Image
          source={icon}
          resizeMode='contain'
          style={{
            tintColor: COLORS.white,
            ...iconSize(25),
            ...iconStyle,
          }}
        />
        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{label}</Text>
      </View>
    )
  }
  return (
    <View style={styles.center}>
      <Image
        source={icon}
        resizeMode='contain'
        style={{
          tintColor: focused ? COLORS.white : COLORS.secondary,
          ...iconSize(25),
          ...iconStyle,
        }}
      />
      <Text
        style={{
          color: focused ? COLORS.white : COLORS.secondary,
          ...FONTS.h4,
        }}
      >
        {label}
      </Text>
    </View>
  )
}

export default TabIcon
