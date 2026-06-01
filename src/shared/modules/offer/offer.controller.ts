import { Request, Response } from 'express';
import { OfferRdo } from './rdo/offer.rdo.js';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferByIdRequest } from './offer-by-id-request.type.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
  }

  public async index(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, offers.map((offer) => fillDTO(OfferRdo, offer)));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show(
    { params }: OfferByIdRequest,
    res: Response,
  ): Promise<void> {
    const offerId = params.offerId as string;
    const offer = await this.offerService.findById(offerId);
    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» not found.`,
        'OfferController',
      );
    }
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update(
    { params, body }: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const offerId = params.offerId as string;
    const offer = await this.offerService.updateById(offerId, body);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${offerId}» not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
