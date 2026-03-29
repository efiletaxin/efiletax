import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

type OrderStatus = 'pending' | 'in_progress' | 'review' | 'completed';

interface Order {
  id: string;
  service: string;
  icon: string;
  color: string;
  status: OrderStatus;
  statusLabel: string;
  date: string;
  amount: string;
  steps: { label: string; done: boolean; active: boolean }[];
  assignedTo?: string;
  nextAction?: string;
}

const ORDERS: Order[] = [
  {
    id: 'EFT-2024-1234',
    service: 'ITR Filing (FY 2023-24)',
    icon: 'document-text',
    color: Colors.primary,
    status: 'in_progress',
    statusLabel: 'In Progress',
    date: 'Dec 15, 2024',
    amount: '₹799',
    assignedTo: 'CA Priya Sharma',
    nextAction: 'Upload Form 16',
    steps: [
      { label: 'Order Placed', done: true, active: false },
      { label: 'Documents Received', done: true, active: false },
      { label: 'Expert Assigned', done: true, active: false },
      { label: 'Tax Computation', done: false, active: true },
      { label: 'Review & Filing', done: false, active: false },
      { label: 'ITR Filed', done: false, active: false },
    ],
  },
  {
    id: 'EFT-2024-1189',
    service: 'GST Registration',
    icon: 'receipt',
    color: Colors.secondary,
    status: 'review',
    statusLabel: 'Under Review',
    date: 'Dec 10, 2024',
    amount: '₹1,499',
    assignedTo: 'CA Rahul Gupta',
    nextAction: 'Waiting for GST officer review',
    steps: [
      { label: 'Application Submitted', done: true, active: false },
      { label: 'Documents Verified', done: true, active: false },
      { label: 'Filed on Portal', done: true, active: false },
      { label: 'GST Officer Review', done: false, active: true },
      { label: 'GSTIN Issued', done: false, active: false },
    ],
  },
  {
    id: 'EFT-2024-1050',
    service: 'TDS Return Q2 (26Q)',
    icon: 'calculator',
    color: '#0EA5E9',
    status: 'completed',
    statusLabel: 'Completed',
    date: 'Oct 31, 2024',
    amount: '₹999',
    assignedTo: 'CA Meera Joshi',
    steps: [
      { label: 'Order Placed', done: true, active: false },
      { label: 'Documents Verified', done: true, active: false },
      { label: 'Return Prepared', done: true, active: false },
      { label: 'Filed Successfully', done: true, active: false },
    ],
  },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: Colors.warning,
  in_progress: Colors.primary,
  review: Colors.secondary,
  completed: Colors.accent,
};

const STATUS_BG: Record<OrderStatus, string> = {
  pending: '#FEF3C7',
  in_progress: '#EEF2FF',
  review: '#FFF7ED',
  completed: '#ECFDF5',
};

export default function TrackScreen() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient colors={['#1A3C8F', '#2A5BC9']} style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>Track your service requests</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {ORDERS.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => setSelectedOrder(order)}
          >
            <View style={styles.orderTop}>
              <View style={[styles.orderIcon, { backgroundColor: order.color + '15' }]}>
                <Ionicons name={order.icon as any} size={22} color={order.color} />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderService} numberOfLines={1}>
                  {order.service}
                </Text>
                <Text style={styles.orderId}>{order.id}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: STATUS_BG[order.status] },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: STATUS_COLORS[order.status] },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: STATUS_COLORS[order.status] },
                  ]}
                >
                  {order.statusLabel}
                </Text>
              </View>
            </View>

            {order.nextAction && order.status !== 'completed' && (
              <View style={styles.nextActionRow}>
                <Ionicons name="alert-circle-outline" size={14} color={Colors.warning} />
                <Text style={styles.nextActionText}>{order.nextAction}</Text>
              </View>
            )}

            <View style={styles.orderBottom}>
              <View style={styles.orderMeta}>
                <Ionicons name="calendar-outline" size={13} color={Colors.textMuted} />
                <Text style={styles.orderMetaText}>{order.date}</Text>
              </View>
              <View style={styles.orderMeta}>
                <Ionicons name="pricetag-outline" size={13} color={Colors.textMuted} />
                <Text style={styles.orderMetaText}>{order.amount}</Text>
              </View>
              <View style={styles.orderArrow}>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.emptyHint}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.textMuted} />
          <Text style={styles.emptyHintText}>
            Book a new service to see it tracked here
          </Text>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[order.color, order.color + 'BB']}
        style={styles.detailHeader}
      >
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.detailHeaderContent}>
          <View style={styles.detailIcon}>
            <Ionicons name={order.icon as any} size={28} color={order.color} />
          </View>
          <Text style={styles.detailService}>{order.service}</Text>
          <Text style={styles.detailId}>{order.id}</Text>
          <View
            style={[styles.detailStatusBadge, { backgroundColor: STATUS_BG[order.status] }]}
          >
            <Text style={[styles.detailStatusText, { color: STATUS_COLORS[order.status] }]}>
              {order.statusLabel}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Progress</Text>
          {order.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <View
                  style={[
                    styles.stepCircle,
                    step.done
                      ? styles.stepCircleDone
                      : step.active
                      ? { borderColor: order.color, borderWidth: 2.5 }
                      : styles.stepCirclePending,
                  ]}
                >
                  {step.done ? (
                    <Ionicons name="checkmark" size={13} color={Colors.white} />
                  ) : step.active ? (
                    <View style={[styles.stepActiveDot, { backgroundColor: order.color }]} />
                  ) : null}
                </View>
                {i < order.steps.length - 1 && (
                  <View
                    style={[
                      styles.stepConnector,
                      step.done ? { backgroundColor: Colors.accent } : null,
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.stepText,
                  step.done ? styles.stepTextDone : step.active ? { color: order.color, fontWeight: '700' } : styles.stepTextPending,
                ]}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Details */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Order Details</Text>
          {[
            { label: 'Order ID', value: order.id },
            { label: 'Service', value: order.service },
            { label: 'Date', value: order.date },
            { label: 'Amount Paid', value: order.amount },
            { label: 'Assigned To', value: order.assignedTo || 'Pending' },
          ].map((row, i) => (
            <View key={i} style={styles.detailRow}>
              <Text style={styles.detailRowLabel}>{row.label}</Text>
              <Text style={styles.detailRowValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Support */}
        <View style={[styles.detailCard, styles.supportCard]}>
          <Ionicons name="headset-outline" size={24} color={Colors.primary} />
          <View style={styles.supportText}>
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportSubtitle}>Chat with your assigned expert</Text>
          </View>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
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
  },
  list: {
    padding: 20,
    gap: 12,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  orderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderService: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  orderId: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  nextActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
  },
  nextActionText: {
    fontSize: 12,
    color: Colors.warning,
    fontWeight: '600',
  },
  orderBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderMetaText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  orderArrow: {
    marginLeft: 'auto',
  },
  emptyHint: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
    marginTop: 8,
  },
  emptyHintText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  detailHeader: {
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
  detailHeaderContent: {
    alignItems: 'center',
  },
  detailIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailService: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  detailId: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  detailStatusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  detailStatusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  detailContent: {
    padding: 20,
    gap: 16,
  },
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  detailCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepLeft: {
    alignItems: 'center',
    width: 24,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stepCircleDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  stepCirclePending: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  stepActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepConnector: {
    width: 2,
    height: 28,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  stepText: {
    fontSize: 14,
    paddingTop: 3,
    flex: 1,
  },
  stepTextDone: {
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  stepTextPending: {
    color: Colors.textMuted,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailRowLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailRowValue: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  supportSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  supportButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  supportButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
