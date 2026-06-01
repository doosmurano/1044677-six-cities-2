import { City } from '../../../types/cities.enum.js';
import { Expose, Transform, Type } from 'class-transformer';
import { HousingType } from '../../../types/housing-type.enum.js';

export class OfferLocationRdo {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose()
  @Transform(({ obj }) => {
    if (obj.userId && typeof obj.userId === 'object' && '_id' in obj.userId) {
      return obj.userId._id.toString();
    }

    return obj.userId?.toString();
  })
  public userId: string;

  @Expose()
  @Type(() => OfferLocationRdo)
  public location: OfferLocationRdo;
}
