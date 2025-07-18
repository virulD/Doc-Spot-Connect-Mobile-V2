import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor } from './models/doctor';
import { Dispensary } from './models/dispensary';
import { DoctorService } from './services/DoctorService';
import DispensaryService from './services/DispensaryService';

interface DataContextType {
  doctors: Doctor[];
  dispensaries: Dispensary[];
  loading: boolean;
  error: string | null;
  addDoctor: (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  addDispensary: (dispensary: Omit<Dispensary, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within a DataProvider');
  return ctx;
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [doctorsData, dispensariesData] = await Promise.all([
        DoctorService.getAllDoctors(),
        DispensaryService.getAllDispensaries()
      ]);
      
      setDoctors(doctorsData);
      setDispensaries(dispensariesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDoctor = await DoctorService.addDoctor(doctor);
      setDoctors(prev => [...prev, newDoctor]);
    } catch (err) {
      console.error('Error adding doctor:', err);
      throw new Error('Failed to add doctor');
    }
  };

  const addDispensary = async (dispensary: Omit<Dispensary, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDispensary = await DispensaryService.addDispensary(dispensary);
      setDispensaries(prev => [...prev, newDispensary]);
    } catch (err) {
      console.error('Error adding dispensary:', err);
      throw new Error('Failed to add dispensary');
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ 
      doctors, 
      dispensaries, 
      loading, 
      error, 
      addDoctor, 
      addDispensary, 
      refreshData 
    }}>
      {children}
    </DataContext.Provider>
  );
} 