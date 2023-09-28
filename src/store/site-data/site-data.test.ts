import type { Offer, User, Comment } from '../../types/types';

import { siteData } from './site-data';
import { cities, CityLocation,SubmitStatus } from '../../const';
import { fetchComments, fetchFavoriteOffers, fetchNearbyOffers, fetchOffer, fetchOffers, postComment, postFavorite } from '../action';

const user: User = {
  id: 1,
  name: 'Max',
  avatarUrl: 'img/user-1.jpg',
  isPro: false,
  email: 'max@gmail.com',
  token: 'jshdjkhsfjkh',
};

const offers: Offer[] = [
  {
    id: 1,
    price: 120,
    rating: 4.0,
    title: 'Offer 1',
    isPremium: true,
    isFavorite: false,
    city: {
      name: cities[0],
      location: CityLocation[cities[0]]
    },
    location: CityLocation[cities[0]],
    previewImage: 'img/1.jpg',
    description: 'Nice house',
    type: 'hotel',
    goods: ['dish washer', 'wi-fi'],
    bedrooms: 2,
    host: user,
    maxAdults: 3,
    images: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg']
  }
];

const comments: Comment[] = [
  {
    id: 1,
    comment: 'Hello!',
    date: '11-10-2017',
    rating: 1.0,
    user
  }
];

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(siteData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: fetchOffers.pending.type }))
      .toEqual({
        offers: [],
        isOffersLoading: true,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchOffers.fulfilled.type, payload: offers }))
      .toEqual({
        offers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchOffers.rejected.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch offer', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: fetchOffer.pending.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: true,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchOffer.fulfilled.type, payload: offers[0] }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: offers[0],
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchOffer.rejected.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch favorite offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: fetchFavoriteOffers.pending.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: true,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchFavoriteOffers.fulfilled.type, payload: offers }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: offers,
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    expect(siteData.reducer(state, { type: fetchFavoriteOffers.rejected.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch nearby offers', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: fetchNearbyOffers.fulfilled.type, payload: offers }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: offers,
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });

  it('should fetch nearby comments', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: fetchComments.fulfilled.type, payload: comments }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments,
        commentStatus: SubmitStatus.Still,
      });
  });
  it('should post comment', () => {
    const state = {
      offers: [],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: postComment.pending.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Pending,
      });

    expect(siteData.reducer(state, { type: postComment.fulfilled.type, payload: comments }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments,
        commentStatus: SubmitStatus.Fullfilled,
      });

    expect(siteData.reducer(state, { type: postComment.rejected.type }))
      .toEqual({
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Rejected,
      });
  });

  it('should post favorite', () => {
    const state = {
      offers,
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      favoriteOffers: [] as Offer[],
      isFavoriteOffersLoading: false,
      nearbyOffers: [],
      comments: [],
      commentStatus: SubmitStatus.Still,
    };

    expect(siteData.reducer(state, { type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: true } }))
      .toEqual({
        offers: [{...offers[0], isFavorite: true }],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [{...offers[0], isFavorite: true }],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });

    state.offers = [{...offers[0], isFavorite: true }];
    state.favoriteOffers = [{...offers[0], isFavorite: true }];

    expect(siteData.reducer(state, { type: postFavorite.fulfilled.type, payload: {...offers[0], isFavorite: false } }))
      .toEqual({
        offers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        nearbyOffers: [],
        comments: [],
        commentStatus: SubmitStatus.Still,
      });
  });
});
