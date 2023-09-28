import { memo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser,getIsAuthorized } from '../../store/user-process/selectors';
import { getFavoriteOffers } from '../../store/site-data/selectors';
import { logoutUser } from '../../store/action';

const Header = () => {
  const { pathname } = useLocation() as { pathname: AppRoute };
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getIsAuthorized);
  const user = useAppSelector(getUser);
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const handleLogoutClick = () => {
    if (isAuthorized) {
      dispatch(logoutUser());
    }
  };

  const RootClassName: Record<AppRoute, string> = {
    [AppRoute.Root]: 'page--gray page--main',
    [AppRoute.Login]: 'page--gray page--login',
    [AppRoute.Favorites]: favoriteOffers.length === 0 ? 'page--favorites-empty' : '',
    [AppRoute.Property]: '',
    [AppRoute.NotFound]: '',
  };

  return (
    <div className={`page ${RootClassName[pathname]}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized && (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user}
                      </span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>)}
                {pathname !== AppRoute.Login && (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={isAuthorized ? AppRoute.Root : AppRoute.Login} onClick={handleLogoutClick}>
                      <span className="header__signout">{isAuthorized ? 'Sign out' : 'Sign in'}</span>
                    </Link>
                  </li>)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default memo(Header);
