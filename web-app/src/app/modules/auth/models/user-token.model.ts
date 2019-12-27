import { Field } from 'serialize-ts/dist';

export class UserToken {

  @Field()
  token: string;
}
