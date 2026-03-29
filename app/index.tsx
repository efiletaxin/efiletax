import { Redirect } from 'expo-router';

export default function Index() {
  // In a real app, check auth state here
  // For demo purposes, redirect to auth
  return <Redirect href="/(auth)/welcome" />;
}
