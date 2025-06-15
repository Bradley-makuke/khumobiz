import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';

// Preloaded sample data
const businessHealth = {
  score: 78,
  limit: 18000,
  used: 6000,
  qrSalesAvg: 1500,
};

const suppliers = [
  { id: 'sup1', name: 'BeautyLink', category: 'Beauty', avgOrder: 3200 },
  { id: 'sup2', name: 'AgriPlus', category: 'Agriculture', avgOrder: 8500 },
];

const repaymentOptions = [
  { days: 30, feePercent: 2.5 },
  { days: 60, feePercent: 3.5 },
  { days: 90, feePercent: 4.5 },
];

const BNPLTab = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [purposeText, setPurposeText] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(repaymentOptions[0]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate derived values
  const calculateFee = () => {
    return (amount * selectedTerm.feePercent / 100).toFixed(2);
  };

  const availableCredit = businessHealth.limit - businessHealth.used;

  // Mock AI verification
  const verifySupplier = (supplierName) => {
    return suppliers.find(sup => sup.name.toLowerCase().includes(supplierName.toLowerCase()));
  };

  // Render functions for each tab view
  const renderDashboard = () => (
    <View style={styles.section}>
      <Text style={styles.title}>BNPL Dashboard</Text>
      
      {/* Health Score */}
      <View style={styles.card}>
        <Text>Business Health Score</Text>
        <Text style={styles.score}>{businessHealth.score}%</Text>
        <Text>Available credit: P{availableCredit.toLocaleString()}</Text>
      </View>

      {/* Quick Actions */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setActiveTab('supplier')}
      >
        <Text style={styles.buttonText}>Pay Supplier Now</Text>
      </TouchableOpacity>

      {/* Recent Transactions (mock) */}
      <Text style={styles.subtitle}>Recent Transactions</Text>
      <View style={styles.card}>
        <Text>BeautyLink - P3,200</Text>
        <Text>Due in 15 days</Text>
      </View>
    </View>
  );

  const renderSupplierSetup = () => (
    <View style={styles.section}>
      <Text style={styles.title}>Pay Supplier</Text>
      
      {/* Supplier Search */}
      <TextInput
        style={styles.input}
        placeholder="Supplier name or FNB account"
        onChangeText={(text) => {
          const found = verifySupplier(text);
          setSelectedSupplier(found);
        }}
      />
      
      {selectedSupplier && (
        <View style={styles.card}>
          <Text>✅ Verified: {selectedSupplier.name}</Text>
          <Text>Category: {selectedSupplier.category}</Text>
        </View>
      )}

      {/* Purpose */}
      <TextInput
        style={styles.input}
        placeholder="Purpose (e.g. 'Hair products')"
        value={purposeText}
        onChangeText={setPurposeText}
      />

      {/* Amount */}
      <TextInput
        style={styles.input}
        placeholder="Amount (P)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setActiveTab('offer')}
        disabled={!selectedSupplier || !amount}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOffer = () => (
    <View style={styles.section}>
      <Text style={styles.title}>BNPL Offer</Text>
      
      <Text>Pay {selectedSupplier?.name}: P{amount}</Text>
      
      {/* Repayment Options */}
      <Text style={styles.subtitle}>Choose repayment term:</Text>
      {repaymentOptions.map(option => (
        <TouchableOpacity 
          key={option.days}
          style={[
            styles.termCard,
            selectedTerm.days === option.days && styles.selectedTerm
          ]}
          onPress={() => setSelectedTerm(option)}
        >
          <Text>{option.days} days</Text>
          <Text>Fee: {option.feePercent}% (P{calculateFee()})</Text>
        </TouchableOpacity>
      ))}

      {/* Auto-repayment toggle */}
      <View style={styles.toggleRow}>
        <Text>Auto-repay from QR sales</Text>
        <View style={styles.toggle}></View>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setShowSuccess(true)}
      >
        <Text style={styles.buttonText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'supplier' && styles.activeTab]}
          onPress={() => setActiveTab('supplier')}
        >
          <Text>Pay Supplier</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'supplier' && renderSupplierSetup()}
      {activeTab === 'offer' && renderOffer()}

      {/* Success Modal */}
      <Modal visible={showSuccess} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Payment Successful!</Text>
          <Text>P{amount} sent to {selectedSupplier?.name}</Text>
          <Text>Repayment due in {selectedTerm.days} days</Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => {
              setShowSuccess(false);
              setActiveTab('dashboard');
              // Reset form
              setSelectedSupplier(null);
              setPurposeText('');
              setAmount('');
            }}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    padding: 12,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007A7C',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007A7C',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FF9D',
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  primaryButton: {
    backgroundColor: '#007A7C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTerm: {
    borderColor: '#007A7C',
    backgroundColor: '#e6f7f7',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 12,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    padding: 2,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007A7C',
  },
});

export default BNPLTab;