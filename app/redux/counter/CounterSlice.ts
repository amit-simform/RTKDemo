/* eslint-disable require-jsdoc */
/* eslint-disable no-restricted-syntax */

import {
  createSlice,
  type PayloadAction,
  isAnyOf,
  isAsyncThunkAction,
  isRejectedWithValue,
  createAsyncThunk,
  createAction,
  isAllOf,
  isPending,
  isFulfilled,
  isRejected
} from '@reduxjs/toolkit';
import type { RootStateType } from '../Store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

export const manualIncrement = createAction<number>('increment/manual');

export const incrementAsync = createAsyncThunk(
  'incrementAsync',
  async (amount: number, { rejectWithValue }) => {
    // this is just for example purposes, to reject the operation sometimes
    if (Math.random() < 0.25) {
      console.log('Action Got Rejected');
      return rejectWithValue({ error: 'Random math error!' });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return amount;
  }
);

export const anotherAsyncThunk = createAsyncThunk('anotherAsyncThunk', async () => {
  return 'This is a independent different async thunk';
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(incrementAsync.fulfilled, manualIncrement), (state, action) => {
        console.log('ISANYOF', { state, action });
        state.value += action.payload;
      })
      .addMatcher(isAllOf(incrementAsync.fulfilled, manualIncrement), (state, action) => {
        console.log('ISALLOF', { state, action });
        state.value += action.payload;
      })
      .addMatcher(isPending(incrementAsync), (state, action) => {
        console.log('isPending', { state, action });
      })
      .addMatcher(isFulfilled(incrementAsync), (state, action) => {
        console.log('isFulfilled', { state, action });
      })
      .addMatcher(isRejected(incrementAsync), (state, action) => {
        console.log('isRejected', { state, action });
      })
      .addMatcher(isRejectedWithValue(incrementAsync), (state, action) => {
        console.log('isRejectedWithValue', { state, action });
      })
      .addMatcher(isAsyncThunkAction(anotherAsyncThunk, incrementAsync), (state, action) => {
        console.log(
          'isAsyncThunkAction - every action dispatched by anotherAsyncThunk or incrementAsync regardless of the lifecycle',
          { state, action }
        );
      });
  }
});

export const { decrement } = counterSlice.actions;

export const selectCount = (state: RootStateType) => state.counter.value;

export const CounterReducer = counterSlice.reducer;
