 import * as React from 'react';
 import {View} from 'react-native';
import { styles } from '../constants';
 
 const MainLayout = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
 };
 
 export default MainLayout;