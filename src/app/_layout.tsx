import { Stack } from "expo-router";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () =>({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout(){
  return(
    <Stack>
      
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      
      <Stack.Screen 
        name="add-task" 
        options={{ 
          title: 'Add Task', 
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
}

