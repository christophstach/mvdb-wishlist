import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum WishlistItemType {
  Movie = 'Movie',
}

@Entity({ name: 'wishlist_items' })
@Unique('UQ_USER_ITEMS', ['owner', 'referenceId'])
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  referenceId: string;

  @Column()
  type: WishlistItemType;

  @Column()
  owner: string;

  @Column()
  title: string;

  @Column()
  referenceUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
