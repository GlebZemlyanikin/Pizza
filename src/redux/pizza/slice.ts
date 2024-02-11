import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pizza, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncAction';

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Pizza[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
				state.status = Status.SUCCESS;
				state.items = action.payload;
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
