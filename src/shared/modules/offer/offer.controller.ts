import { Request, Response } from 'express';
import { OfferRdo } from './rdo/offer.rdo.js';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
  }

  public async index(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, offers.map((offer) => fillDTO(OfferRdo, offer)));
  }
}
