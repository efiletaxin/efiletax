import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const PROFILE_MENU = [
  {
    section: 'Account',
    items: [
      { icon: 'person-outline', label: 'Personal Information', arrow: true },
      { icon: 'card-outline', label: 'PAN & Tax Details', arrow: true },
      { icon: 'document-outline', label: 'My Documents', arrow: true },
      { icon: 'receipt-outline', label: 'Payment History', arrow: true },
    ],
  },
  {
    section: 'Tax Profile',
    items: [
      { icon: 'business-outline', label: 'Income Details', arrow: true },
      { icon: 'home-outline', label: 'Property & Investments', arrow: true },
      { icon: 'briefcase-outline', label: 'Business Information', arrow: true },
    ],
  },
  {
    section: 'Support',
    items: [
      { icon: 'headset-outline', label: 'Contact Support', arrow: true },
      { icon: 'chatbubble-outline', label: 'WhatsApp Support', arrow: true },
      { icon: 'star-outline', label: 'Rate the App', arrow: true },
      { icon: 'share-outline', label: 'Refer & Earn', arrow: true },
    ],
  },
  {
    section: 'Legal',
    items: [
      { icon: 'document-text-outline', label: 'Terms & Conditions', arrow: true },
      { icon: 'shield-checkmark-outline', label: 'Privacy Policy', arrow: true },
      { icon: 'information-circle-outline', label: 'About eFileTax', arrow: true },
    ],
  },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#0F2460', '#1A3C8F', '#2A5BC9']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#F97316', '#EF4444']}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>R</Text>
              </LinearGradient>
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="camera" size={14} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Rahul Sharma</Text>
            <Text style={styles.profileEmail}>rahul.sharma@gmail.com</Text>
            <Text style={styles.profileMobile}>+91 98765 43210</Text>
            <View style={styles.panBadge}>
              <Ionicons name="card-outline" size={14} color={Colors.primaryLight} />
              <Text style={styles.panText}>PAN: ABCRS1234X</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.accent} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>3</Text>
              <Text style={styles.profileStatLabel}>Active Services</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>8</Text>
              <Text style={styles.profileStatLabel}>Total Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>₹1,200</Text>
              <Text style={styles.profileStatLabel}>Referral Earned</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Completion Progress */}
        <View style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionTitle}>Profile Completion</Text>
            <Text style={styles.completionPercent}>75%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.completionHint}>
            Add your income details to get personalized tax advice
          </Text>
        </View>

        {/* Settings Toggles */}
        <View style={styles.togglesCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="notifications-outline" size={18} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Push Notifications</Text>
                <Text style={styles.toggleSubLabel}>Deadlines, updates & offers</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={Colors.white}
            />
          </View>
          <View style={styles.toggleDivider} />
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="finger-print-outline" size={18} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.toggleLabel}>Biometric Login</Text>
                <Text style={styles.toggleSubLabel}>Quick & secure access</Text>
              </View>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: Colors.border, true: Colors.accent }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        {/* Menu Sections */}
        {PROFILE_MENU.map((section) => (
          <View key={section.section} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <Ionicons name={item.icon as any} size={18} color={Colors.primary} />
                      </View>
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                  {i < section.items.length - 1 && <View style={styles.menuDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactCard}>
            <TouchableOpacity style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="call" size={20} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Phone Support</Text>
                <Text style={styles.contactValue}>+91 9876 543 210</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.contactDivider} />
            <TouchableOpacity style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#FFF7ED' }]}>
                <Ionicons name="mail" size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Email Support</Text>
                <Text style={styles.contactValue}>support@efiletax.in</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.contactDivider} />
            <TouchableOpacity style={styles.contactItem}>
              <View style={[styles.contactIcon, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="logo-whatsapp" size={20} color='#25D366' />
              </View>
              <View>
                <Text style={styles.contactLabel}>WhatsApp</Text>
                <Text style={styles.contactValue}>Chat with Expert</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Version */}
        <View style={styles.appVersion}>
          <LinearGradient
            colors={['#1A3C8F', '#2A5BC9']}
            style={styles.appVersionLogo}
          >
            <Ionicons name="document-text" size={16} color={Colors.white} />
          </LinearGradient>
          <View>
            <Text style={styles.appVersionName}>eFileTax</Text>
            <Text style={styles.appVersionNum}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  profileMobile: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
  },
  panBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  panText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  verifiedText: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '700',
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 14,
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 2,
  },
  profileStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  completionCard: {
    backgroundColor: Colors.white,
    margin: 20,
    marginBottom: 0,
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  completionPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  completionHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  togglesCard: {
    backgroundColor: Colors.white,
    margin: 20,
    marginBottom: 0,
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  toggleSubLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 10,
  },
  menuSection: {
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 8,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 8,
  },
  contactSection: {
    marginTop: 4,
  },
  contactCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 8,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  contactDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 8,
  },
  appVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 28,
  },
  appVersionLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appVersionName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  appVersionNum: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.error,
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
});
