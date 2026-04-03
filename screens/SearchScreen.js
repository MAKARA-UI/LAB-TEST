
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import { FRIENDS, CURRENT_USER } from '../data/mockData';
import { COLORS } from '../data/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = FRIENDS.filter(friend => 
        friend.name.toLowerCase().includes(query.toLowerCase()) ||
        friend.username.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      
      <SearchBar 
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search for friends..."
      />
      
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.searchResultItem}>
            <Avatar uri={item.avatar} name={item.name} size={50} />
            <View style={styles.searchResultInfo}>
              <Text style={styles.searchResultName}>{item.name}</Text>
              <Text style={styles.searchResultUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity style={styles.addFriendBtn}>
              <Text style={styles.addFriendBtnText}>Add Friend</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          searchQuery.trim() ? (
            <View style={styles.emptySearch}>
              <Ionicons name="person-outline" size={60} color={COLORS.textLight} />
              <Text style={styles.emptySearchTitle}>No friends found</Text>
              <Text style={styles.emptySearchText}>
                No person named "{searchQuery}" in your friends list
              </Text>
            </View>
          ) : (
            <View style={styles.emptySearch}>
              <Ionicons name="search-outline" size={60} color={COLORS.textLight} />
              <Text style={styles.emptySearchTitle}>Search for friends</Text>
              <Text style={styles.emptySearchText}>
                Find people you know by name or username
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchResultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  searchResultUsername: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addFriendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addFriendBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  emptySearch: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptySearchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  emptySearchText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});