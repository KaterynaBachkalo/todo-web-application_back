export interface IUser {
  name?: string;
  password: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  checkPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  phone?: string;
  avatar?: string;
  favorites?: string;
}

export interface INotice {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  category: string;
  price: number;
  comment: string;
  locationId: string;
  user: IUser;
  popularity: number;
}

export interface IPet {
  name: string;
  title: string;
  imgUrl: string;
  species: string;
  birthday: string;
  sex: string;
}

export interface ICity {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
}

export interface IFriend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: Array<{
    _id: string;
    isOpen: boolean;
    from: string;
    to: string;
  }>;
  phone: string;
  email: string;
}

export interface INews {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
}

export interface QueryParams {
  title?: string | null;
  page?: number;
  limit?: number;
  category?: string;
  sex?: string;
  species?: string;
  sort?: string;
}

export interface IFavorite {
  _id: string;
  owner: IUser;
}
