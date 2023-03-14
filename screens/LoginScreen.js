import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
      }}>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text>Loading ...</Text>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text style={{fontSize: 20, color: '#662d91', fontWeight: '600'}}>
              Signin
            </Text>
            <Text style={{fontSize: 18, marginTop: 8, fontWeight: '600'}}>
              Sign in to your account
            </Text>
          </View>

          <View style={{marginTop: 50}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholderTextColor="black"
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 300,
                  marginVertical: 10,
                  marginLeft: 13,
                }}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholderTextColor="black"
                placeholder="Password"
                value={password}
                onChangeText={word => setPassword(word)}
                secureTextEntry={true}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  width: 300,
                  marginVertical: 20,
                  marginLeft: 13,
                }}
              />
            </View>

            {/* button */}
            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: '#318CE7',
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
                Login
              </Text>
            </Pressable>

            <Pressable
              style={{marginTop: 30}}
              onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: 'gray',
                  fontWeight: 'bold',
                }}>
                Don't have an account ? Sign up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
