import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние для неизвестного экшена', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      burger: {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      },
      feeds: {
        feeds: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        loading: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        isAuthenticated: false,
        userData: null,
        loginUserError: undefined,
        registerUserError: undefined,
        updateUserError: undefined,
        logoutError: undefined
      },
      userOrders: {
        userOrders: [],
        newOrder: null,
        orders: [],
        loading: false,
        error: undefined
      }
    });
  });
});
