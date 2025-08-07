import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { DocumentData } from 'firebase/firestore'; // ✅ Use type-only import

// GET ALL PRODUCTS
export const getAllProducts = async (): Promise<DocumentData[]> => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// GET SINGLE PRODUCT
export const getProductById = async (id: string): Promise<DocumentData | null> => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// ADD NEW PRODUCT
export const addProduct = async (product: {
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}) => {
  const newDocRef = doc(collection(db, 'products'));
  await setDoc(newDocRef, { ...product });
  return newDocRef.id;
};

// UPDATE PRODUCT
export const updateProduct = async (id: string, updatedData: Partial<DocumentData>) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, updatedData);
};

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};
