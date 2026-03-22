import axiosInstance from './axiosInstance';
import { Product } from '@/types/product';

export const productApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await axiosInstance.get<Product[]>('/product');
        return response.data;
    },
    
    getById: async (id: number): Promise<Product> => {
        const response = await axiosInstance.get<Product>(`/product/${id}`);
        return response.data;
    },
    
    create: async (product: Partial<Product>): Promise<Product> => {
        const response = await axiosInstance.post<Product>('/product', product);
        return response.data;
    },
    
    update: async (id: number, product: Partial<Product>): Promise<Product> => {
        const response = await axiosInstance.put<Product>(`/product/${id}`, product);
        return response.data;
    },
    
    delete: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/product/${id}`);
    },
};
