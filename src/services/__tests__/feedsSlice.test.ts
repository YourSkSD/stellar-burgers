import { feedsSlice, getFeeds } from '../feedsSlice';
import { TOrdersData } from '@utils-types';

describe('feedsSlice', () => {
  const initialState = feedsSlice.getInitialState();
  const payload: TOrdersData & { success: boolean } = {
    orders: [],
    total: 10,
    totalToday: 5,
    success: true
  };

  it('pending выставляет loading=true и сбрасывает ошибку', () => {
    const state = feedsSlice.reducer(
      initialState,
      getFeeds.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled сохраняет данные ленты и выключает loading', () => {
    const state = feedsSlice.reducer(
      { ...initialState, loading: true },
      getFeeds.fulfilled(payload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.feeds).toEqual(payload);
  });

  it('rejected сохраняет ошибку и выключает loading', () => {
    const state = feedsSlice.reducer(
      { ...initialState, loading: true },
      getFeeds.rejected(new Error('error'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });
});
