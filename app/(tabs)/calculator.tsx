import React, { useState, useCallback } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

type TaxRegime = 'new' | 'old';
type AgeGroup = 'below60' | '60to80' | 'above80';

const DEDUCTIONS = [
  { key: 'section80C', label: 'Section 80C', maxLimit: 150000, desc: 'PF, PPF, LIC, ELSS, etc.' },
  { key: 'section80D', label: 'Section 80D', maxLimit: 50000, desc: 'Health insurance premium' },
  { key: 'hra', label: 'HRA Exemption', maxLimit: 0, desc: 'House Rent Allowance' },
  { key: 'nps', label: 'NPS (80CCD 1B)', maxLimit: 50000, desc: 'National Pension Scheme' },
  { key: 'homeLoan', label: 'Home Loan Interest (24b)', maxLimit: 200000, desc: 'Interest on home loan' },
];

function calculateTax(income: number, regime: TaxRegime, age: AgeGroup, deductions: number): {
  tax: number;
  surcharge: number;
  cess: number;
  total: number;
  taxableIncome: number;
  effectiveRate: number;
  slabs: { range: string; rate: string; tax: number }[];
} {
  let taxableIncome = income;
  let slabs: { range: string; rate: string; tax: number }[] = [];
  let tax = 0;

  if (regime === 'new') {
    // New tax regime FY 2024-25
    taxableIncome = Math.max(0, income - 75000); // Standard deduction
    const newSlabs = [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 700000, rate: 0.05 },
      { min: 700000, max: 1000000, rate: 0.10 },
      { min: 1000000, max: 1200000, rate: 0.15 },
      { min: 1200000, max: 1500000, rate: 0.20 },
      { min: 1500000, max: Infinity, rate: 0.30 },
    ];

    newSlabs.forEach((slab) => {
      if (taxableIncome > slab.min) {
        const amount = Math.min(taxableIncome, slab.max === Infinity ? taxableIncome : slab.max) - slab.min;
        const slabTax = amount * slab.rate;
        tax += slabTax;
        slabs.push({
          range: slab.max === Infinity ? `Above ₹${(slab.min / 100000).toFixed(0)}L` : `₹${(slab.min / 100000).toFixed(0)}L - ₹${(slab.max / 100000).toFixed(0)}L`,
          rate: `${slab.rate * 100}%`,
          tax: slabTax,
        });
      }
    });

    // Rebate under 87A for income up to ₹7L
    if (taxableIncome <= 700000) tax = 0;
  } else {
    // Old tax regime
    taxableIncome = Math.max(0, income - Math.min(deductions, 350000) - 50000); // 50k standard deduction

    let exemptLimit = 250000;
    if (age === '60to80') exemptLimit = 300000;
    if (age === 'above80') exemptLimit = 500000;

    const oldSlabs = [
      { min: 0, max: exemptLimit, rate: 0, label: `Up to ₹${exemptLimit / 100000}L` },
      { min: exemptLimit, max: 500000, rate: 0.05, label: `₹${exemptLimit / 100000}L - ₹5L` },
      { min: 500000, max: 1000000, rate: 0.20, label: '₹5L - ₹10L' },
      { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
    ];

    oldSlabs.forEach((slab) => {
      if (taxableIncome > slab.min) {
        const amount = Math.min(taxableIncome, slab.max === Infinity ? taxableIncome : slab.max) - slab.min;
        const slabTax = amount * slab.rate;
        tax += slabTax;
        slabs.push({
          range: slab.label,
          rate: `${slab.rate * 100}%`,
          tax: slabTax,
        });
      }
    });

    // Rebate under 87A for income up to ₹5L
    if (taxableIncome <= 500000) tax = 0;
  }

  // Surcharge
  let surcharge = 0;
  if (income > 10000000) surcharge = tax * 0.15;
  else if (income > 5000000) surcharge = tax * 0.10;

  const cess = (tax + surcharge) * 0.04;
  const total = tax + surcharge + cess;
  const effectiveRate = income > 0 ? (total / income) * 100 : 0;

  return { tax, surcharge, cess, total, taxableIncome, effectiveRate, slabs };
}

