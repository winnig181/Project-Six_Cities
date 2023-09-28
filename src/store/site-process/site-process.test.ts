import type { SortName } from '../../types/types';

import { siteProcess, setCity, setSorting } from './site-process';
import { cities, CityLocation, Sorting } from '../../const';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        city: {
          name: cities[0],
          location: CityLocation[cities[0]],
        },
        sorting: Sorting.Popular
      });
  });

  it('should set city by a given name', () => {
    const state = {
      city: {
        name: cities[0],
        location: CityLocation[cities[0]],
      },
      sorting: Sorting.Popular as SortName
    };

    expect(siteProcess.reducer(state, setCity(cities[1])))
      .toEqual({
        city: {
          name: cities[1],
          location: CityLocation[cities[1]],
        },
        sorting: Sorting.Popular
      });
  });

  it('should set sorting by a given name', () => {
    const state = {
      city: {
        name: cities[0],
        location: CityLocation[cities[0]],
      },
      sorting: Sorting.Popular as SortName
    };

    expect(siteProcess.reducer(state, setSorting(Object.keys(Sorting)[1] as SortName)))
      .toEqual({
        city: {
          name: cities[0],
          location: CityLocation[cities[0]],
        },
        sorting: Object.keys(Sorting)[1]
      });
  });
});
