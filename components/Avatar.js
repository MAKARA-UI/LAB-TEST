// components/Avatar.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS } from '../data/theme';

const AVATAR_COLORS = ['#1877F2', '#E4B363', '#E85D04', '#2A9D8F', '#E76F51', '#6A4C93'];

function getColorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function Avatar({ uri, name = '?', size = 50, online = false, style }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  const bgColor = getColorForName(name);

  return (
    <View style={[styles.container, style]}>
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
        </View>
      )}
      {online && (
        <View style={[styles.onlineDot, { width: size * 0.25, height: size * 0.25, borderRadius: size * 0.125 }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: '#E4E6EB',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});