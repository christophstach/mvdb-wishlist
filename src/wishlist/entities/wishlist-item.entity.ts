import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WishlistItemType {
  Movie = 'Movie',
}

@Entity({ name: 'wishlist_items' })
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
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
