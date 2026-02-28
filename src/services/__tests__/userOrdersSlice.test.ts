import {
  userOrdersSlice,
  createNewOrder,
  getUserOrders,
  getOrderbyNumber
} from '../userOrdersSlice';
import { TOrder } from '@utils-types';

describe('userOrdersSlice', () => {
  const initialState = userOrdersSlice.getInitialState();

  const order: TOrder = {
    _id: 'order1',
    status: 'done',
    name: 'Order',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    number: 1,
    ingredients: ['id1']
  };

  it('createNewOrder pending ставит loading=true', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      createNewOrder.pending('', [])
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('createNewOrder fulfilled сохраняет заказ', () => {
    const state = userOrdersSlice.reducer(
      { ...initialState, loading: true },
      createNewOrder.fulfilled(
        { order, name: order.name, success: true },
        '',
        []
      )
    );
    expect(state.loading).toBe(false);
    expect(state.newOrder).toEqual(order);
  });

  it('getUserOrders rejected сохраняет ошибку', () => {
    const state = userOrdersSlice.reducer(
      { ...initialState, loading: true },
      getUserOrders.rejected(new Error('fail'), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('fail');
  });

  it('getOrderbyNumber fulfilled записывает найденные заказы', () => {
    const state = userOrdersSlice.reducer(
      { ...initialState, loading: true },
      getOrderbyNumber.fulfilled({ orders: [order], success: true }, '', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([order]);
  });
});
