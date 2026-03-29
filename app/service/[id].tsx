import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SERVICES } from '@/constants/Services';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const TABS = ['Overview', 'Features', 'Documents', 'FAQs'];

const FAQS: Record<string, { q: string; a: string }[]> = {
  'itr-filing': [
    {
      q: 'Who needs to file an ITR?',
      a: 'Any individual with income exceeding ₹2.5 lakhs per year must file an ITR. It is also mandatory for those who want to claim tax refunds or have foreign assets.',
    },
    {
      q: 'What is the deadline for ITR filing?',
      a: 'The due date for filing ITR for individuals is July 31 of the assessment year. Businesses with audit requirements have an extended deadline of October 31.',
    },
    {
      q: 'What documents are needed for ITR filing?',
      a: 'You typically need Form 16 (from employer), bank statements, investment proofs (80C, 80D), Form 26AS, and details of any other income sources.',
    },
  ],
  'gst-registration': [
    {
      q: 'Is GST registration mandatory?',
      a: 'GST registration is mandatory for businesses with annual turnover exceeding ₹20 lakhs (₹10 lakhs for special category states) or those involved in inter-state supply.',
    },
    {
      q: 'How long does GST registration take?',
      a: 'GST registration typically takes 3-5 working days after submission of complete documents to the GST portal.',
    },
    {
      q: 'Can I register for GST voluntarily?',
      a: 'Yes, businesses can voluntarily register for GST even if their turnover is below the threshold limit to avail input tax credit benefits.',
    },
  ],
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <View style={styles.notFound}>
        <Text>Service not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const faqs = FAQS[service.id] || [];

  const handleGetStarted = () => {
    Alert.alert(
      'Book Service',
      `You're booking ${service.title}. A tax expert will contact you shortly.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Booked!', 'Our expert will contact you within 2 hours.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={[service.color, service.color + 'CC']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.serviceIcon}>
            <Ionicons name={service.icon as any} size={36} color={service.color} />
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceShortDesc}>{service.shortDesc}</Text>

          <View style={styles.headerMeta}>
            <View style={styles.metaBadge}>
              <Ionicons name="pricetag-outline" size={14} color={Colors.white} />
              <Text style={styles.metaBadgeText}>From {service.startingPrice}</Text>
            </View>
            <View style={styles.metaBadge}>
              <Ionicons name="time-outline" size={14} color={Colors.white} />
              <Text style={styles.metaBadgeText}>{service.duration}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'Overview' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>About This Service</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Why Choose eFileTax?</Text>
              {[
                'ICAI & GSTP Certified professionals',
                'Fast turnaround — guaranteed timeline',
                'Dedicated relationship manager',
                '100% accuracy guaranteed',
                'Post-filing support included',
              ].map((point, i) => (
                <View key={i} style={styles.checkItem}>
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark" size={14} color={Colors.white} />
                  </View>
                  <Text style={styles.checkText}>{point}</Text>
                </View>
              ))}
            </View>

            <View style={styles.processCard}>
              <Text style={styles.cardTitle}>How It Works</Text>
              {['Fill your details', 'Upload documents', 'Expert reviews', 'Filing done!'].map(
                (step, i) => (
                  <View key={i} style={styles.processStep}>
                    <View style={[styles.stepNum, { backgroundColor: service.color }]}>
                      <Text style={styles.stepNumText}>{i + 1}</Text>
                    </View>
                    {i < 3 && <View style={styles.stepLine} />}
                    <Text style={styles.stepLabel}>{step}</Text>
                  </View>
                )
              )}
            </View>
          </>
        )}

        {activeTab === 'Features' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What's Included</Text>
            {service.features.map((feature, i) => (
              <View key={i} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name="checkmark-circle" size={20} color={service.color} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Documents' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Documents Required</Text>
              <Text style={styles.documentsNote}>
                Please keep these documents ready before getting started
              </Text>
              {service.documents.map((doc, i) => (
                <View key={i} style={styles.docItem}>
                  <Ionicons name="document-outline" size={18} color={Colors.primary} />
                  <Text style={styles.docText}>{doc}</Text>
                </View>
              ))}
            </View>

            <View style={styles.uploadCard}>
              <Ionicons name="cloud-upload-outline" size={32} color={Colors.primary} />
              <Text style={styles.uploadTitle}>Easy Document Upload</Text>
              <Text style={styles.uploadSubtitle}>
                Upload documents directly from your phone. Our experts will verify and process them securely.
              </Text>
              <TouchableOpacity
                style={[styles.uploadButton, { backgroundColor: service.color }]}
              >
                <Ionicons name="cloud-upload" size={18} color={Colors.white} />
                <Text style={styles.uploadButtonText}>Upload Documents</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'FAQs' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Frequently Asked Questions</Text>
            {faqs.length === 0 ? (
              <Text style={styles.noFaqText}>FAQs coming soon for this service.</Text>
            ) : (
              faqs.map((faq, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.faqItem}
                  onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{faq.q}</Text>
                    <Ionicons
                      name={expandedFaq === i ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={Colors.textSecondary}
                    />
                  </View>
                  {expandedFaq === i && (
                    <Text style={styles.faqAnswer}>{faq.a}</Text>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Starting at</Text>
          <Text style={styles.bottomPriceValue}>{service.startingPrice}</Text>
        </View>
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: service.color }]}
          onPress={handleGetStarted}
        >
          <Text style={styles.ctaButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
    textAlign: 'center',
  },
  serviceShortDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  tabContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 14,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  processCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  processStep: {
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepNumText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 15,
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
    fontWeight: '500',
  },
  documentsNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 14,
    lineHeight: 18,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  docText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  uploadCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
  faqAnswer: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 10,
  },
  noFaqText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  bottomCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomPrice: {
    gap: 2,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bottomPriceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
