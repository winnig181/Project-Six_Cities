import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';

import { cities, CityLocation } from '../const';
import useMap from './useMap';

const city = {
  name: cities[0],
  location: CityLocation[cities[0]]
};

const ref = {
  current: document.createElement('div')
};

describe('Hook: useMap', () => {
  it('should return map', () => {
    const { result } = renderHook(() =>
      useMap(ref, city),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
