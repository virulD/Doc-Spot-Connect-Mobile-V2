import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface TimeSlotProps {
  date: string; // ISO string or formatted date
  time: string;
  onSelect: () => void;
}

const TimeSlotComponent: React.FC<TimeSlotProps> = ({ date, time, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.timeText}>{time}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default TimeSlotComponent; 