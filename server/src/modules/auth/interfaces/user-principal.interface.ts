import { RoleType } from 'src/enums/role-type.enum';

export interface IUserPrincipal {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly roles: RoleType[];
}
