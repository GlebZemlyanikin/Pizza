import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, SearchPizzaParams } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, search, category, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://659a9e6f652b843dea53cc6b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
		);
		return data;
	},
);
