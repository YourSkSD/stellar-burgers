import {
  userSlice,
  loginUser,
  getUser,
  registerUser,
  logoutUser
} from '../userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState = userSlice.getInitialState();
  const user: TUser = { email: 'UserForTest@example.com', name: 'UserForTest' };

  it('loginUser pending сбрасывает ошибку и isAuthChecked=false', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );

    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserError).toBeUndefined();
  });

  it('loginUser fulfilled авторизует пользователя', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.fulfilled(user, '', { email: '', password: '' })
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.userData).toEqual(user);
  });

  it('registerUser rejected сохраняет ошибку', () => {
    const state = userSlice.reducer(
      { ...initialState, isAuthChecked: false },
      registerUser.rejected(new Error('reg error'), '', {
        email: '',
        password: '',
        name: ''
      })
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.registerUserError).toBe('reg error');
  });

  it('getUser rejected сбрасывает авторизацию', () => {
    const state = userSlice.reducer(
      { ...initialState, isAuthChecked: false },
      getUser.rejected(new Error('auth error'), '')
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe('auth error');
  });

  it('logoutUser fulfilled очищает пользователя и ошибки', () => {
    const state = userSlice.reducer(
      {
        ...initialState,
        isAuthenticated: true,
        userData: user,
        loginUserError: 'err'
      },
      logoutUser.fulfilled({ success: true }, '')
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.userData).toBeNull();
    expect(state.loginUserError).toBeUndefined();
    expect(state.logoutError).toBeUndefined();
  });
});
