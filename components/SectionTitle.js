import * as React from 'react'
import { View, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const SectionTitle = ({ title }) => {
  return (
    <View style={{ marginTop: SIZES.radius }}>
      <Text
        style={{
          color: COLORS.lightGray3,
          textTransform: 'uppercase',
          ...FONTS.h4,
        }}
      >
        {title}
      </Text>
    </View>
  )
}

export default SectionTitle
