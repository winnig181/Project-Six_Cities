import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { fetchUserStatus, loginUser,logoutUser } from '../action';

const email = 'abc123@gmail.com';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      });
  });

  it('should fetch authorization status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: ''
    };

    expect(userProcess.reducer(state, { type: fetchUserStatus.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      });

    expect(userProcess.reducer(state, { type: fetchUserStatus.fulfilled.type, payload: email }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: email
      });
  });

  it('should login user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: ''
    };

    expect(userProcess.reducer(state, { type: loginUser.fulfilled.type, payload: email }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: email
      });
  });

  it('should logout user', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: email
    };

    expect(userProcess.reducer(state, { type: logoutUser.fulfilled.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: ''
      });
  });
});
