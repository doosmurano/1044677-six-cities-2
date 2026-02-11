export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  images: string[];
  types: string[];
  goods: string[];
  users: {
    name: string;
    email: string;
    avatarPath: string;
    password: string;
    isPro: boolean;
  }[];
  locations: {
    latitude: number;
    longitude: number;
  }[];
};
