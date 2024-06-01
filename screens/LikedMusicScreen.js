import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResultItem from '../components/SearchResultItem';

const LikedMusicScreen = ({ navigation }) => {
  const [likedMusic, setLikedMusic] = useState([]);

  useEffect(() => {
    fetchLikedMusic();
  }, []);

  const fetchLikedMusic = async () => {
    try {
      const likedMusic = await AsyncStorage.getItem('likedMusic');
      setLikedMusic(likedMusic ? JSON.parse(likedMusic) : []);
    } catch (error) {
      console.error('Failed to load liked music', error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('ResultDetail', { result: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={likedMusic}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <SearchResultItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LikedMusicScreen;
