import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.110.65:5000'; 
const screenWidth = Dimensions.get('window').width;

export default function Analytics({ goBack, businessId = 12 }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [businessId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/analytics/${businessId}`);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A693" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Sales Analytics</Text>

      {/* Metrics Cards */}
      <View style={styles.metricsContainer}>
        <MetricCard 
          title="Total Revenue" 
          value={`₱${data.metrics.total_revenue.toLocaleString()}`} 
        />
        <MetricCard 
          title="Conversion Rate" 
          value={`${data.metrics.conversion_rate}%`} 
        />
        <MetricCard 
          title="Top Product" 
          value={data.metrics.top_product} 
        />
        <MetricCard 
          title="Top Payment" 
          value={data.metrics.top_payment} 
        />
      </View>

      {/* Monthly Sales Chart */}
      <ChartSection title="Monthly Sales">
        <LineChart
          data={{
            labels: data.charts.monthly_sales.labels,
            datasets: [{ data: data.charts.monthly_sales.data }]
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="₱"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </ChartSection>

      {/* Top Products Chart */}
      <ChartSection title="Top Products">
        <BarChart
          data={{
            labels: data.charts.top_products.labels,
            datasets: [{ data: data.charts.top_products.data }]
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="₱"
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </ChartSection>

      {/* Payment Methods Chart */}
      <ChartSection title="Payment Methods">
        <PieChart
          data={data.charts.payment_methods}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </ChartSection>

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const MetricCard = ({ title, value }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const ChartSection = ({ title, children }) => (
  <View style={styles.chartSection}>
    <Text style={styles.chartTitle}>{title}</Text>
    {children}
  </View>
);

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 166, 147, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#00A693',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
   
  },
  content: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 40,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00A693',
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
     paddingLeft: 5,
     paddingRight: 5,
  },
  metricCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A693',
  },
  chartSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  
    alignSelf: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00A693',
  },
  chart: {
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: '#00A693',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#00A693',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
  },
});