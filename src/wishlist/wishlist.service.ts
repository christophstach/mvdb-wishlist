import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Repository } from 'typeorm';
import { AddToWishlistDto } from './dtos/add-to-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
  ) {}

  findAll() {
    return this.wishlistItemRepository.find();
  }

  findOne(id: string) {
    return this.wishlistItemRepository.findOneOrFail(id);
  }

  findByOwner(owner: string) {
    return this.wishlistItemRepository.find({ where: { owner } });
  }

  add(owner: string, addToShoppingCartDto: AddToWishlistDto) {
    const { type, referenceId, referenceUrl, title } = addToShoppingCartDto;

    return this.wishlistItemRepository.save({
      type,
      referenceId,
      referenceUrl,
      title,
      owner,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async remove(owner: string, id: string) {
    const item = await this.wishlistItemRepository.findOneOrFail({
      where: { owner, id },
    });

    await this.wishlistItemRepository.delete({ owner, id });

    return item;
  }
}
