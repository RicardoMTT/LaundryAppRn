import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

export default function Services() {
  // services data code
  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3003/3003984.png',
      name: 'Washing',
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/2975/2975175.png',
      name: 'Laundry',
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9753/9753675.png',
      name: 'Wash & Iron',
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/995/995016.png',
      name: 'Cleaning',
    },
  ];
  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 16, fontWeight: '500', marginBottom: 7}}>
        Services available
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            key={index}
            style={{margin: 10, padding: 20, borderRadius: 7,backgroundColor:"#FFF"}}>
            <Image
              source={{uri: service.image}}
              style={{width: 70, height: 70, resizeMode: 'cover'}}
            />
            <Text style={{textAlign: 'center', marginTop: 6}}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
