import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SERVICES } from '@/constants/Services';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { id: 'itr-filing', label: 'File ITR', icon: 'document-text', color: Colors.primary },
  { id: 'gst-registration', label: 'GST Reg.', icon: 'receipt', color: Colors.secondary },
  { id: 'company-registration', label: 'Register Co.', icon: 'briefcase', color: '#8B5CF6' },
  { id: 'tds-return', label: 'TDS Return', icon: 'calculator', color: '#0EA5E9' },
];

const STATS = [
  { label: 'Happy Clients', value: '10,000+', icon: 'people' },
  { label: 'Returns Filed', value: '50,000+', icon: 'document-text' },
  { label: 'Years Experience', value: '10+', icon: 'star' },
  { label: 'Expert CAs', value: '50+', icon: 'briefcase' },
];

const UPCOMING = [
  { title: 'GST Return (GSTR-3B)', deadline: 'Mar 20, 2025', daysLeft: 5, color: Colors.error },
  { title: 'TDS Return (Q3)', deadline: 'Jan 31, 2025', daysLeft: 12, color: Colors.warning },
  { title: 'ITR Filing Deadline', deadline: 'Jul 31, 2025', daysLeft: 128, color: Colors.accent },
];

export default function HomeScreen() {
  const popularServices = SERVICES.slice(0, 4);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <LinearGradient
          colors={['#0F2460', '#1A3C8F', '#2A5BC9']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good Morning! 👋</Text>
              <Text style={styles.userName}>Rahul Sharma</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerActionBtn}>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
                <View style={styles.notifBadge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerActionBtn}>
                <Ionicons name="headset-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push('/(tabs)/services')}
          >
            <Ionicons name="search" size={18} color={Colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Search services, tax tips...</Text>
            <Ionicons name="options-outline" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹12,400</Text>
              <Text style={styles.statLabel}>Tax Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Cases</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Pending Docs</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickAction}
                onPress={() => router.push({ pathname: '/service/[id]', params: { id: action.id } })}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '18' }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Deadline Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {UPCOMING.map((item, index) => (
              <TouchableOpacity key={index} style={styles.deadlineCard}>
                <View style={[styles.deadlineLeft, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name="calendar" size={20} color={item.color} />
                </View>
                <View style={styles.deadlineContent}>
                  <Text style={styles.deadlineTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.deadlineDate}>{item.deadline}</Text>
                </View>
                <View style={[styles.deadlineBadge, { backgroundColor: item.color + '18' }]}>
                  <Text style={[styles.deadlineDays, { color: item.color }]}>
                    {item.daysLeft}d
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promotional Banner */}
        <View style={styles.section}>
          <TouchableOpacity>
            <LinearGradient
              colors={['#F97316', '#EF4444']}
              style={styles.promoBanner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.promoContent}>
                <Text style={styles.promoTag}>LIMITED OFFER</Text>
                <Text style={styles.promoTitle}>File ITR @ ₹499</Text>
                <Text style={styles.promoSubtitle}>
                  Expert-assisted ITR filing for salaried individuals
                </Text>
                <View style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>Book Now</Text>
                  <Ionicons name="arrow-forward" size={14} color={Colors.secondary} />
                </View>
              </View>
              <View style={styles.promoDecoration}>
                <Ionicons name="document-text" size={60} color="rgba(255,255,255,0.2)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/services')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {popularServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => router.push({ pathname: '/service/[id]', params: { id: service.id } })}
              >
                <View style={[styles.serviceCardIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon as any} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceCardTitle}>{service.title}</Text>
                <Text style={styles.serviceCardPrice}>{service.startingPrice}</Text>
                <View style={styles.serviceCardArrow}>
                  <Ionicons name="arrow-forward-circle" size={20} color={service.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trust Stats */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#F8FAFF', '#EEF2FF']}
            style={styles.statsCard}
          >
            <Text style={styles.statsTitle}>Why Choose eFileTax?</Text>
            <View style={styles.statsGrid}>
              {STATS.map((stat, index) => (
                <View key={index} style={styles.statBox}>
                  <View style={styles.statBoxIcon}>
                    <Ionicons name={stat.icon as any} size={20} color={Colors.primary} />
                  </View>
                  <Text style={styles.statBoxValue}>{stat.value}</Text>
                  <Text style={styles.statBoxLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Reviews</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {REVIEWS.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>
                      {review.name.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewService}>{review.service}</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color="#F59E0B" />
                  ))}
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Contact CTA */}
        <View style={[styles.section, { marginBottom: 32 }]}>
          <View style={styles.contactCTA}>
            <View style={styles.contactCTAIcon}>
              <Ionicons name="headset" size={28} color={Colors.primary} />
            </View>
            <View style={styles.contactCTAContent}>
              <Text style={styles.contactCTATitle}>Need Expert Advice?</Text>
              <Text style={styles.contactCTASubtitle}>Talk to our CA experts for free</Text>
            </View>
            <TouchableOpacity style={styles.contactCTAButton}>
              <Text style={styles.contactCTAButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const REVIEWS = [
  {
    name: 'Priya Mehta',
    service: 'ITR Filing',
    text: 'Filed my ITR in less than 2 hours. The team was very professional and helped me save more tax.',
  },
  {
    name: 'Amit Kumar',
    service: 'GST Registration',
    text: 'Got my GSTIN within 4 days. Excellent communication throughout the process.',
  },
  {
    name: 'Sneha Patel',
    service: 'Company Registration',
    text: 'Incorporated my startup smoothly. They handled all the paperwork and ROC filings.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 20,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: Colors.textMuted,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 14,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  deadlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    width: 240,
    gap: 10,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deadlineLeft: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  deadlineDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deadlineBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deadlineDays: {
    fontSize: 12,
    fontWeight: '700',
  },
  promoBanner: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
  },
  promoTag: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
    marginBottom: 6,
  },
  promoTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 14,
    lineHeight: 18,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  promoButtonText: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  promoDecoration: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    width: (width - 52) / 2,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  serviceCardIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  serviceCardPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.accent,
    marginBottom: 8,
  },
  serviceCardArrow: {
    alignSelf: 'flex-end',
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: (width - 88) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  statBoxIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  statBoxLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    width: 240,
    marginRight: 12,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  reviewService: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  contactCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  contactCTAIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactCTAContent: {
    flex: 1,
  },
  contactCTATitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  contactCTASubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  contactCTAButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  contactCTAButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
