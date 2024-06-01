import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ButtonSection = ({ navigation }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
      <Icon name="heart" size={16} color="#fff" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Mes favoris</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LikedMusic')}>
      <Icon name="thumbs-up" size={16} color="#fff" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Mes likes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DislikedMusic')}>
      <Icon name="thumbs-down" size={16} color="#fff" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Mes dislikes</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 55,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default ButtonSection;
