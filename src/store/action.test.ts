import type { Action } from 'redux';
import type { State } from '../types/state';
import type { History } from 'history';
import type { AxiosInstance } from 'axios';

import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../api';
import { ApiRoute } from '../const';
import { fetchUserStatus } from './action';
describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument({ api })];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, { api: AxiosInstance; history: History }, Action>
    >(middlewares);

  it('fetchUserStatus should be fullfilled when server returns 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, {});
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserStatus());

    const actions = store.getActions().map(({ type }) => type as string);
    // const actions = store.getActions().map(({ type }) => typeof type);

    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.fulfilled.type
    ]);
  });

  it('fetchUserStatus should be rejected when server returns 401', async () => {
    const store = mockStore();

    mockAPI
      .onGet(ApiRoute.Login)
      .reply(401, {});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserStatus());

    const actions = store.getActions().map(({ type }) => type as string);
    // const actions = store.getActions().map(({ type }) => typeof type);

    expect(actions).toEqual([
      fetchUserStatus.pending.type,
      fetchUserStatus.rejected.type
    ]);
  });
});
