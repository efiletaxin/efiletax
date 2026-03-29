import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SERVICES, SERVICE_CATEGORIES } from '@/constants/Services';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = SERVICES.filter((s) => {
    const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient colors={['#1A3C8F', '#2A5BC9']} style={styles.header}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>
          Expert tax & compliance solutions for every need
        </Text>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon as any}
                size={14}
                color={selectedCategory === cat.id ? Colors.white : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat.id && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Services List */}
      <ScrollView
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySubtitle}>Try a different search term or category</Text>
          </View>
        ) : (
          filteredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() =>
                router.push({ pathname: '/service/[id]', params: { id: service.id } })
              }
            >
              <View style={styles.serviceCardTop}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon as any} size={26} color={service.color} />
                </View>
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceTitleRow}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <View style={[styles.categoryTag, { backgroundColor: service.color + '15' }]}>
                      <Text style={[styles.categoryTagText, { color: service.color }]}>
                        {service.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.serviceDesc} numberOfLines={2}>
                    {service.shortDesc}
                  </Text>
                </View>
              </View>

              <View style={styles.serviceCardBottom}>
                <View style={styles.serviceMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="pricetag-outline" size={14} color={Colors.accent} />
                    <Text style={styles.metaText}>Starts {service.startingPrice}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                    <Text style={styles.metaDuration}>{service.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.getStartedBtn, { backgroundColor: service.color }]}
                  onPress={() =>
                    router.push({ pathname: '/service/[id]', params: { id: service.id } })
                  }
                >
                  <Text style={styles.getStartedText}>Get Started</Text>
                  <Ionicons name="arrow-forward" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 20 }} />
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  categoryWrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  resultsRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  servicesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  serviceCardTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  serviceIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  serviceDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  serviceCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  serviceMeta: {
    gap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },
  metaDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  getStartedText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
