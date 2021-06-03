import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import WebView from 'react-native-webview';

export default function InstagramLogin() {
  const base = 'https://api.instagram.com/oauth/authorize';
  const searchParams = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID ?? '',
    redirect_uri: 'https://localhost/',
    scope: 'user_profile,user_media',
    response_type: 'code',
  });
  return (
      <WebView source={{ uri: `${base}?${searchParams.toString()}` }} />
  );
}
