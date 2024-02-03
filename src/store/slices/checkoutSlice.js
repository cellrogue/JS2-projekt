import { createSlice } from '@reduxjs/toolkit';

export const checkoutSlice = createSlice({
    name: 'itemsInCheckout',
    initialState: {value: [], totalPrice: 0},
    reducers: {
        addToCheckout: (state, action) => {
            const index = state.value.findIndex(item => item.id === action.payload.id);
            if(index !== -1) {
                state.value[index].quantity += 1;
            } else {
                state.value.push(action.payload)
            }
        },
        removeFromCheckout: (state, action) => {
            const index = state.value.findIndex(item => item.id === action.payload);
            state.value[index].quantity -= 1;
            if(state.value[index].quantity === 0) {
                state.value = state.value.filter(x => x.id !== action.payload)
            }
            
        },
        clearAllCheckout: (state) => {
            state.value = []
        },
    }
})

export const { addToCheckout, removeFromCheckout, clearAllCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;