import { ingredientsSlice, getIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = ingredientsSlice.getInitialState();
  const payload: TIngredient[] = [
    {
      _id: 'id1',
      name: 'Test',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  it('pending выставляет loading=true и сбрасывает ошибку', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled сохраняет ингредиенты и выключает loading', () => {
    const state = ingredientsSlice.reducer(
      { ...initialState, loading: true },
      getIngredients.fulfilled(payload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  it('rejected сохраняет текст ошибки и выключает loading', () => {
    const state = ingredientsSlice.reducer(
      { ...initialState, loading: true },
      getIngredients.rejected(new Error('fail'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('fail');
  });
});
