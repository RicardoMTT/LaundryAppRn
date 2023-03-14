import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrementQuantity, incrementQuantity} from '../ProductReducer';
import {
  addToCart,
  incrementQuantityToCart,
  decrementQuantityToCart,
} from '../CartReducer';

export default function DressItem({item}) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart
    dispatch(incrementQuantity(item)); // product
  };
  return (
    <View style={{padding: 10}}>
      <Pressable
        style={{
          backgroundColor: '#F8F8F8',
          borderRadius: 8,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Image source={{uri: item.image}} style={{width: 70, height: 70}} />
        </View>
        <View>
          <Text style={{width: 83, fontSize: 17, fontWeight: '500'}}>
            {item.name}
          </Text>
          <Text style={{width: 60, color: 'gray', fontSize: 15}}>
            $/.{item.price}
          </Text>
        </View>
        {cart.some(c => c.id == item.id) ? (
          <Pressable
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
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
                fontSize: 19,
                color: '#088F8F',
                paddingHorizontal: 8,
                fontWeight: '600',
              }}>
              <Text>{item.quantity}</Text>
            </Pressable>
            <Pressable
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: '#BEBEBE',
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                dispatch(incrementQuantity(item));
                dispatch(incrementQuantityToCart(item));
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
        ) : (
          <Pressable
            style={{
              width: 80,
            }}
            onPress={addItemToCart}>
            <Text
              style={{
                borderColor: 'gray',
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: '#088F8F',
                textAlign: 'center',
                padding: 5,
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Add
            </Text>
          </Pressable>
        )}
        {/* <Pressable style={{width: 80}} onPress={addItemToCart}>
          <Text
            style={{
              borderColor: 'gray',
              borderWidth: 0.8,
              borderRadius: 6,
              fontSize: 17,
              textAlign: 'center',
              marginVertical: 10,
              color: '#088F8F',
              padding: 8,
            }}>
            Add
          </Text>
        </Pressable> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
