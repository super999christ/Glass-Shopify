import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_url', type: 'varchar' })
  storeUrl: string;

  @Column({ name: 'store_name', type: 'varchar' })
  storeName: string;

  @Column({ name: 'shopify_access_token', type: 'varchar' })
  shopifyAccessToken: string;
}
