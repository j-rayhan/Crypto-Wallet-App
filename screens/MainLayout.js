 import * as React from 'react';
 import {Animated, View} from 'react-native';
import { useSelector } from 'react-redux';
import { IconTextButton } from '../components';
import { COLORS, icons, SIZES, styles } from '../constants';
 
 const MainLayout = ({children}) => {
   const {isVisible} = useSelector(({tab}) => ({
    isVisible: tab.isTradModeVisible
   }))
   const modelAnimatedValue = React.useRef(new Animated.Value(0)).current;
   React.useEffect(() => {
     if (isVisible) {
       Animated.timing(modelAnimatedValue, {
         toValue: 1,
         duration: 500,
         useNativeDriver: false,
       }).start(); 
     } else {
      Animated.timing(modelAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(); 
    }
   }, [isVisible])

   const modelY = modelAnimatedValue.interpolate({
     inputRange: [0, 1],
     outputRange: [SIZES.height, SIZES.height - 280]
   })
    return (
        <View style={styles.container}>
            {children}
            {/* Modal */}
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: modelY,
                width: '100%',
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
              }}
            >
              <IconTextButton
                label={'Transfer'}
                icon={icons.send}
                onPress={() => console.log('Transfer')}
              />
              <IconTextButton
                label={'Withdraw'}
                icon={icons.withdraw}
                containerStyle={{
                  marginTop: SIZES.base,
                }}
                onPress={() => console.log('Withdraw')}
              />
            </Animated.View>
        </View>
    );
 };
 
 export default MainLayout;