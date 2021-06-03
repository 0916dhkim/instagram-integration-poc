import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import axios from 'axios';
import {urlSegmentToInstagramId} from 'instagram-id-to-url-segment';
import { useNavigation } from '@react-navigation/core';
import { useToken } from '../providers/TokenProvider';

export default function ImageForm() {
  const {accessToken} = useToken();
  const [instaUrl, setInstaUrl] = useState('https://www.instagram.com/p/CPiqq8hJFcz/');
  const [imageUrl, setImageUrl] = useState<string>();

  const fetchImage = async () => {
    const shortcode = /\/p\/(.*?)\/$/.exec(instaUrl)?.[1];
    if (!shortcode) {
      throw new Error('Invalid instagram URL');
    }
    const mediaId = urlSegmentToInstagramId(shortcode);
    console.log(mediaId);

    const res = await axios.get(
      `https://graph.instagram.com/${mediaId}`,
      {
        params: {
          access_token: accessToken,
          fields: 'media_url,thumbnail_url',
        },
      },
    );

    setImageUrl(res.data.media_url);
  };

  return (
    <View style={styles.container}>
      {accessToken && <Text selectable>ACCESS-TOKEN: {accessToken}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInstaUrl(text)}
        value={instaUrl}
      />
      <Button title="Extract Image!" onPress={fetchImage} />
      {
        imageUrl &&
        <Image source={{uri: imageUrl}} />
      }
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
  input: {
    borderWidth: 1,
    width: '100%',
  }
});
