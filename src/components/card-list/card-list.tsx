import type { SortName } from '../../types/types';
import { useCallback, useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/site-process/site-process';
import Card from '../card/card';
import Map from '../map/map';
import SortingList from '../sorting-list/sorting-list';
import Spinner from '../spinner/spinner';
import { getCity,getSorting } from '../../store/site-process/selectors';
import { getIsOffersLoading, selectOffers } from '../../store/site-data/selectors';
import CardListEmpty from '../card-list-empty/card-list-empty';

const CardList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);
  const activeSorting = useAppSelector(getSorting);
  const isOffersLoading = useAppSelector(getIsOffersLoading);
  const offers = useAppSelector(selectOffers);
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const isEmpty = offers.length === 0;

  const handleCardMouseEnter = useCallback((id: number) => {
    setActiveOffer(id);
  },[]);
  const handleCardMouseLeave = useCallback(() => {
    setActiveOffer(null);
  }, []);
  const onSortingChange = useCallback((name: SortName) => {
    dispatch(setSorting(name));
  },[dispatch]);
  if (isOffersLoading) {
    return <Spinner />;
  }
  return (
    <div className={`cities__places-container container${isEmpty ? ' cities__places-container page__main--index-empty' : ''}`}>
      {isEmpty ? <CardListEmpty city = {activeCity.name} /> : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
          <SortingList onChange={onSortingChange} activeSorting={activeSorting} />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                {...offer}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              />
            ))}
          </div>
        </section>)}
      <div className="cities__right-section">
        {!isEmpty && <Map locations={offers.map(({ id, location }) => ({ id, ...location }))} city={activeCity} activeOffer={activeOffer}/> }
      </div>
    </div>
  );};
export default memo(CardList);
