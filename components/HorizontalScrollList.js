import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HorizontalScrollList = ({ title, data, onPressItem, emptyMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {data.length === 0 ? (
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
              <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
              <Text style={styles.trackName} numberOfLines={1} ellipsizeMode="tail">{item.trackName}</Text>
              <Text style={styles.artistName} numberOfLines={1} ellipsizeMode="tail">{item.artistName}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  itemContainer: {
    width: 150,
    marginRight: 4,
    marginLeft: 7,
  },
  emptyMessage: {
    color: '#aaa',
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  trackName: {
    color: '#fff',
    fontSize: 14,
    //fontWeight: 'bold',
    marginTop: 5,
  },
  artistName: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default HorizontalScrollList;
