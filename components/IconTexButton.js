import * as React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, iconSize, SIZES, styles } from '../constants'

const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...styles.row,
        ...styles.center,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode='contain'
        style={{
          ...iconSize(20),
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default IconTextButton
