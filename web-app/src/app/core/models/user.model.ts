import { Field, Name } from 'serialize-ts/dist';

export class User {

  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  @Name('avatar')
  avatarSrc?: string;
}
