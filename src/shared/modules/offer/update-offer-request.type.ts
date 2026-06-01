import { Request } from 'express';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>;