export default function CalculatorScreen() {
  const [regime, setRegime] = useState<TaxRegime>('new');
  const [age, setAge] = useState<AgeGroup>('below60');
  const [annualIncome, setAnnualIncome] = useState('');
  const [deductionValues, setDeductionValues] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateTax> | null>(null);

  const totalDeductions = DEDUCTIONS.reduce((acc, d) => {
    const val = parseInt(deductionValues[d.key] || '0') || 0;
    const maxed = d.maxLimit > 0 ? Math.min(val, d.maxLimit) : val;
    return acc + maxed;
  }, 0);

  const handleCalculate = () => {
    const income = parseInt(annualIncome.replace(/,/g, '')) || 0;
    if (!income) return;
    const res = calculateTax(income, regime, age, totalDeductions);
    setResult(res);
    setShowResult(true);
  };

  const formatCurrency = (val: number) =>
    `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient colors={['#1A3C8F', '#2A5BC9']} style={styles.header}>
        <Text style={styles.headerTitle}>Tax Calculator</Text>
        <Text style={styles.headerSubtitle}>FY 2024-25 (AY 2025-26)</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Regime Toggle */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Select Tax Regime</Text>
          <View style={styles.regimeToggle}>
            <TouchableOpacity
              style={[styles.regimeOption, regime === 'new' && styles.regimeOptionActive]}
              onPress={() => { setRegime('new'); setShowResult(false); }}
            >
              <Text style={[styles.regimeText, regime === 'new' && styles.regimeTextActive]}>
                New Regime
              </Text>
              {regime === 'new' && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Recommended</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.regimeOption, regime === 'old' && styles.regimeOptionActive]}
              onPress={() => { setRegime('old'); setShowResult(false); }}
            >
              <Text style={[styles.regimeText, regime === 'old' && styles.regimeTextActive]}>
                Old Regime
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.regimeNote}>
            {regime === 'new'
              ? 'Lower slab rates, no deductions/exemptions except ₹75,000 standard deduction'
              : 'Higher slab rates but allows deductions (80C, 80D, HRA, etc.)'}
          </Text>
        </View>

        {/* Age Group */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Age Group</Text>
          <View style={styles.ageButtons}>
            {([
              { key: 'below60', label: 'Below 60' },
              { key: '60to80', label: '60 - 80' },
              { key: 'above80', label: 'Above 80' },
            ] as { key: AgeGroup; label: string }[]).map((a) => (
              <TouchableOpacity
                key={a.key}
                style={[styles.ageButton, age === a.key && styles.ageButtonActive]}
                onPress={() => { setAge(a.key); setShowResult(false); }}
              >
                <Text style={[styles.ageButtonText, age === a.key && styles.ageButtonTextActive]}>
                  {a.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Annual Income */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Annual Income (Gross)</Text>
          <View style={styles.incomeInput}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.incomeTextInput}
              placeholder="e.g. 1200000"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              value={annualIncome}
              onChangeText={(t) => { setAnnualIncome(t); setShowResult(false); }}
            />
          </View>
          {annualIncome ? (
            <Text style={styles.incomeInWords}>
              {formatCurrency(parseInt(annualIncome.replace(/,/g, '')) || 0)} per year
            </Text>
          ) : null}
        </View>

        {/* Deductions (Old Regime only) */}
        {regime === 'old' && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Deductions & Exemptions</Text>
            {DEDUCTIONS.map((d) => (
              <View key={d.key} style={styles.deductionRow}>
                <View style={styles.deductionInfo}>
                  <Text style={styles.deductionLabel}>{d.label}</Text>
                  <Text style={styles.deductionDesc}>{d.desc}</Text>
                  {d.maxLimit > 0 && (
                    <Text style={styles.deductionMax}>Max: {formatCurrency(d.maxLimit)}</Text>
                  )}
                </View>
                <View style={styles.deductionInput}>
                  <Text style={styles.deductionPrefix}>₹</Text>
                  <TextInput
                    style={styles.deductionTextInput}
                    placeholder="0"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="numeric"
                    value={deductionValues[d.key] || ''}
                    onChangeText={(t) => {
                      setDeductionValues((prev) => ({ ...prev, [d.key]: t }));
                      setShowResult(false);
                    }}
                  />
                </View>
              </View>
            ))}
            <View style={styles.totalDeductionRow}>
              <Text style={styles.totalDeductionLabel}>Total Deductions</Text>
              <Text style={styles.totalDeductionValue}>{formatCurrency(totalDeductions)}</Text>
            </View>
          </View>
        )}

        {/* Calculate Button */}
        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <LinearGradient
            colors={['#1A3C8F', '#2A5BC9']}
            style={styles.calculateGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="calculator" size={20} color="#fff" />
            <Text style={styles.calculateText}>Calculate Tax</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Results */}
        {showResult && result && (
          <>
            {/* Summary Cards */}
            <View style={styles.resultSummary}>
              <LinearGradient colors={['#1A3C8F', '#2A5BC9']} style={styles.totalTaxCard}>
                <Text style={styles.totalTaxLabel}>Total Tax Payable</Text>
                <Text style={styles.totalTaxValue}>{formatCurrency(result.total)}</Text>
                <Text style={styles.totalTaxRate}>
                  Effective Rate: {result.effectiveRate.toFixed(1)}%
                </Text>
              </LinearGradient>

              <View style={styles.resultMiniCards}>
                <View style={styles.miniCard}>
                  <Text style={styles.miniCardLabel}>Taxable Income</Text>
                  <Text style={styles.miniCardValue}>{formatCurrency(result.taxableIncome)}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={styles.miniCardLabel}>Base Tax</Text>
                  <Text style={styles.miniCardValue}>{formatCurrency(result.tax)}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={styles.miniCardLabel}>Surcharge</Text>
                  <Text style={styles.miniCardValue}>{formatCurrency(result.surcharge)}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={styles.miniCardLabel}>Cess (4%)</Text>
                  <Text style={styles.miniCardValue}>{formatCurrency(result.cess)}</Text>
                </View>
              </View>
            </View>

            {/* Tax Slabs Breakdown */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Tax Slab Breakdown</Text>
              {result.slabs.filter((s) => s.tax > 0).map((slab, i) => (
                <View key={i} style={styles.slabRow}>
                  <View style={styles.slabInfo}>
                    <Text style={styles.slabRange}>{slab.range}</Text>
                    <Text style={styles.slabRate}>@ {slab.rate}</Text>
                  </View>
                  <Text style={styles.slabTax}>{formatCurrency(slab.tax)}</Text>
                </View>
              ))}
              {result.slabs.filter((s) => s.tax > 0).length === 0 && (
                <View style={styles.zeroTaxCard}>
                  <Ionicons name="checkmark-circle" size={32} color={Colors.accent} />
                  <Text style={styles.zeroTaxTitle}>No Tax Payable!</Text>
                  <Text style={styles.zeroTaxSubtitle}>
                    Your income is within the tax-free limit or rebate under 87A applies.
                  </Text>
                </View>
              )}
            </View>

            {/* CTA */}
            <View style={styles.ctaCard}>
              <Ionicons name="document-text-outline" size={28} color={Colors.primary} />
              <Text style={styles.ctaTitle}>File Your ITR with Experts</Text>
              <Text style={styles.ctaSubtitle}>
                Let our CAs handle your ITR filing accurately. Starting at just ₹499.
              </Text>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>File ITR Now</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </>
        )}

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
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  regimeToggle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  regimeOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
  },
  regimeOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: '#EEF2FF',
  },
  regimeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  regimeTextActive: {
    color: Colors.primary,
  },
  recommendedBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },
  regimeNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  ageButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  ageButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
  },
  ageButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: '#EEF2FF',
  },
  ageButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  ageButtonTextActive: {
    color: Colors.primary,
  },
  incomeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  currencySymbol: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    backgroundColor: Colors.surfaceAlt,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  incomeTextInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  incomeInWords: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
  deductionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  deductionInfo: {
    flex: 1,
    marginRight: 12,
  },
  deductionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  deductionDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  deductionMax: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  deductionInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 8,
    width: 110,
  },
  deductionPrefix: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  deductionTextInput: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  totalDeductionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
  },
  totalDeductionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  totalDeductionValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  calculateButton: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calculateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  calculateText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  resultSummary: {
    gap: 12,
  },
  totalTaxCard: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
  },
  totalTaxLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  totalTaxValue: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 6,
  },
  totalTaxRate: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  resultMiniCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  miniCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    width: (width - 50) / 2,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  miniCardLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  miniCardValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  slabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  slabInfo: {
    flex: 1,
  },
  slabRange: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  slabRate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  slabTax: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  zeroTaxCard: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  zeroTaxTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.accent,
  },
  zeroTaxSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  ctaCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 4,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
