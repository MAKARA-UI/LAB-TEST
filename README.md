# Telegram UI Redesign — React Native (Expo)

## Project Structure
```
TelegramRedesign/
├── App.js
├── app.json
├── babel.config.js
├── package.json
│
├── data/
│   ├── mockData.js       # All mock chats, messages, contacts, stories
│   └── theme.js          # Colors, fonts, radius constants
│
├── navigation/
│   └── AppNavigator.js   # Bottom tabs + stack navigator
│
├── components/
│   ├── Avatar.js          # Smart avatar (image / initials / type icons)
│   ├── ChatItem.js        # Chat list row with badges & pins
│   ├── MessageBubble.js   # Sent/received bubble with ticks
│   ├── StoryCircle.js     # Story ring with seen/unseen states
│   └── SearchBar.js       # Reusable search input
│
└── screens/
    ├── ChatsScreen.js     # Chat list + stories + filters
    ├── ChatRoomScreen.js  # Full chat with live messaging
    ├── ContactsScreen.js  # Alphabetical contacts list
    ├── CallsScreen.js     # Calls log with missed/all filter
    └── SettingsScreen.js  # Profile + settings menu
```

## Setup
```bash
npm install --legacy-peer-deps
npx expo start
```

## Features
- ✅ Chat list with pinned, unread badges, last message
- ✅ Stories row (seen/unseen ring states)
- ✅ Filter chips (All, Unread, Personal, Groups, Channels)
- ✅ Live chat room — type and send messages in real time
- ✅ Read receipts (✓ sent, ✓✓ delivered, blue ✓✓ read)
- ✅ Smart avatars — color-coded initials for groups/channels
- ✅ Online indicator dots
- ✅ Contacts with alphabetical sections
- ✅ Calls log with missed/outgoing/video indicators
- ✅ Settings screen with profile card
- ✅ No inline styles — all StyleSheet.create()
