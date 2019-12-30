import { Field } from 'serialize-ts/dist';

export class ErrorResponse {

  @Field()
  type: string;

  @Field()
  statusCode: number;

  @Field()
  message: string;
}
