/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { CityName, UserAuth } from '../../types/types';

import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { VALID_PASSWORD_REGEXP, INVALID_PASSWORD_MESSAGE, AppRoute, cities } from '../../const';
import { getRandomElement } from '../../utils';
import { setCity } from '../../store/site-process/site-process';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form) as Iterable<[UserAuth]>;
    const data = Object.fromEntries(formData);

    if (!data.password.match(VALID_PASSWORD_REGEXP)) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
      return;
    }

    dispatch(loginUser(data as UserAuth));
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const cityName = e.currentTarget.textContent as CityName;
    dispatch(setCity(cityName));
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="email" >E-mail</label>
              <input
                id="email"
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="on"
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden" htmlFor="password">Password</label>
              <input
                id="password"
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="on"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
            >
                Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" onClick={handleLinkClick} to={AppRoute.Root}>
              <span>{getRandomElement<CityName>(cities)}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
    // </div>
  );
};

export default Login;
