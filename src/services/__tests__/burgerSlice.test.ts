import { burgerSlice, addIngredient, removeIngredient } from '../burgerSlice';
import { TIngredient } from '@utils-types';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  return { ...actual, nanoid: () => 'test-id' };
});

describe('burgerSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const main: TIngredient = {
    _id: 'main-1',
    name: 'Начинка',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('добавляет булку в конструктор', () => {
    const state = burgerSlice.reducer(
      burgerSlice.getInitialState(),
      addIngredient(bun)
    );

    expect(state.constructorItems.bun).toEqual(bun);
  });

  it('добавляет начинку и проставляет id', () => {
    const state = burgerSlice.reducer(
      burgerSlice.getInitialState(),
      addIngredient(main)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      ...main,
      id: 'test-id'
    });
  });

  it('удаляет ингредиент по id', () => {
    const withIngredient = burgerSlice.reducer(
      burgerSlice.getInitialState(),
      addIngredient(main)
    );

    const state = burgerSlice.reducer(
      withIngredient,
      removeIngredient('test-id')
    );

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});
