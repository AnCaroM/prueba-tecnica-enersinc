import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosClient';

const response = await axios.get('personas/');
const API_URL = response.data;

// 1. Acción asíncrona para obtener personas (GET) 
export const fetchPersonas = createAsyncThunk(
    'personas/fetchPersonas',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

// 2. Acción asíncrona para crear persona (POST) [cite: 19]
export const addPersona = createAsyncThunk(
    'personas/addPersona',
    async (nuevaPersona) => {
        const response = await axios.post(API_URL, nuevaPersona);
        return response.data;
    }
);

// (Aquí agregarías deletePersona y updatePersona siguiendo el mismo patrón)

const personasSlice = createSlice({
    name: 'personas',
    initialState: {
        data: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Casos para fetchPersonas
            .addCase(fetchPersonas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPersonas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPersonas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Casos para addPersona
            .addCase(addPersona.fulfilled, (state, action) => {
                state.data.push(action.payload); // Actualizamos estado sin recargar
            })
            .addCase(deletePersona.fulfilled, (state, action) => {
                // Filtramos la lista para quitar el ID eliminado
                state.data = state.data.filter((persona) => persona.id !== action.payload);
            })
            .addCase(updatePersona.fulfilled, (state, action) => {
                const index = state.data.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Actualizamos el item en la lista local
                }
            });
    },
});

// Acción para eliminar
export const deletePersona = createAsyncThunk(
    'personas/deletePersona',
    async (id) => {
        await axios.delete(`personas/${id}/`); // Usa tu instancia de axiosClient
        return id;
    }
);

// Acción para actualizar (PUT)
export const updatePersona = createAsyncThunk(
    'personas/updatePersona',
    async (personaActualizada) => {
        const { id, ...data } = personaActualizada;
        // Petición PUT al backend
        const response = await axios.put(`personas/${id}/`, data);
        return response.data;
    }
);

export default personasSlice.reducer;