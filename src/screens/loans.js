import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Loans = () => {
  const [pendingLoans, setPendingLoans] = useState(2);
  const [revenue, setRevenue] = useState(15000);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Loan eligibility is 30% of monthly revenue
  const loanEligibility = Math.floor(revenue * 0.3);
  
  const loanOptions = [
    {
      id: 1,
      title: 'Basic Loan',
      amount: Math.floor(loanEligibility * 0.5),
      interestRate: '8%',
      duration: '6 months',
      totalRepayment: Math.floor(loanEligibility * 0.5 * 1.08),
      monthlyPayment: Math.floor((loanEligibility * 0.5 * 1.08) / 6),
    },
    {
      id: 2,
      title: 'Standard Loan',
      amount: Math.floor(loanEligibility * 0.75),
      interestRate: '7%',
      duration: '9 months',
      totalRepayment: Math.floor(loanEligibility * 0.75 * 1.07),
      monthlyPayment: Math.floor((loanEligibility * 0.75 * 1.07) / 9),
    },
    {
      id: 3,
      title: 'Premium Loan',
      amount: loanEligibility,
      interestRate: '6%',
      duration: '12 months',
      totalRepayment: Math.floor(loanEligibility * 1.06),
      monthlyPayment: Math.floor((loanEligibility * 1.06) / 12),
    },
  ];

  const calculateEndDate = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleApplyLoan = (loan) => {
    setSelectedLoan(loan);
    setShowConfirmModal(true);
  };

  const confirmLoanApplication = () => {
    setShowConfirmModal(false);
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      setPendingLoans(prev => prev + 1);
      
      // Auto close success modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#00A693', '#00A693']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Loans</Text>
      </LinearGradient>

      {/* Top Cards */}
      <View style={styles.topCardsContainer}>
        <View style={styles.topCard}>
          <Text style={styles.topCardTitle}>Pending Loans</Text>
          <Text style={styles.topCardValue}>{pendingLoans}</Text>
        </View>
        
        <View style={styles.topCard}>
          <Text style={styles.topCardTitle}>Loan Eligible</Text>
          <Text style={styles.topCardValue}>P{loanEligibility.toLocaleString()}</Text>
        </View>
      </View>

      {/* Loan Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.loanOptionsContainer}
      >
        {loanOptions.map((loan) => (
          <View key={loan.id} style={styles.loanCard}>
            <Text style={styles.loanTitle}>{loan.title}</Text>
            <Text style={styles.loanAmount}>P{loan.amount.toLocaleString()}</Text>
            
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Interest:</Text>
              <Text style={styles.loanDetailValue}>{loan.interestRate}</Text>
            </View>
            
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Monthly:</Text>
              <Text style={styles.loanDetailValue}>P{loan.monthlyPayment.toLocaleString()}</Text>
            </View>
            
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Total:</Text>
              <Text style={styles.loanDetailValue}>P{loan.totalRepayment.toLocaleString()}</Text>
            </View>
            
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Ends:</Text>
              <Text style={styles.loanDetailValue}>{calculateEndDate(parseInt(loan.duration))}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => handleApplyLoan(loan)}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Confirm Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Loan Application</Text>
            
            {selectedLoan && (
              <>
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>Amount:</Text>
                  <Text style={styles.modalDetailValue}>P{selectedLoan.amount.toLocaleString()}</Text>
                </View>
                
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>Interest:</Text>
                  <Text style={styles.modalDetailValue}>{selectedLoan.interestRate}</Text>
                </View>
                
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>Duration:</Text>
                  <Text style={styles.modalDetailValue}>{selectedLoan.duration}</Text>
                </View>
                
                <View style={styles.modalDetailRow}>
                  <Text style={styles.modalDetailLabel}>Total Repayment:</Text>
                  <Text style={styles.modalDetailValue}>P{selectedLoan.totalRepayment.toLocaleString()}</Text>
                </View>
              </>
            )}
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLoanApplication}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Processing Indicator */}
      {isProcessing && (
        <View style={styles.processingContainer}>
          <View style={styles.processingContent}>
            <ActivityIndicator size="large" color="#00A693" />
            <Text style={styles.processingText}>Processing your loan application...</Text>
          </View>
        </View>
      )}

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.successModalContent]}>
            <Text style={styles.successModalTitle}>Loan Approved!</Text>
            <Text style={styles.successModalText}>Your loan application has been successfully submitted.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  topCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    gap: 15,
  },
  topCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: Dimensions.get('window').width / 2.2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topCardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  topCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A693',
  },
  loanOptionsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  loanCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A693',
    marginBottom: 5,
  },
  loanAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  loanDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loanDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  loanDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#F3971D',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: Dimensions.get('window').width * 0.85,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A693',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalDetailLabel: {
    fontSize: 16,
    color: '#666',
  },
  modalDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#00A693',
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  processingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  processingContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
  },
  processingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  successModalContent: {
    alignItems: 'center',
    padding: 30,
  },
  successModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00A693',
    marginBottom: 10,
  },
  successModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Loans;