import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { COLORS } from '../data/theme';

const { width } = Dimensions.get('window');

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const formatLikes = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar uri={post.user.avatar} name={post.user.name} size={44} />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{post.user.name}</Text>
              {post.user.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
              )}
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.time}>{post.time}</Text>
              <Ionicons name="ellipsis-horizontal" size={12} color={COLORS.textSecondary} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {post.content && (
        <Text style={styles.content}>{post.content}</Text>
      )}
      
      {post.image && (
        <TouchableOpacity activeOpacity={0.95}>
          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
        </TouchableOpacity>
      )}

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.likesRow}>
          <View style={styles.likeIcons}>
            <View style={[styles.likeIcon, { backgroundColor: COLORS.like }]}>
              <Ionicons name="thumbs-up" size={10} color="#FFFFFF" />
            </View>
            <View style={[styles.likeIcon, { backgroundColor: '#F23B5E' }]}>
              <Ionicons name="heart" size={10} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.statsText}>{formatLikes(likesCount)}</Text>
        </View>
        <View style={styles.commentsRow}>
          <Text style={styles.statsText}>{post.comments} comments</Text>
          <Text style={styles.statsDot}>•</Text>
          <Text style={styles.statsText}>{post.shares} shares</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <Ionicons 
            name={liked ? 'thumbs-up' : 'thumbs-up-outline'} 
            size={24} 
            color={liked ? COLORS.like : COLORS.textSecondary} 
          />
          <Text style={[styles.actionText, liked && styles.actionTextActive]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => setShowComments(!showComments)}>
          <Ionicons name="chatbubble-outline" size={22} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="share-outline" size={22} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="bookmark-outline" size={22} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      {showComments && (
        <View style={styles.commentsSection}>
          <View style={styles.commentInputRow}>
            <Avatar uri={post.user.avatar} name={post.user.name} size={32} />
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor={COLORS.textSecondary}
                value={commentText}
                onChangeText={setCommentText}
              />
            </View>
            <TouchableOpacity style={styles.sendCommentBtn}>
              <Ionicons name="send" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.viewCommentsBtn}>
            <Text style={styles.viewCommentsText}>View all {post.comments} comments</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userInfo: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  menuBtn: {
    padding: 6,
  },
  content: {
    fontSize: 15,
    color: COLORS.text,
    paddingHorizontal: 14,
    paddingBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: width,
    height: width,
    backgroundColor: COLORS.secondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
  },
  commentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statsDot: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  actionTextActive: {
    color: COLORS.like,
  },
  commentsSection: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  commentInputContainer: {
    flex: 1,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  commentInput: {
    fontSize: 14,
    color: COLORS.text,
  },
  sendCommentBtn: {
    padding: 6,
  },
  viewCommentsBtn: {
    marginTop: 12,
    paddingLeft: 42,
  },
  viewCommentsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});