import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ArtistList from './ArtistList';
import ResultsList from './ResultsList';

const SectionRenderer = ({
  showAllArtists,
  showAllResults,
  artists,
  results,
  allArtists,
  allResults,
  isFilteredByArtist,
  filteredResults,
  handleArtistPress,
  handleResultPress,
  setShowAllArtists,
  setShowAllResults,
}) => {
  if (showAllArtists) {
    return <ArtistList artists={allArtists} handleArtistPress={handleArtistPress} />;
  } else if (showAllResults) {
    return <ResultsList results={isFilteredByArtist ? filteredResults : allResults} handleResultPress={handleResultPress} />;
  } else {
    return (
      <View>
        {artists.length > 0 && (
          <View>
            <ArtistList artists={artists} handleArtistPress={handleArtistPress} />
            <TouchableOpacity onPress={() => setShowAllArtists(true)}>
              <Text style={styles.viewMore}>Voir plus...</Text>
            </TouchableOpacity>
          </View>
        )}
        {results.length > 0 && (
          <View>
            <ResultsList results={results} handleResultPress={handleResultPress} />
            <TouchableOpacity onPress={() => setShowAllResults(true)}>
              <Text style={styles.viewMore}>Voir plus...</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewMore: {
    color: '#1e90ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default SectionRenderer;
