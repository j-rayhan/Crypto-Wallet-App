import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { COLORS, FONTS, styles } from '../constants';

const TextButton = ({label, containerStyle, onPress}) => {
   return (
       <TouchableOpacity
        style={{
          paddingVertical: 3,
          paddingHorizontal: 18,
          borderRadius: 15,
          backgroundColor: COLORS.gray1,
          ...styles.center,
          ...containerStyle,
        }}
        onPress={onPress}
       >
           <Text style={{color: COLORS.white, ...FONTS.h3}}>
             {label}
           </Text>
       </TouchableOpacity>
   );
};

export default TextButton;