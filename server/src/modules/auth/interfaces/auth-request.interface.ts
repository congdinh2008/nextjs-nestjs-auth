import { Request } from 'express';
import { IUserPrincipal } from './user-principal.interface';

export interface IAuthRequest extends Request {
  readonly user: IUserPrincipal;
}
