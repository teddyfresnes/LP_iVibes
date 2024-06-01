import React, { useEffect, useRef } from 'react';
import { Animated, Image, View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LikedMusicScreen from '../screens/LikedMusicScreen';
import DislikedMusicScreen from '../screens/DislikedMusicScreen';

const Stack = createStackNavigator();

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
    card: '#000',
    text: '#fff',
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={MyDarkTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerTitle: props => <LogoTitle {...props} />, 
          }} 
        />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Mes favoris' }} />
        <Stack.Screen name="LikedMusic" component={LikedMusicScreen} options={{ title: 'Musiques aimées' }} />
        <Stack.Screen name="DislikedMusic" component={DislikedMusicScreen} options={{ title: 'Musiques pas aimées' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LogoTitle = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(sloganOpacity, {
        toValue: 1,
        duration: 3456,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, sloganOpacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { opacity: logoOpacity }]}
        source={require('../assets/logo.png')}
        resizeMode='contain'
      />
      <Animated.Image
        style={[styles.slogan, { opacity: sloganOpacity }]}
        source={require('../assets/slogan.png')}
        resizeMode='contain'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
  logo: {
    width: 100,
    height: 40,
  },
  slogan: {
    width: 100,
    height: 40,
  },
});

export default AppNavigator;
