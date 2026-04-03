// components/StoryCircle.js (Fixed - no LinearGradient)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/theme';

export default function StoryCircle({ story, isAdd = false, onPress }) {
  if (isAdd) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.addRing}>
          <View style={styles.addCircle}>
            <Ionicons name="add" size={28} color={COLORS.primary} />
          </View>
        </View>
        <Text style={styles.name} numberOfLines={1}>Add Story</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.storyRing, !story.seen && styles.storyRingUnseen]}>
        <Image source={{ uri: story.avatar }} style={styles.avatar} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{story.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    borderWidth: 2,
    borderColor: COLORS.storyRingSeen,
    marginBottom: 6,
  },
  storyRingUnseen: {
    borderColor: COLORS.storyRing,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
    backgroundColor: COLORS.secondary,
  },
  addRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  addCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});