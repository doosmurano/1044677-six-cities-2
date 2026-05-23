import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';

export type OfferByIdRequest = Request<RequestParams, RequestBody, unknown>;
