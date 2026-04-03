// screens/HomeFeedScreen.js (Complete Fixed Version - No Inline Styling)
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import StoryCircle from '../components/StoryCircle';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import { POSTS, STORIES, CURRENT_USER, FRIENDS, NOTIFICATIONS } from '../data/mockData';
import { COLORS } from '../data/theme';

const { width } = Dimensions.get('window');

export default function HomeFeedScreen({ navigation }) {
  const [posts, setPosts] = useState(POSTS);
  const [postText, setPostText] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAddStory, setShowAddStory] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [storyImage, setStoryImage] = useState(null);
  const [userStories, setUserStories] = useState(STORIES);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Search functionality
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

  // Create Post
  const handleCreatePost = () => {
    if (!postText.trim() && !selectedMedia) return;
    
    const newPost = {
      id: `p${Date.now()}`,
      user: CURRENT_USER,
      content: postText,
      image: selectedMedia,
      time: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };
    
    setPosts([newPost, ...posts]);
    setPostText('');
    setSelectedMedia(null);
    setShowCreatePost(false);
  };

  // Add Story
  const handleAddStory = () => {
    if (!storyText.trim() && !storyImage) return;
    
    const newStory = {
      id: `story${Date.now()}`,
      userId: CURRENT_USER.id,
      name: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      seen: false,
      content: storyText,
      image: storyImage,
      time: 'Just now',
    };
    
    setUserStories([newStory, ...userStories]);
    setStoryText('');
    setStoryImage(null);
    setShowAddStory(false);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const renderStories = () => (
    <View style={styles.storiesSection}>
      <FlatList
        data={[{ id: 'add', isAdd: true }, ...userStories]}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}
        renderItem={({ item }) => (
          <StoryCircle 
            story={item} 
            isAdd={item.isAdd} 
            onPress={() => {
              if (item.isAdd) {
                setShowAddStory(true);
              }
            }}
          />
        )}
      />
    </View>
  );

  const renderCreatePostCard = () => (
    <View style={styles.createPostCard}>
      <View style={styles.createPostTop}>
        <Avatar uri={CURRENT_USER.avatar} name={CURRENT_USER.name} size={48} />
        <TouchableOpacity 
          style={styles.createPostInput}
          onPress={() => setShowCreatePost(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.createPostPlaceholder}>
            What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.createPostActions}>
        <TouchableOpacity 
          style={styles.createPostAction}
          onPress={() => setShowCreatePost(true)}
        >
          <View style={[styles.actionIconBg, styles.photoIconBg]}>
            <Ionicons name="image-outline" size={22} color={COLORS.primary} />
          </View>
          <Text style={styles.actionLabel}>Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.createPostAction}>
          <View style={[styles.actionIconBg, styles.videoIconBg]}>
            <Ionicons name="videocam-outline" size={22} color="#FF3B30" />
          </View>
          <Text style={styles.actionLabel}>Video</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.createPostAction}>
          <View style={[styles.actionIconBg, styles.feelingIconBg]}>
            <Ionicons name="happy-outline" size={22} color="#34C759" />
          </View>
          <Text style={styles.actionLabel}>Feeling</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.createPostAction}>
          <View style={[styles.actionIconBg, styles.locationIconBg]}>
            <Ionicons name="location-outline" size={22} color="#FF9500" />
          </View>
          <Text style={styles.actionLabel}>Check in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Create Post Modal
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
            <TouchableOpacity onPress={() => {
              setShowCreatePost(false);
              setPostText('');
              setSelectedMedia(null);
            }}>
              <Ionicons name="close" size={28} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Post</Text>
            <TouchableOpacity 
              style={[styles.modalPostBtn, (!postText.trim() && !selectedMedia) && styles.modalPostBtnDisabled]}
              onPress={handleCreatePost}
              disabled={!postText.trim() && !selectedMedia}
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
                <Ionicons name="chevron-down" size={12} color={COLORS.textSecondary} />
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
        </View>
      </View>
    </Modal>
  );

  // Add Story Modal
  const renderAddStoryModal = () => (
    <Modal
      visible={showAddStory}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddStory(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, styles.storyModalContent]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => {
              setShowAddStory(false);
              setStoryText('');
              setStoryImage(null);
            }}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, styles.storyModalTitle]}>Add Story</Text>
            <TouchableOpacity 
              style={[styles.modalPostBtn, (!storyText.trim() && !storyImage) && styles.modalPostBtnDisabled]}
              onPress={handleAddStory}
              disabled={!storyText.trim() && !storyImage}
            >
              <Text style={styles.modalPostBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.storyPreview}>
            {storyImage ? (
              <Image source={{ uri: storyImage }} style={styles.storyPreviewImage} />
            ) : (
              <View style={styles.storyPreviewPlaceholder}>
                <Ionicons name="camera-outline" size={60} color="#FFFFFF" />
                <Text style={styles.storyPreviewText}>Add a photo or video</Text>
              </View>
            )}
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
            <Text style={[styles.addToPostTitle, styles.storyAddToPostTitle]}>Add to story</Text>
            <View style={styles.addToPostIcons}>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="camera-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="images-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="musical-notes-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIconBtn}>
                <Ionicons name="text-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Search Modal
  const renderSearchModal = () => (
    <Modal
      visible={showSearch}
      animationType="slide"
      onRequestClose={() => {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }}
    >
      <SafeAreaView style={styles.searchModal}>
        <View style={styles.searchHeader}>
          <TouchableOpacity onPress={() => {
            setShowSearch(false);
            setSearchQuery('');
            setSearchResults([]);
          }}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <SearchBar 
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search for friends..."
            autoFocus
          />
        </View>
        
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
    </Modal>
  );

  // Notifications Modal
  const renderNotificationsModal = () => (
    <Modal
      visible={showNotifications}
      animationType="slide"
      onRequestClose={() => setShowNotifications(false)}
    >
      <SafeAreaView style={styles.searchModal}>
        <View style={styles.notificationHeader}>
          <TouchableOpacity onPress={() => setShowNotifications(false)}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.notificationTitle}>Notifications</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.notificationItem, !item.read && styles.notificationUnread]}
              onPress={() => markAsRead(item.id)}
            >
              <View style={styles.notificationIcon}>
                {item.type === 'like' && <Ionicons name="thumbs-up" size={24} color={COLORS.like} />}
                {item.type === 'comment' && <Ionicons name="chatbubble" size={24} color={COLORS.primary} />}
                {item.type === 'friend' && <Ionicons name="person-add" size={24} color={COLORS.success} />}
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.notificationUser}>{item.user}</Text> {item.message}
                </Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
              {!item.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptySearch}>
              <Ionicons name="notifications-off-outline" size={60} color={COLORS.textLight} />
              <Text style={styles.emptySearchTitle}>No notifications</Text>
              <Text style={styles.emptySearchText}>When you get notifications, they'll appear here</Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>FaceBook</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowSearch(true)}>
          <Ionicons name="search-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowNotifications(true)}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          {notifications.filter(n => !n.read).length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notifications.filter(n => !n.read).length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="chatbubble-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnimatedHeader = () => (
    <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
      <Text style={styles.animatedLogo}>FaceBook</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowSearch(true)}>
          <Ionicons name="search-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowNotifications(true)}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="chatbubble-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {renderHeader()}
      {renderAnimatedHeader()}
      {renderSearchModal()}
      {renderCreatePostModal()}
      {renderAddStoryModal()}
      {renderNotificationsModal()}

      <Animated.FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View style={{
            opacity: scrollY.interpolate({
              inputRange: [(index - 1) * 300, index * 300, (index + 1) * 300],
              outputRange: [0.7, 1, 0.7],
              extrapolate: 'clamp',
            }),
          }}>
            <PostCard post={item} />
          </Animated.View>
        )}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            {renderStories()}
            {renderCreatePostCard()}
            <View style={styles.feedHeader}>
              <Text style={styles.feedTitle}>Recent Posts</Text>
              <TouchableOpacity>
                <Text style={styles.feedMore}>See All</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        contentContainerStyle={styles.feedContent}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 10,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  animatedLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  iconBtn: {
    padding: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  storiesSection: {
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  storiesContainer: {
    paddingHorizontal: 12,
  },
  createPostCard: {
    backgroundColor: COLORS.surface,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  createPostTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  createPostInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  createPostPlaceholder: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  createPostAction: {
    alignItems: 'center',
    gap: 6,
  },
  actionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIconBg: {
    backgroundColor: '#E7F3FF',
  },
  videoIconBg: {
    backgroundColor: '#FFE7E7',
  },
  feelingIconBg: {
    backgroundColor: '#E7FFE7',
  },
  locationIconBg: {
    backgroundColor: '#FFF4E7',
  },
  actionLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  feedMore: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  feedContent: {
    paddingBottom: 20,
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
  storyModalContent: {
    backgroundColor: '#1A1A2E',
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
  storyModalTitle: {
    color: '#FFFFFF',
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
  selectedMediaContainer: {
    position: 'relative',
    marginVertical: 12,
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
  },
  addToPostTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  storyAddToPostTitle: {
    color: '#888',
  },
  addToPostIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  addIconBtn: {
    padding: 6,
  },
  searchModal: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: '700',
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
  storyPreview: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 20,
  },
  storyPreviewImage: {
    width: '100%',
    height: '100%',
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  notificationUnread: {
    backgroundColor: '#E7F3FF',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  notificationUser: {
    fontWeight: '700',
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});