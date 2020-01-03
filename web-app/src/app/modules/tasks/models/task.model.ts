import { Field } from 'serialize-ts/dist';
import { TaskStatusEnum } from '../constants';

export class Task {

  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: TaskStatusEnum;

  @Field()
  createdAt: string;
}
