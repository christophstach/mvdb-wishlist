import { WishlistItemType } from '../entities/wishlist-item.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AddToWishlistDto {
  @ApiProperty({ default: 'The title comes here' })
  title: string;

  @ApiProperty({ default: 'uuid' })
  referenceId: string;

  @ApiProperty({ required: false, default: 'https://' })
  referenceUrl: string;

  @ApiProperty({
    enum: WishlistItemType,
    default: WishlistItemType.Movie,
  })
  type: WishlistItemType;
}
