import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ResultDetail from '../components/ResultDetail';
import AudioPlayer from '../components/AudioPlayer';

const DetailScreen = ({ route }) => {
  const { result } = route.params;

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No result found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ResultDetail result={result} />
      {result.previewUrl ? (
        <AudioPlayer previewUrl={result.previewUrl} />
      ) : (
        <Text style={styles.errorText}>No preview available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailScreen;