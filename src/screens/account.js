import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Account = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [selectedReceiveMethod, setSelectedReceiveMethod] = useState(null);

  // Sample data
  const accountInfo = {
    businessName: "HisEnterprise",
    accountNumber: "0244567890",
    balance: "P12,450.50"
  };

  const transactions = [
    { id: 1, type: 'POS', amount: 'P150.00', date: 'Today, 10:45 AM', status: 'completed' },
    { id: 2, type: 'Receive', amount: 'P500.00', date: 'Yesterday, 2:30 PM', status: 'completed' },
    { id: 3, type: 'POS', amount: 'P75.50', date: 'Mar 12, 9:15 AM', status: 'completed' },
  ];

  const receiveMethods = [
    { id: 'qr', name: 'QR Code', icon: 'qr-code' },
    { id: 'bank', name: 'Bank Transfer', icon: 'bank' },
    { id: 'mobile', name: 'Mobile Money', icon: 'phone-portrait' },
    { id: 'card', name: 'Virtual Card', icon: 'card' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Account Header */}
      <View style={styles.accountHeader}>
        <View>
          <Text style={styles.businessName}>{accountInfo.businessName}</Text>
          <Text style={styles.accountNumber}>Account: {accountInfo.accountNumber}</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="#333" />
      </View>

      {/* Account Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Account Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {balanceVisible ? accountInfo.balance : '••••••'}
          </Text>
          <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
            <Ionicons 
              name={balanceVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={24} 
              color="#555" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Receive Money Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📥 Receive Money</Text>
        <View style={styles.methodsContainer}>
          {receiveMethods.map(method => (
            <TouchableOpacity 
              key={method.id}
              style={[
                styles.methodButton,
                selectedReceiveMethod === method.id && styles.methodButtonSelected
              ]}
              onPress={() => setSelectedReceiveMethod(method.id)}
            >
              <Ionicons name={method.icon} size={24} color="#333" />
              <Text style={styles.methodText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {transactions.map(transaction => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Ionicons 
                name={transaction.type === 'POS' ? 'receipt-outline' : 'download-outline'} 
                size={20} 
                color="#fff" 
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>
                {transaction.type === 'POS' ? 'POS Payment' : 'Money Received'}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginTop:"5%",
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  accountNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#0066cc',
    fontSize: 14,
  },
  methodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  methodButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  methodButtonSelected: {
    borderWidth: 1,
    borderColor: '#0066cc',
    backgroundColor: '#e6f2ff',
  },
  methodText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  transactionIcon: {
    backgroundColor: '#0066cc',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Account;