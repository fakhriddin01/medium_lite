import { PartialType } from '@nestjs/mapped-types';
import { CreatePostRateDto } from './create-post-rate.dto';

export class UpdatePostRateDto extends PartialType(CreatePostRateDto) {}
