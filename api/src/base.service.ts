import {EntityRepository, FilterQuery} from '@mikro-orm/core';
import type {RequiredEntityData} from "@mikro-orm/core/typings";

export abstract class BaseService<T extends object> {
  protected constructor(
    private readonly repository: EntityRepository<T>,
  ) {
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({id} as FilterQuery<T>);
  }

  async findOneBy(where: FilterQuery<T>): Promise<T> {
    return this.repository.findOne(where);
  }

  async create(data: RequiredEntityData<T>): Promise<T | Object> {
    return this.repository.create(data);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.repository.nativeDelete({id} as FilterQuery<T>);
    if (!deleted) throw new Error(`ID ${id} not found.`);
  }

  async deleteBy(where: FilterQuery<T>): Promise<T> {
    const result = await this.repository.findOne(where);

    return;
  }
}
