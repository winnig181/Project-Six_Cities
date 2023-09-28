import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Card from '../../components/card/card';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers, getIsFavoriteOffersLoading } from '../../store/site-data/selectors';
import type { Offer } from '../../types/types';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

const Favorites = (): JSX.Element => {
  const isFavoriteOffersLoading = useAppSelector(getIsFavoriteOffersLoading);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupedOffersByCity = favoriteOffers.reduce<{ [key: string ]: Offer[] }>((acc, curr) => {
    if (curr.isFavorite) {
      const city = curr.city.name;

      if (!(city in acc)) {
        acc[city] = [];
      }

      acc[city].push(curr);
    }

    return acc;
  }, {});

  if (isFavoriteOffersLoading) {
    return <Spinner />;
  }

  return (
    <>
      <main className={`page__main page__main--favorites${favoriteOffers.length === 0 ? ' page__main--favorites-empty' : ''}`}>
        {favoriteOffers.length === 0 ? <FavoritesEmpty /> : (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffersByCity).map(([city, groupedOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedOffers.map((offer) => <Card key={offer.id} {...offer} classPrefix="favorites" isMini />)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>)}
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </>
  );
};

export default Favorites;
