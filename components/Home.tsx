import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useToken } from '../providers/TokenProvider';

export default function Home() {
  const navigation = useNavigation();
  const {accessToken} = useToken();
  return (
    <View style={styles.container}>
      <Text>ID: {process.env.INSTAGRAM_CLIENT_ID}</Text>
      <Text>SECRET: {process.env.INSTAGRAM_CLIENT_SECRET}</Text>
      <Text>REDIRECT: {process.env.INSTAGRAM_REDIRECT_URI}</Text>
      {accessToken && <Text>ACCESS-TOKEN: {accessToken}</Text>}
      <Button title="Integrate Instagram" onPress={() => {
        navigation.navigate('Login');
      }} />
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
