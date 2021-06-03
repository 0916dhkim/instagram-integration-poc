import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ID: {process.env.INSTAGRAM_CLIENT_ID}</Text>
      <Text>SECRET: {process.env.INSTAGRAM_CLIENT_SECRET}</Text>
      <Text>REDIRECT: {process.env.INSTAGRAM_REDIRECT_URI}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
