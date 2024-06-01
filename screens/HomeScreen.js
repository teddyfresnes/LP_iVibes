import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import ButtonSection from '../components/ButtonSection';
import HorizontalScrollList from '../components/HorizontalScrollList';
import SectionRenderer from '../components/SectionRenderer';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [results, setResults] = useState([]);
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [likedMusic, setLikedMusic] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilteredByArtist, setIsFilteredByArtist] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (query.trim().length > 0) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setArtists([]);
      setResults([]);
    }
  }, [query]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
      fetchLikedMusic();
    }, [])
  );

  const fetchFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      setFavorites(favorites ? JSON.parse(favorites) : []);
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const fetchLikedMusic = async () => {
    try {
      const likedMusic = await AsyncStorage.getItem('likedMusic');
      setLikedMusic(likedMusic ? JSON.parse(likedMusic) : []);
    } catch (error) {
      console.error('Failed to load liked music', error);
    }
  };

  const padQuery = (query) => {
    const trimmedQuery = query.trim();
    const nonSpaceLength = trimmedQuery.replace(/\s+/g, '').length;

    if (nonSpaceLength < 3) {
      const lastChar = trimmedQuery[trimmedQuery.length - 1];
      return trimmedQuery.padEnd(trimmedQuery.length + (3 - nonSpaceLength), lastChar);
    }

    return query;
  };

  const handleSearch = async () => {
    try {
      const paddedQuery = padQuery(query);
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(paddedQuery)}`);
      const data = await response.json();

      const validResults = data.results.filter(item => item.trackId !== undefined && item.kind === 'song');

      const uniqueArtists = Array.from(new Set(validResults.map(item => item.artistName)))
        .map(artistName => validResults.find(item => item.artistName === artistName));

      const sortedArtists = uniqueArtists.sort((a, b) => {
        const aMatch = a.artistName.toLowerCase().includes(query.toLowerCase());
        const bMatch = b.artistName.toLowerCase().includes(query.toLowerCase());
        return bMatch - aMatch;
      });

      setAllArtists(sortedArtists);
      setAllResults(validResults);
      setArtists(sortedArtists.slice(0, 3));
      setResults(validResults.slice(0, 3));
      setShowAllArtists(false);
      setShowAllResults(false);
      setIsFilteredByArtist(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data from iTunes API.');
      console.error(error);
    }
  };

  const handleArtistPress = (artistName) => {
    const filtered = allResults.filter(item => item.artistName === artistName);
    setFilteredResults(filtered);
    setIsFilteredByArtist(true);
    setShowAllResults(true);
    setShowAllArtists(false);
  };

  const handleResultPress = (item) => {
    if (item.trackId && item.previewUrl) {
      navigation.navigate('Detail', { result: item });
    } else {
      console.error('Invalid item:', item);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setArtists([]);
    setResults([]);
    setShowAllArtists(false);
    setShowAllResults(false);
    setIsFilteredByArtist(false);
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <>
          <SearchBar query={query} setQuery={setQuery} clearSearch={clearSearch} />
          {query.length === 0 && (
            <View>
              <ButtonSection navigation={navigation} />
              <HorizontalScrollList
                title="Mes favoris"
                data={favorites}
                onPressItem={handleResultPress}
                emptyMessage="Vous n'avez ajouté aucune musique en favori :("
              />
              <HorizontalScrollList
                title="Mes j'aimes"
                data={likedMusic}
                onPressItem={handleResultPress}
                emptyMessage="Vous n'avez aimé aucune musique :("
              />
            </View>
          )}
        </>
      }
      ListFooterComponent={
        <SectionRenderer
          showAllArtists={showAllArtists}
          showAllResults={showAllResults}
          artists={artists}
          results={results}
          allArtists={allArtists}
          allResults={allResults}
          isFilteredByArtist={isFilteredByArtist}
          filteredResults={filteredResults}
          handleArtistPress={handleArtistPress}
          handleResultPress={handleResultPress}
          setShowAllArtists={setShowAllArtists}
          setShowAllResults={setShowAllResults}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },
});

export default HomeScreen;
