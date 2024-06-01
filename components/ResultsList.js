import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SearchResultItem from './SearchResultItem';

const ResultsList = ({ results, handleResultPress }) => (
  <View>
    <Text style={styles.sectionHeader}>Titres</Text>
    <FlatList
      data={results}
      keyExtractor={(item) => item.trackId.toString()}
      renderItem={({ item }) => (
        <SearchResultItem item={item} onPress={() => handleResultPress(item)} />
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
});

export default ResultsList;
