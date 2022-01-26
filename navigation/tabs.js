import React from "react";
import {
  Touchable,
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home, Portfolio, Market, Profile } from "../screens"
import { COLORS, icons, iconSize, styles } from "../constants"
import { TabIcon } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTab } from "../store/tabSlice";
const Tab = createBottomTabNavigator()
const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.center]}
      onPress={onPress}
      >
      {children}
      </TouchableOpacity>
  )
}
const Tabs = () => {
  const dispatch = useDispatch()
  const {isVisible} = useSelector(({tab }) => ({
    isVisible: tab.isTradModeVisible
  }));
  const handleTradTab = () => {
    dispatch(toggleTab(!isVisible))
  }
    return (
        <Tab.Navigator
            tabBarOptions={{
              showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
            initialRouteName="Portfolio"
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => {
                    return !isVisible && (
                      <TabIcon
                        focused={focused}
                        icon={icons.home}
                        label="Home"
                      />
                    )
                  }
                }}
                listeners={{
                  tabPress: e => {e.preventDefault()}
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                  tabBarIcon: ({focused}) => {
                    return !isVisible && (
                      <TabIcon
                        focused={focused}
                        icon={icons.briefcase}
                        label="Portfolio"
                      />
                    )
                  }
                }}
                listeners={{
                  tabPress: e => {e.preventDefault()}
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => {
                    return (
                      <TabIcon
                        focused={focused}
                        icon={isVisible ? icons.close : icons.trade}
                        iconStyle={isVisible ? {...iconSize(15), marginVertical: 5} : null}
                        label="Trade"
                        isTrade={true}
                      />
                    )
                  },
                  tabBarButton: (props) => (
                    <TabBarCustomButton
                      {...props}
                      onPress={() => handleTradTab()}
                    /> 
                  )
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                  tabBarIcon: ({focused}) => {
                    return !isVisible && (
                      <TabIcon
                        focused={focused}
                        icon={icons.market}
                        label="Market"
                      />
                    )
                  }
                }}
                listeners={{
                  tabPress: e => {e.preventDefault()}
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({focused}) => {
                    return !isVisible && (
                      <TabIcon
                        focused={focused}
                        icon={icons.profile}
                        label="Profile"
                      />
                    )
                  }
                }}
                listeners={{
                  tabPress: e => {e.preventDefault()}
                }} 
            />
        </Tab.Navigator>
    )
}

export default Tabs;