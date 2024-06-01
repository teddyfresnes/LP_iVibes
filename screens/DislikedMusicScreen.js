import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResultItem from '../components/SearchResultItem';

const DislikedMusicScreen = ({ navigation }) => {
  const [dislikedMusic, setDislikedMusic] = useState([]);

  useEffect(() => {
    fetchDislikedMusic();
  }, []);

  const fetchDislikedMusic = async () => {
    try {
      const dislikedMusic = await AsyncStorage.getItem('dislikedMusic');
      setDislikedMusic(dislikedMusic ? JSON.parse(dislikedMusic) : []);
    } catch (error) {
      console.error('Failed to load disliked music', error);
    }
  };

  const handlePress = (item) => {
    navigation.navigate('ResultDetail', { result: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dislikedMusic}
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

export default DislikedMusicScreen;
