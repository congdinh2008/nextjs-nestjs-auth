import { RoleType } from 'src/enums/role-type.enum';

export interface IJwtPayload {
  readonly upn: string;
  readonly username: string;
  readonly sub: string;
  readonly email: string;
  readonly roles: RoleType[];
}
