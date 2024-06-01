import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

let currentSound = null;

const AudioPlayer = ({ previewUrl }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const intervalRef = useRef(null);

  const loadSound = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: previewUrl },
      { shouldPlay: true, isLooping: isLooping },
      updateStatus
    );
    setSound(sound);
    currentSound = sound;
  };

  const updateStatus = (status) => {
    if (status.isLoaded) {
      if (!isSliding) {
        setPosition(status.positionMillis);
      }
      setDuration(Math.min(status.durationMillis, 30000));
      setIsPlaying(status.isPlaying);
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`);
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(intervalRef.current);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (sound) {
      sound.setIsLoopingAsync(isLooping);
    }
  }, [isLooping]);

  useEffect(() => {
    if (isPlaying && !isSliding) {
      intervalRef.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, sound, isSliding]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (position >= duration - 100) {
          await sound.setPositionAsync(0);
          setPosition(0);
        }
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const handleSliderValueChange = async (value) => {
    if (sound) {
      setIsSliding(false);
      await sound.setPositionAsync(value);
      setPosition(value);
      if (isPlaying) {
        await sound.playAsync();
      }
    }
  };

  const handleSliderValueChangeStart = () => {
    setIsSliding(true);
  };

  const formatTime = (millis) => {
    const seconds = Math.floor(millis / 1000);
    if (millis >= duration - 100) {
      return "0:30";
    }
    return seconds < 10 ? `0:0${seconds}` : `0:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={(value) => setPosition(value)}
        onSlidingStart={handleSliderValueChangeStart}
        onSlidingComplete={handleSliderValueChange}
        minimumTrackTintColor="white"
        maximumTrackTintColor="#777"
        thumbTintColor="white"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleStop}>
          <MaterialIcons name='stop' size={32} color='gray' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLooping(!isLooping)}>
          <MaterialIcons name='loop' size={32} color={isLooping ? 'white' : 'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginTop: 0,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 160,
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: '#ccc',
    marginHorizontal: 5,
  },
});

export default AudioPlayer;
