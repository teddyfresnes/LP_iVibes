import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchResultItem = ({ item, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteList.some(favItem => favItem.trackId === item.trackId));
    } catch (error) {
      console.error('Failed to load favorite', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoriteList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoriteList = favoriteList.filter(favItem => favItem.trackId !== item.trackId);
      } else {
        favoriteList.push(item);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
  };

  //console.log('Item Properties:', item);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.trackName}>{item.trackName}</Text>
        <Text style={styles.artistName}>{item.artistName}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? "#ff0000" : "#fff"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#aaa',
    fontSize: 14,
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResultItem;
