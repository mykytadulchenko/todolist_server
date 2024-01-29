import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from './items.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async getItems(id: string) {
    const data = await this.itemRepository.find({
      where: { user: { id } },
      order: { created_at: 'ASC' },
    })
    return data
  }

  async addItem(value: string, userId: string) {
    await this.itemRepository
      .createQueryBuilder()
      .insert()
      .values({ value, completed: false, user: { id: userId } })
      .execute()

    const data = await this.getItems(userId)
    return data
  }

  async editItem(id: string, value: string, completed: boolean, user_id: string) {
    await this.itemRepository.createQueryBuilder().update().set({ value, completed }).where('id = :id', { id }).execute()
    const data = await this.getItems(user_id)
    return data
  }

  async deleteItem(id: string, userId: string) {
    await this.itemRepository.createQueryBuilder().delete().where('id = :id', { id }).execute()

    const data = await this.getItems(userId)
    return data
  }

  async selectAll(selectAllFlag: boolean, userId: string) {
    await this.itemRepository
      .createQueryBuilder()
      .update()
      .set({ completed: selectAllFlag })
      .where('user_id = :id', { id: userId })
      .execute()

    const data = await this.getItems(userId)
    return data
  }

  async removeSelected(userId: string) {
    await this.itemRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: userId })
      .andWhere('completed = true')
      .execute()

    const data = await this.getItems(userId)
    return data
  }
}
