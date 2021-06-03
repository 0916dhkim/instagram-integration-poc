import { OnShouldStartLoadWithRequest } from 'react-native-webview/lib/WebViewTypes';
import React from 'react';
import WebView from 'react-native-webview';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { useToken } from '../providers/TokenProvider';

async function fetchAccessToken(code: string) {
  const base = 'https://api.instagram.com/oauth/access_token';
  const formData = new FormData();

  formData.append('client_id', process.env.INSTAGRAM_CLIENT_ID ?? '');
  formData.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET ?? '');
  formData.append('grant_type', 'authorization_code');
  formData.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI ?? '');
  formData.append('code', code);

  const res = await axios.post(
    base,
    formData,
  );

  const {access_token} = await res.data;

  return access_token;
}

export default function InstagramLogin() {
  const {setAccessToken} = useToken();
  const navigation = useNavigation();
  const base = 'https://api.instagram.com/oauth/authorize';
  const searchParams = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID ?? '',
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI ?? '',
    scope: 'user_profile,user_media',
    response_type: 'code',
  });

  const handleRequest: OnShouldStartLoadWithRequest = (request) => {
    if (request.url.startsWith(process.env.INSTAGRAM_REDIRECT_URI ?? '')) {
      // Response from auth server.
      const code = request.url.replace((process.env.INSTAGRAM_REDIRECT_URI ?? '') + '?code=', '');
      fetchAccessToken(code).then((token) => {
        setAccessToken(token);
      }).finally(() => {
        navigation.navigate('Home');
      });
      return false;
    }
    return true;
  };

  return (
      <WebView
        source={{ uri: `${base}?${searchParams.toString()}` }}
        onShouldStartLoadWithRequest={handleRequest}
      />
  );
}
