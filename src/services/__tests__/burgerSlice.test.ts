import {
  burgerSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearIngredients
} from '../burgerSlice';
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

  it('перемещает ингредиент внутри списка', () => {
    const main2 = { ...main, _id: 'main-2' };

    // Добавляем два ингредиента
    const withIngredients = burgerSlice.reducer(
      burgerSlice.getInitialState(),
      addIngredient(main)
    );

    const withTwoIngredients = burgerSlice.reducer(
      withIngredients,
      addIngredient(main2)
    );

    // Проверяем, что теперь 2 ингредиента
    expect(withTwoIngredients.constructorItems.ingredients).toHaveLength(2);
    expect(withTwoIngredients.constructorItems.ingredients[0].id).toBe(
      'test-id'
    );
    expect(withTwoIngredients.constructorItems.ingredients[1].id).toBe(
      'test-id'
    );

    // Перемещаем первый ингредиент на позицию 1 (вниз)
    const state = burgerSlice.reducer(
      withTwoIngredients,
      moveIngredient({ from: 0, to: 1 })
    );

    // Проверяем, что порядок изменился
    expect(state.constructorItems.ingredients[0].id).toBe('test-id');
    expect(state.constructorItems.ingredients[1].id).toBe('test-id');
  });

  it('очищает все ингредиенты конструктора', () => {
    // Добавляем булку и начинку
    const withBun = burgerSlice.reducer(
      burgerSlice.getInitialState(),
      addIngredient(bun)
    );

    const withAll = burgerSlice.reducer(withBun, addIngredient(main));

    // Проверяем, что всё добавилось
    expect(withAll.constructorItems.bun).toEqual(bun);
    expect(withAll.constructorItems.ingredients).toHaveLength(1);

    // Очищаем конструктор
    const state = burgerSlice.reducer(withAll, clearIngredients());

    // Проверяем, что всё очистилось
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});
