# TasksHub

A React Native mobile application built with Expo Router as part of **Mobile Application Development – Practical Tutorial 07** (Department of Statistics & Computer Science, University of Kelaniya).

## Features

- **Persistent Storage (`AsyncStorage`)**: Saves, retrieves, and clears tasks and student profile data locally on the device using JSON serialization.
- **Hybrid File-Based Navigation (`Expo Router`)**: Combines bottom tab navigation (`Dashboard` and `Profile`) with a modal stack screen (`Add New Task`).
- **Local Notifications (`expo-notifications`)**: Triggers an immediate local alert on the device whenever a new task is saved.
- **Profile & Media Integration (`expo-image-picker`)**: Allows users to save their student name and ID, pick and crop a profile picture from the device gallery, or wipe all local storage data.

## Project Structure

```text
app/
├── _layout.tsx          # Root Stack layout & notification handler configuration
├── add-task.tsx         # Modal screen to add new tasks & trigger notifications
└── (tabs)/
    ├── _layout.tsx      # Bottom tab navigator setup with MaterialCommunityIcons
    ├── index.tsx        # Dashboard screen displaying saved tasks
    └── profile.tsx      # Student profile screen with image picker & clear storage
```
