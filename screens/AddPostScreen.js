import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { CURRENT_USER, POSTS } from '../data/mockData';
import { COLORS } from '../data/theme';

export default function AddPostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleCreatePost = () => {
    if (!postText.trim() && !selectedMedia) return;

    // Navigate back to home with new post data
    navigation.navigate('Home', {
      newPost: {
        id: `p${Date.now()}`,
        user: CURRENT_USER,
        content: postText,
        image: selectedMedia,
        time: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      }
    });
    
    setPostText('');
    setSelectedMedia(null);
    setShowPreview(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity 
          style={[styles.postBtn, (!postText.trim() && !selectedMedia) && styles.postBtnDisabled]}
          onPress={handleCreatePost}
          disabled={!postText.trim() && !selectedMedia}
        >
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.modalUserRow}>
        <Avatar uri={CURRENT_USER.avatar} name={CURRENT_USER.name} size={44} />
        <View>
          <Text style={styles.modalUserName}>{CURRENT_USER.name}</Text>
          <View style={styles.privacyBadge}>
            <Ionicons name="people-outline" size={12} color={COLORS.textSecondary} />
            <Text style={styles.privacyText}>Public</Text>
          </View>
        </View>
      </View>
      
      <TextInput
        style={styles.postInput}
        placeholder="What's on your mind?"
        placeholderTextColor={COLORS.textSecondary}
        value={postText}
        onChangeText={setPostText}
        multiline
        autoFocus
      />
      
      {selectedMedia && (
        <View style={styles.selectedMediaContainer}>
          <Image source={{ uri: selectedMedia }} style={styles.selectedMedia} />
          <TouchableOpacity 
            style={styles.removeMediaBtn}
            onPress={() => setSelectedMedia(null)}
          >
            <Ionicons name="close-circle" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.addToPost}>
        <Text style={styles.addToPostTitle}>Add to your post</Text>
        <View style={styles.addToPostIcons}>
          <TouchableOpacity style={styles.addIconBtn}>
            <Ionicons name="images-outline" size={28} color="#45BD62" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addIconBtn}>
            <Ionicons name="videocam-outline" size={28} color="#F23B5E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addIconBtn}>
            <Ionicons name="happy-outline" size={28} color="#F7B928" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addIconBtn}>
            <Ionicons name="location-outline" size={28} color="#1877F2" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  postBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postBtnDisabled: {
    opacity: 0.5,
  },
  postBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  modalUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  modalUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  privacyText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  postInput: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    paddingHorizontal: 16,
  },
  selectedMediaContainer: {
    position: 'relative',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  selectedMedia: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeMediaBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
  },
  addToPost: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
  },
  addToPostTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  addToPostIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  addIconBtn: {
    padding: 6,
  },
});