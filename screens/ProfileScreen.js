// screens/ProfileScreen.js (Complete with Add Story and Add Post)
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import PostCard from '../components/PostCard';
import StoryCircle from '../components/StoryCircle';
import { CURRENT_USER, POSTS, STORIES } from '../data/mockData';
import { COLORS } from '../data/theme';

const PROFILE_TABS = ['Posts', 'Photos', 'About', 'Friends'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [userPosts, setUserPosts] = useState(POSTS.filter(p => p.user.id === CURRENT_USER.id));
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState('');
  const [showAddStory, setShowAddStory] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [userStories, setUserStories] = useState(STORIES);

  const handleCreatePost = () => {
    if (!postText.trim()) return;
    
    const newPost = {
      id: `p${Date.now()}`,
      user: CURRENT_USER,
      content: postText,
      image: null,
      time: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    
    setUserPosts([newPost, ...userPosts]);
    setPostText('');
    setShowCreatePost(false);
  };

  const handleAddStory = () => {
    if (!storyText.trim()) return;
    
    const newStory = {
      id: `story${Date.now()}`,
      userId: CURRENT_USER.id,
      name: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      seen: false,
      content: storyText,
      image: null,
      time: 'Just now',
    };
    
    setUserStories([newStory, ...userStories]);
    setStoryText('');
    setShowAddStory(false);
  };

  const renderCreatePostModal = () => (
    <Modal
      visible={showCreatePost}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCreatePost(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <Ionicons name="close" size={28} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Post</Text>
            <TouchableOpacity 
              style={[styles.modalPostBtn, !postText.trim() && styles.modalPostBtnDisabled]}
              onPress={handleCreatePost}
              disabled={!postText.trim()}
            >
              <Text style={styles.modalPostBtnText}>Post</Text>
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
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderAddStoryModal = () => (
    <Modal
      visible={showAddStory}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddStory(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: '#1A1A2E' }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddStory(false)}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: '#FFFFFF' }]}>Add Story</Text>
            <TouchableOpacity 
              style={[styles.modalPostBtn, !storyText.trim() && styles.modalPostBtnDisabled]}
              onPress={handleAddStory}
              disabled={!storyText.trim()}
            >
              <Text style={styles.modalPostBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.storyPreview}>
            <View style={styles.storyPreviewPlaceholder}>
              <Ionicons name="camera-outline" size={60} color="#FFFFFF" />
              <Text style={styles.storyPreviewText}>Add a photo or video</Text>
            </View>
          </View>
          
          <TextInput
            style={styles.storyInput}
            placeholder="What's happening?"
            placeholderTextColor="#888"
            value={storyText}
            onChangeText={setStoryText}
            multiline
          />
          
          <View style={styles.addToPost}>
            <Text style={[styles.addToPostTitle, { color: '#888' }]}>Add to story</Text>
            <View style={styles.addToPostIcons}>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="camera-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="images-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: CURRENT_USER.coverPhoto }} style={styles.coverPhoto} />
          <TouchableOpacity style={styles.editCoverBtn}>
            <Ionicons name="camera-outline" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Avatar uri={CURRENT_USER.avatar} name={CURRENT_USER.name} size={100} />
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{CURRENT_USER.name}</Text>
          <Text style={styles.userBio}>{CURRENT_USER.bio}</Text>
          <Text style={styles.userUsername}>{CURRENT_USER.username}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.addStoryBtn} onPress={() => setShowAddStory(true)}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.addStoryText}>Add Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setShowCreatePost(true)}>
            <Ionicons name="create-outline" size={20} color={COLORS.text} />
            <Text style={styles.editProfileText}>Add Post</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>890</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {PROFILE_TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'Posts' && (
            userPosts.length > 0 ? (
              userPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <View style={styles.emptyPosts}>
                <Ionicons name="images-outline" size={48} color={COLORS.textLight} />
                <Text style={styles.emptyPostsText}>No posts yet</Text>
                <TouchableOpacity style={styles.createPostBtn} onPress={() => setShowCreatePost(true)}>
                  <Text style={styles.createPostBtnText}>Create your first post</Text>
                </TouchableOpacity>
              </View>
            )
          )}
          {activeTab === 'Photos' && (
            <View style={styles.emptyPosts}>
              <Ionicons name="camera-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyPostsText}>No photos yet</Text>
            </View>
          )}
          {activeTab === 'About' && (
            <View style={styles.aboutSection}>
              <View style={styles.aboutRow}>
                <Ionicons name="briefcase-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.aboutText}>Student at Limkokwing University</Text>
              </View>
              <View style={styles.aboutRow}>
                <Ionicons name="school-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.aboutText}>BSc Software Engineering</Text>
              </View>
              <View style={styles.aboutRow}>
                <Ionicons name="location-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.aboutText}>Maseru, Lesotho</Text>
              </View>
            </View>
          )}
          {activeTab === 'Friends' && (
            <View style={styles.emptyPosts}>
              <Ionicons name="people-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyPostsText}>No friends to display</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {renderCreatePostModal()}
      {renderAddStoryModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  coverContainer: {
    height: 180,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  editCoverBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 12,
    position: 'relative',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  addStoryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addStoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  editProfileBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabContent: {
    padding: 16,
  },
  emptyPosts: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyPostsText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  createPostBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  createPostBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  aboutSection: {
    gap: 16,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  modalPostBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalPostBtnDisabled: {
    opacity: 0.5,
  },
  modalPostBtnText: {
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addToPost: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
  storyPreview: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
  },
  storyPreviewPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  storyPreviewText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  storyInput: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#2A2A3E',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});