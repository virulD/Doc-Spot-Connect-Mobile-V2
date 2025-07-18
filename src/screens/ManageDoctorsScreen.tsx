import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

interface Doctor {
  _id?: string;
  id?: string;
  name: string;
  specialization?: string;
  // Add other fields as needed
}

export default function ManageDoctorsScreen() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:5001/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>All Doctors</Text>
      <FlatList
        data={doctors}
        keyExtractor={item => item._id || item.id || item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.specialization}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontWeight: 'bold', fontSize: 16 },
}); 