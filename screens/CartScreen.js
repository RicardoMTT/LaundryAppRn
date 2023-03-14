import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {decrementQuantity, incrementQuantity} from '../ProductReducer';
import {
  cleanCart,
  decrementQuantityToCart,
  incrementQuantityToCart,
} from '../CartReducer';

const LineaHorizontal = () => {
  return (
    <View
      style={{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
      }}
    />
  );
};
export default function CartScreen() {
  const cart = useSelector(state => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

  const userId = auth().currentUser.uid;
  const placeOrder = async () => {
    navigation.navigate('OrderScreen');
    dispatch(cleanCart());
    await firestore()
      .collection('users')
      .doc(`${userId}`)
      .set({
        orders: {...cart},
        pickUpDetails: route.params,
      });
  };
  return (
    <SafeAreaView style={{marginTop: 50}}>
      {total === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginTop: 40}}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Text onPress={() => navigation.goBack()}>Go back</Text>
            <Text>Your bucket</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              marginLeft: 10,
              marginRight: 10,
              padding: 14,
            }}>
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 12,
                }}>
                <Text style={{width: 100, fontSize: 16, fontWeight: '400'}}>
                  {item.name}
                </Text>

                {/* Button */}

                <Pressable
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    justifyContent: 'space-between',
                    borderColor: '#BEBEBE',
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}>
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                      dispatch(decrementQuantityToCart(item));
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: '#BEBEBE',
                      backgroundColor: '#E0E0E0',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#088F8F',
                        paddingHorizontal: 6,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      -
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      alignSelf: 'center',
                      fontSize: 19,
                      color: '#088F8F',
                      paddingHorizontal: 8,
                      fontWeight: '600',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        width: 100,
                        fontSize: 16,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}>
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                      dispatch(incrementQuantityToCart(item));
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      borderColor: '#BEBEBE',
                      backgroundColor: '#E0E0E0',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#088F8F',
                        paddingHorizontal: 6,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      +
                    </Text>
                  </Pressable>
                </Pressable>
                {/* End Button */}
              </View>
            ))}
          </Pressable>

          <View style={{padding: 10, height: '100%'}}>
            <Text>Billing Details</Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                padding: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: 'gray',
                  }}>
                  Item total
                </Text>
                <Text style={{fontSize: 18, fontWeight: '400'}}>{total}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: 'gray',
                  }}>
                  Delivery Fee | 1.2KM
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F',
                  }}>
                  Fee
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: 'gray',
                  }}>
                  Free Delivery on your order
                </Text>
              </View>
              <LineaHorizontal />
              <View
                style={{
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: 'gray',
                    }}>
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {/* route.params.pickUpDate */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: 'gray',
                    }}>
                    No Of days
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {route.params.no_Of_Days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: 'gray',
                    }}>
                    Selected Pick up Time
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#088F8F',
                    }}>
                    {route.params.selectedTime}
                  </Text>
                </View>
                <LineaHorizontal />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      To pay
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {total + 95}
                    </Text>
                  </View>
                </View>
              </View>

              {total === 0 ? null : (
                <Pressable
                  style={{
                    backgroundColor: '#088F8F',
                    marginTop: 'auto',
                    padding: 10,
                    marginBottom: 40,
                    margin: 15,
                    borderRadius: 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{fontSize: 27, fontWeight: '600', color: 'white'}}>
                      {cart.length} items | $ {total}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'white',
                        marginVertical: 6,
                      }}>
                      extra charges migh apply
                    </Text>
                  </View>
                  <Pressable onPress={placeOrder}>
                    <Text
                      style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                      Place order
                    </Text>
                  </Pressable>
                </Pressable>
              )}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
