import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

interface Dispensary {
  _id?: string;
  id?: string;
  name: string;
  address?: string;
  // Add other fields as needed
}

export default function ManageDispensariesScreen() {
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:5001/api/dispensaries')
      .then(res => setDispensaries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>All Dispensaries</Text>
      <FlatList
        data={dispensaries}
        keyExtractor={item => item._id || item.id || item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.address}</Text>
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