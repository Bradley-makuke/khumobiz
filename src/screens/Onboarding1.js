import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    // title: 'Welcome to FNB Smart Banking',
    image: require('../../assets/logo2.png'),
  },
  {
    id: '2',
    title: 'Empower your Hustle',
    subtitle: 'Banking that moves with your business',
    image: require('../../assets/on2.jpg'),
  },
  {
    id: '3',
    title: 'Sell. Track. Grow.',
    subtitle: 'Smart tools to power your daily trade',
    image: require('../../assets/on3.jpg'),
  },
];

export default function Onboarding1() {
  const flatListRef = useRef();
  const navigation = useNavigation();
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current < slides.length) {
        flatListRef.current.scrollToIndex({ index: indexRef.current });
      } else {
        clearInterval(interval);
        
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <Pressable
        onPress={() => navigation.replace('login')}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          indexRef.current = newIndex;
        }}
      />

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicator,
              indexRef.current === i && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A693',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: -300,
  },
  title: {
    color: '#FFD700',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 160,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 250,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#FFD700',
    width: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 25,
    color: '#FFD700',
    fontWeight: 'bold',
},
subtitle: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 260,
},
});
