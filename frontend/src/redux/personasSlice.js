import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axiosClient';

// --- ACCIONES ASÍNCRONAS ---

// 1. Obtener personas (GET)
export const fetchPersonas = createAsyncThunk(
    'personas/fetchPersonas',
    async () => {
        // Usamos solo 'personas/' porque axiosClient ya tiene la base URL
        const response = await axios.get('personas/');
        return response.data;
    }
);

// 2. Crear persona (POST)
export const addPersona = createAsyncThunk(
    'personas/addPersona',
    async (nuevaPersona) => {
        const response = await axios.post('personas/', nuevaPersona);
        return response.data;
    }
);

// 3. Eliminar persona (DELETE)
export const deletePersona = createAsyncThunk(
    'personas/deletePersona',
    async (id) => {
        await axios.delete(`personas/${id}/`);
        return id;
    }
);

// 4. Actualizar persona (PUT)
export const updatePersona = createAsyncThunk(
    'personas/updatePersona',
    async (personaActualizada) => {
        const { id, ...data } = personaActualizada;
        const response = await axios.put(`personas/${id}/`, data);
        return response.data;
    }
);

// --- SLICE (REDUCER) ---

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
            // Fetch
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
            // Add
            .addCase(addPersona.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            // Delete
            .addCase(deletePersona.fulfilled, (state, action) => {
                state.data = state.data.filter((persona) => persona.id !== action.payload);
            })
            // Update
            .addCase(updatePersona.fulfilled, (state, action) => {
                const index = state.data.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            });
    },
});

export default personasSlice.reducer;