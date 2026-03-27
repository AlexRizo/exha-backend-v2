import {
  TransformVoidNumber,
  TransformVoidString,
} from 'src/common/decorators';

export class UpdateTopicDto {
  @TransformVoidString()
  title?: string;

  @TransformVoidNumber()
  order?: number;
}
