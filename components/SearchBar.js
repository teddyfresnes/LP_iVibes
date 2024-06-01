import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ query, setQuery, clearSearch }) => (
  <View style={styles.searchContainer}>
    <Icon name="search" size={20} color="#bbb" style={styles.searchIcon} />
    <TextInput
      style={styles.input}
      placeholder="Rechercher un titre ou un artiste..."
      placeholderTextColor='#bbb'
      value={query}
      onChangeText={(text) => setQuery(text)}
    />
    {query.length > 0 && (
      <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
        <Icon name="close-circle" size={24} color="#bbb" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
  },
  searchIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    color: '#fff',
  },
  clearButton: {
    marginLeft: 8,
  },
});

export default SearchBar;
