import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import FavoriteStack from 'cryptoTracker/src/components/favorites/FavoritesStack';

import Colors from 'cryptoTracker/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Tabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.blackPearl
          },
          tintColor: '#fefefe',
        }}
      >

        <Tabs.Screen 
          name="Coin"
          component={CoinsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <Icon 
                name='university'
                type='font-awesome'
                size={size}
                color={color}
              />
            )
            
          }}
        />

        <Tabs.Screen 
          name="Favorites"
          component={FavoriteStack}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <Icon 
                name='star'
                type='font-awesome'
                size={size}
                color={color}
              />
            )
            
          }}
        />

      </Tabs.Navigator>
   
    </NavigationContainer>
  );
};


export default App;
