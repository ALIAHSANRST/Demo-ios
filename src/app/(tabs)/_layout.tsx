import { Tabs } from 'expo-router';

import { MirraTabBar } from '@/components/mirra/MirraTabBar';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <MirraTabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Messages' }} />
      <Tabs.Screen name="contacts" options={{ title: 'Contacts' }} />
    </Tabs>
  );
}
