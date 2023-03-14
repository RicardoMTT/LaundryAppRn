import {StyleSheet, Pressable, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('LoginScreen');
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable style={{marginVertical: 20}}>
        <Text> Welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text> Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
