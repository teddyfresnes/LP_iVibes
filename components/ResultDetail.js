import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultDetail = ({ result }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
    checkLikedStatus();
    checkDislikedStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoriteList.some(item => item.trackId === result.trackId));
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const checkLikedStatus = async () => {
    try {
      const likedMusic = await AsyncStorage.getItem('likedMusic');
      const likedList = likedMusic ? JSON.parse(likedMusic) : [];
      setIsLiked(likedList.some(item => item.trackId === result.trackId));
    } catch (error) {
      console.error('Failed to load liked music', error);
    }
  };

  const checkDislikedStatus = async () => {
    try {
      const dislikedMusic = await AsyncStorage.getItem('dislikedMusic');
      const dislikedList = dislikedMusic ? JSON.parse(dislikedMusic) : [];
      setIsDisliked(dislikedList.some(item => item.trackId === result.trackId));
    } catch (error) {
      console.error('Failed to load disliked music', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoriteList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoriteList = favoriteList.filter(item => item.trackId !== result.trackId);
      } else {
        favoriteList.push(result);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to update favorites', error);
    }
  };

  const toggleLike = async () => {
    try {
      const likedMusic = await AsyncStorage.getItem('likedMusic');
      let likedList = likedMusic ? JSON.parse(likedMusic) : [];

      if (isLiked) {
        likedList = likedList.filter(item => item.trackId !== result.trackId);
      } else {
        likedList.push(result);
      }

      await AsyncStorage.setItem('likedMusic', JSON.stringify(likedList));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to update liked music', error);
    }
  };

  const toggleDislike = async () => {
    try {
      const dislikedMusic = await AsyncStorage.getItem('dislikedMusic');
      let dislikedList = dislikedMusic ? JSON.parse(dislikedMusic) : [];

      if (isDisliked) {
        dislikedList = dislikedList.filter(item => item.trackId !== result.trackId);
      } else {
        dislikedList.push(result);
      }

      await AsyncStorage.setItem('dislikedMusic', JSON.stringify(dislikedList));
      setIsDisliked(!isDisliked);
    } catch (error) {
      console.error('Failed to update disliked music', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: result.artworkUrl100 }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={30} color={isFavorite ? "#ff0000" : "#fff"} />
      </TouchableOpacity>
      <View style={styles.likeDislikeContainer}>
        <TouchableOpacity onPress={toggleDislike} style={styles.dislikeButton}>
          <Icon name={isDisliked ? 'thumbs-down' : 'thumbs-down'} size={30} color={isDisliked ? '#fff' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Icon name={isLiked ? 'thumbs-up' : 'thumbs-up'} size={30} color={isLiked ? '#fff' : 'gray'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.trackName}>{result.trackName}</Text>
      <Text style={styles.artistName}>{result.artistName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
  },
  image: {
    width: 365,
    height: 365,
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 30,
  },
  dislikeButton: {
    alignItems: 'center',
  },
  likeButton: {
    alignItems: 'center',
  },
  trackName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  artistName: {
    color: '#aaa',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});

export default ResultDetail;
