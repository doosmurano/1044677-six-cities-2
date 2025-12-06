import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer, User, Location, City, HousingType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private parseUser(user: string): User {
    const [name, email, avatarPath, password, isPro] = user.split(';');
    return {
      name,
      email,
      avatarPath,
      password,
      isPro: isPro === 'Pro'
    };
  }

  private parseLocation(location: string) : Location {
    const [lat, lng] = location.split(';');
    return {
      latitude: Number(lat),
      longitude: Number(lng)
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          title, description, date, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, user, location
        ]) => (
          {
            title,
            description,
            postDate: new Date(date),
            city: city as City,
            previewImage,
            images: images.split(';'),
            isPremium: isPremium === 'true',
            isFavorite: isFavorite === 'true',
            rating: Number(rating),
            type: type as HousingType,
            bedrooms: Number(bedrooms),
            maxAdults: Number(maxAdults),
            price: Number(price),
            goods: goods.split(';'),
            user: this.parseUser(user),
            location: this.parseLocation(location)
          })
      );
  }
}
