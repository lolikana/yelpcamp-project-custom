export {};

declare module 'express-session' {
  interface SessionData {
    returnTo: string;
  }
}

export interface ICampground {
  title: string;
  image: string;
  price: number;
  description: string;
  location: string;
  author: IUser;
  reviews: IReview[];
}

export interface IReview {
  body: string;
  rating: number;
}

export interface IUser {
  email: string;
  username: string;
}

export interface TCity {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}
