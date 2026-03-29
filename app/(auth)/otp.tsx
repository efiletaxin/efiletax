import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function OTPScreen() {
  const { mobile, isRegister } = useLocalSearchParams<{ mobile: string; isRegister?: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    Alert.alert('OTP Sent', `A new OTP has been sent to +91 ${mobile}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient colors={['#1A3C8F', '#2A5BC9']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.otpIcon}>
          <Ionicons name="phone-portrait" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.headerTitle}>Verify OTP</Text>
        <Text style={styles.headerSubtitle}>
          We've sent a 6-digit OTP to
        </Text>
        <Text style={styles.mobileText}>+91 {mobile}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer & Resend */}
        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend OTP in{' '}
              <Text style={styles.timerCount}>00:{timer.toString().padStart(2, '0')}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Change Number */}
        <TouchableOpacity
          style={styles.changeNumber}
          onPress={() => router.back()}
        >
          <Ionicons name="create-outline" size={16} color={Colors.primary} />
          <Text style={styles.changeNumberText}>Change Mobile Number</Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={loading}
        >
          <LinearGradient
            colors={['#1A3C8F', '#2A5BC9']}
            style={styles.verifyGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
            {!loading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secureNote}>
          <Ionicons name="lock-closed" size={14} color={Colors.textMuted} />
          <Text style={styles.secureText}>Your data is protected with 256-bit SSL encryption</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  mobileText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: '#EEF2FF',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  timerCount: {
    fontWeight: '700',
    color: Colors.primary,
  },
  resendText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '700',
  },
  changeNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 32,
  },
  changeNumberText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  verifyButton: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  verifyButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  secureText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
