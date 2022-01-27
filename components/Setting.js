import * as React from 'react'
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import { COLORS, FONTS, icons, iconSize, SIZES, styles } from '../constants'

const Setting = ({ title, value, type, onPress }) => {
  if (type === 'button') {
    return (
      <TouchableOpacity
        style={[styles.rowCenter, { height: 50 }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.container,
            {
              color: COLORS.white,
              ...FONTS.h3,
            },
          ]}
        >
          {title}
        </Text>
        <View style={styles.rowCenter}>
          <Text
            style={[
              {
                marginRight: SIZES.radius,
                color: COLORS.lightGray3,
                ...FONTS.h4,
              },
            ]}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              ...iconSize(15),
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={[styles.rowCenter, { height: 50 }]}>
      <Text style={[styles.container, {color: COLORS.white, ...FONTS.h3}]}>{title}</Text>
      <Switch
        value={value}
        onValueChange={v => onPress(v)}
      />
    </View>
  )
}

export default Setting
