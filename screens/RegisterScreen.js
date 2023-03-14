import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const register = () => {
    if (email === '' || password === '' || phone === '') {
      Alert.alert('Bad request');
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user = response.user;
        const myUserId = user.uid;
        firestore()
          .collection('users')
          .doc(myUserId)
          .set({
            email: email,
            phone: phone,
          })
          .then('usuario created')
          .catch(error => {
            console.log('error', error);
          });
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text style={{fontSize: 20, color: '#662d91', fontWeight: 'bold'}}>
            Register
          </Text>
          <Text style={{fontSize: 18, marginTop: 8, fontWeight: '600'}}>
            Create a new account
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

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              placeholderTextColor="black"
              placeholder="Phone"
              value={phone}
              onChangeText={word => setPhone(word)}
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
            onPress={register}
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
              Register
            </Text>
          </Pressable>

          <Pressable
            style={{marginTop: 30}}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                color: 'gray',
                fontWeight: 'bold',
              }}>
              Already have an account ? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
