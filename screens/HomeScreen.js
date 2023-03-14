import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../components/Carousel';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from '@react-native-community/geolocation';

import Services from '../components/Services';
import DressItem from '../components/DressItem';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {getProducts} from '../ProductReducer';
// Geocoder.init('AIzaSyCGxpdO_pk43ChW411blyUf7hu0m4jDR9k');
export default function HomeScreen() {
  const cart = useSelector(state => state.cart.cart);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

  const data = [
    {
      id: 0,
      uri: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
      title: 'Dahlia',
    }, // https://unsplash.com/photos/Jup6QMQdLnM
    {
      id: 1,
      uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
      title: 'Sunflower',
    }, // https://unsplash.com/photos/oO62CP-g1EA
    {
      id: 2,
      uri: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
      title: 'Zinnia',
    }, // https://unsplash.com/photos/gKMmJEvcyA8
    {
      id: 3,
      uri: 'https://images.unsplash.com/photo-1587814213271-7a6625b76c33',
      title: 'Tulip',
    }, // https://unsplash.com/photos/N7zBDF1r7PM
    {
      id: 4,
      uri: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4',
      title: 'Chrysanthemum',
    }, // https://unsplash.com/photos/GsGZJMK0bJc
    {
      id: 5,
      uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
      title: 'Hydrangea',
    }, // https://unsplash.com/photos/coIBOiWBPjk
  ];
  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'dresses',
      quantity: 0,
      price: 10,
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'jeans',
      quantity: 0,
      price: 10,
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'Sweater',
      quantity: 0,
      price: 10,
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'shorts',
      quantity: 0,
      price: 10,
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'Sleeveless',
      quantity: 0,
      price: 10,
    },
  ];
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'We are loading your location',
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  const product = useSelector(state => state.product.product);

  const dispatch = useDispatch();

  useEffect(() => {
    // checkIfLocationEnabled();
    // getCurrentLocationTest();
    let itemsTemp = [];
    if (product.length > 0) {
      return;
    }
    const fetchProduct = async () => {
      const colRef = await firestore().collection('types').get();
      colRef.docs.forEach(temp => {
        const newItem = {
          id: temp.id,
          image: temp.data().image,
          name: temp.data().name,
          price: temp.data().price,
          quantity: temp.data().quantity,
        };
        itemsTemp.push(newItem);
      });
      itemsTemp.map(service => dispatch(getProducts(service)));
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfLocationEnabled = () => {
    if (false) {
      Alert.alert(
        'Location services not enabled',
        'Please enabled the location services',
      );
    } else {
      setLocationServicesEnabled('');
    }
  };
  const getCurrentLocationTest = () => {
    // Geolocation &&
    //   Geolocation.getCurrentPosition(position => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     // Geocoder.from(latitude, longitude)
    //     //   .then(json => {
    //     //     const addressComponent = json.results[0].address_components;
    //     //     let city = '';
    //     //     for (let i = 0; i < addressComponent.length; i++) {
    //     //       const {types} = addressComponent[i];
    //     //       if (types.includes('locality')) {
    //     //         city = addressComponent[i].long_name;
    //     //         break;
    //     //       }
    //     //     }
    //     //     // Utiliza la ciudad donde sea necesario
    //     //   })
    //     //   .catch(error => console.warn('errorrrr', error));
    //   });
  };
  return (
    <>
      <ScrollView style={{backgroundColor: '#F0F0F0'}}>
        {/* Location and profile */}
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text>Iconon</Text>
            <View>
              <Text style={{fontWeight: 'bold'}}>Home</Text>
              <Text>Lima, Perú</Text>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate('ProfileScreen')}
            style={{marginLeft: 'auto', marginRight: 7}}>
            <Image
              style={{width: 40, height: 40, borderRadius: 20}}
              source={{
                uri: 'https://yt3.ggpht.com/yti/AHXOFjVWF_v68Kjwq4oUfRp1eBWwHqi4k3zcOrxrii1Zug=s88-c-k-c0x00ffffff-no-rj-mo',
              }}
            />
          </Pressable>
        </View>

        {/* Search var */}

        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0.8,
            borderColor: '#C0C0C0',
            borderRadius: 7,
          }}>
          <TextInput placeholder="Search for items or More" />
        </View>
        {/* Image and carousel */}
        <Carousel data={data} />

        {/* Service component */}
        <Services />

        {/* Render all products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>
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
          <Pressable onPress={() => navigation.navigate('PickUp')}>
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
