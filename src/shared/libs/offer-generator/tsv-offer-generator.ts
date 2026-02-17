import dayjs from 'dayjs';
import { MockServerData } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;
const MIN_ADULTS = 1;
const MAX_ADULTS = 10;
const PHOTOS_COUNT = 6;
const DAYS_AGO_MIN = 1;
const DAYS_AGO_MAX = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const type = getRandomItem<string>(this.mockData.types);
    const user = getRandomItem(this.mockData.users);
    const location = getRandomItem(this.mockData.locations);

    const images = Array.from(
      { length: PHOTOS_COUNT },
      () => getRandomItem(this.mockData.images)
    ).join(';');

    const goodsArray = getRandomItems(this.mockData.goods);
    const goods = goodsArray.length > 0 ? goodsArray : [getRandomItem(this.mockData.goods)];
    const goodsStr = goods.join(';');

    const postDate = dayjs()
      .subtract(generateRandomValue(DAYS_AGO_MIN, DAYS_AGO_MAX), 'day')
      .toISOString();

    const isPremium = Math.random() >= 0.5;
    const isFavorite = Math.random() >= 0.5;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);

    const userString = [
      user.name,
      user.email,
      user.avatarPath,
      user.password,
      user.isPro ? 'Pro' : ''
    ].join(';');

    const locationString = `${location.latitude};${location.longitude}`;

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      String(isPremium),
      String(isFavorite),
      String(rating),
      type,
      String(bedrooms),
      String(maxAdults),
      String(price),
      goodsStr,
      userString,
      locationString
    ].join('\t');
  }
}
