import { cities, Sorting } from '../const';

export type CityName = typeof cities[number];
export type SortName = keyof typeof Sorting;

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type City = {
    name: CityName;
    location: Location;
};

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};
export type UserAuth = Pick<User, 'email'> & { password: string };
export type CommentAuth = Pick<Comment, 'comment' | 'rating'> & Pick<Offer, 'id'>;
export type FavoriteAuth = Pick<Offer, 'id'> & { status: 1 | 0 }

export type Comment = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type Offer = {
  id: number;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  location: Location;
  previewImage: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  city: City;
  bedrooms: number;
  description: string;
  goods: string[];
  host: User;
  images:string[];
  maxAdults: number;
};

