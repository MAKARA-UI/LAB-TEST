// data/mockData.js (Updated with NOTIFICATIONS)
export const CURRENT_USER = {
  id: 'me',
  name: 'Tseliso Lesolo',
  username: '@tseliso',
  avatar: 'https://i.pravatar.cc/150?img=1',
  coverPhoto: 'https://picsum.photos/seed/cover/400/200',
  bio: 'Software Engineering Student | Limkokwing 🎓',
  isVerified: true,
};

export const FRIENDS = [
  { id: 'user1', name: 'Kabo Molapo', username: '@kabo_m', avatar: 'https://i.pravatar.cc/150?img=2', online: true, mutual: true },
  { id: 'user2', name: 'Palesa Ntai', username: '@palesa_n', avatar: 'https://i.pravatar.cc/150?img=4', online: true, mutual: true },
  { id: 'user3', name: 'Thabo Letsie', username: '@thabo_l', avatar: 'https://i.pravatar.cc/150?img=3', online: false, mutual: true },
  { id: 'user4', name: 'Lerato Motsei', username: '@lerato_m', avatar: 'https://i.pravatar.cc/150?img=5', online: true, mutual: true },
  { id: 'user5', name: 'Refiloe Khali', username: '@refiloe_k', avatar: 'https://i.pravatar.cc/150?img=6', online: false, mutual: true },
  { id: 'user6', name: 'Mpho Sekhonyana', username: '@mpho_s', avatar: 'https://i.pravatar.cc/150?img=7', online: true, mutual: false },
  { id: 'user7', name: 'Nthabiseng Dube', username: '@nthabiseng', avatar: 'https://i.pravatar.cc/150?img=8', online: false, mutual: false },
  { id: 'user8', name: 'Retsepile Nkosi', username: '@retsepile', avatar: 'https://i.pravatar.cc/150?img=9', online: true, mutual: true },
];

export const STORIES = [
  { id: 's1', userId: 'user1', name: 'Kabo', avatar: 'https://i.pravatar.cc/150?img=2', seen: false },
  { id: 's2', userId: 'user2', name: 'Palesa', avatar: 'https://i.pravatar.cc/150?img=4', seen: false },
  { id: 's3', userId: 'user3', name: 'Thabo', avatar: 'https://i.pravatar.cc/150?img=3', seen: true },
  { id: 's4', userId: 'user4', name: 'Lerato', avatar: 'https://i.pravatar.cc/150?img=5', seen: true },
  { id: 's5', userId: 'user5', name: 'Refiloe', avatar: 'https://i.pravatar.cc/150?img=6', seen: false },
  { id: 's6', userId: 'user6', name: 'Mpho', avatar: 'https://i.pravatar.cc/150?img=7', seen: false },
];

export const POSTS = [
  {
    id: 'p1',
    user: {
      id: 'user1',
      name: 'Kabo Molapo',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isVerified: false,
    },
    content: 'Just finished my React Native assignment! Feeling accomplished after weeks of hard work. 🚀',
    image: 'https://picsum.photos/seed/post1/800/600',
    time: '2 hours ago',
    likes: 124,
    comments: 18,
    shares: 5,
    liked: false,
  },
  {
    id: 'p2',
    user: {
      id: 'user2',
      name: 'Palesa Ntai',
      avatar: 'https://i.pravatar.cc/150?img=4',
      isVerified: true,
    },
    content: 'Beautiful day on campus! The weather is perfect for studying outdoors. 📚✨',
    image: 'https://picsum.photos/seed/post2/800/600',
    time: '5 hours ago',
    likes: 89,
    comments: 12,
    shares: 3,
    liked: true,
  },
  {
    id: 'p3',
    user: {
      id: 'user3',
      name: 'Thabo Letsie',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isVerified: false,
    },
    content: 'Late night coding session. The best ideas come at 2 AM when everything is quiet. 💻🌙',
    image: null,
    time: 'Yesterday',
    likes: 256,
    comments: 34,
    shares: 12,
    liked: false,
  },
  {
    id: 'p4',
    user: {
      id: 'user4',
      name: 'Lerato Motsei',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isVerified: false,
    },
    content: 'Check out this amazing view from my weekend hike! Nature is truly therapeutic. ⛰️',
    image: 'https://picsum.photos/seed/post4/800/600',
    time: 'Yesterday',
    likes: 312,
    comments: 28,
    shares: 8,
    liked: true,
  },
];

export const NOTIFICATIONS = [
  { id: 'n1', type: 'like', user: 'Kabo', message: 'liked your post', time: '10 min ago', read: false },
  { id: 'n2', type: 'comment', user: 'Palesa', message: 'commented on your photo', time: '1 hour ago', read: false },
  { id: 'n3', type: 'friend', user: 'Thabo', message: 'accepted your friend request', time: '3 hours ago', read: true },
  { id: 'n4', type: 'like', user: 'Lerato', message: 'liked your story', time: '5 hours ago', read: true },
];