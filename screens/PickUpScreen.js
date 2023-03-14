import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function PickUpScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const cart = useSelector(state => state.cart.cart);
  const navigation = useNavigation();

  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

  const proceedToCart = () => {
    if (!selectedTime || !delivery) {
      Alert.alert('Empty or invalid', 'Please select all  the fields');
    }
    if (selectedTime && delivery) {
      navigation.replace('Cart', {
        selectedTime: selectedTime,
        no_Of_days: delivery,
        pickUpDate: selectedDate,
      });
    }
  };
  const deliveryTime = [
    {
      id: '0',
      name: '2-3 Days',
    },
    {
      id: '1',
      name: '3-4 Days',
    },
    {
      id: '2',
      name: '5-6 Days',
    },
    {
      id: '3',
      name: '6-7 Days',
    },
  ];

  const times = [
    {
      id: '0',
      time: '11:00 PM',
    },
    {
      id: '1',
      time: '12:00 PM',
    },
    {
      id: '2',
      time: '1:00 PM',
    },
    {
      id: '3',
      time: '2:00 PM',
    },
  ];

  return (
    <>
      <SafeAreaView>
        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Enter address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: 'gray',
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Pickup date
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Select time
        </Text>

        <ScrollView>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.id)}
              style={
                selectedTime.includes(item.id)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'red',
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'gray',
                      borderWidth: 0.7,
                    }
              }>
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{fontSize: 16, fontWeight: '500', marginHorizontal: 10}}>
          Delivery date
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'red',
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: 'gray',
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={index}>
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
              {cart.length} items | ${total}
            </Text>
            <Text style={{fontSize: 13, fontWeight: '400', marginVertical: 6}}>
              Extra charges might apply
            </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
