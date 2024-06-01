import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const ArtistList = ({ artists, handleArtistPress }) => (
  <View>
    <Text style={styles.sectionHeader}>Artistes</Text>
    <FlatList
      data={artists}
      keyExtractor={(item) => item.trackId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => handleArtistPress(item.artistName)}>
          <Image source={{ uri: item.artworkUrl60 }} style={styles.thumbnail} />
          <View style={styles.textContainer}>
            <Text style={styles.trackName} numberOfLines={1} ellipsizeMode='tail'>{item.artistName}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ArtistList;
