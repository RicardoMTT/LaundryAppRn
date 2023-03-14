import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import React from 'react';

export default function OrderScreen() {
  return (
    <SafeAreaView>
      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}>
        Your order has been placed
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
