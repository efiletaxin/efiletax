import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'File Taxes with Ease',
    subtitle: 'Expert-assisted ITR filing for individuals & businesses. Maximize your refunds.',
    icon: 'document-text',
    color: '#1A3C8F',
    bgColor: '#EEF2FF',
  },
  {
    id: '2',
    title: 'GST Made Simple',
    subtitle: 'Registration, return filing & compliance — all handled by certified GST experts.',
    icon: 'receipt',
    color: '#F97316',
    bgColor: '#FFF7ED',
  },
  {
    id: '3',
    title: 'Register Your Business',
    subtitle: 'Company, LLP, Udyam & more — get registered quickly with complete compliance.',
    icon: 'briefcase',
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
  {
    id: '4',
    title: 'Trusted by 10,000+ Clients',
    subtitle: 'Professional tax & compliance services with dedicated experts at every step.',
    icon: 'shield-checkmark',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <LinearGradient
            colors={['#1A3C8F', '#2A5BC9']}
            style={styles.logoGradient}
          >
            <Ionicons name="document-text" size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.logoText}>eFileTax</Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon as any} size={80} color={item.color} />
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#1A3C8F', '#2A5BC9']}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {currentIndex === SLIDES.length - 1 && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  slide: {
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  slideSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.border,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 16,
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  loginButton: {
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
