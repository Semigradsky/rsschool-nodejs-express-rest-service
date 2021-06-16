import { getConnection } from 'db';
import User, { IUser } from './user.model';

const repository = getConnection()!.getRepository(User);

export const getAll = async () => repository.find()

export const getById = async (id: string) => {
  const users = await repository.findByIds([id])
  return users[0]!
}

export const create = async (entity: IUser) => {
  const users = await repository.save([entity])
  return users[0]!
}

export const update = async (id: string, partialEntity: Partial<IUser>) => {
  await repository.update(id, partialEntity)
  return getById(id)
}

export const remove = async (id: string) => {
  const res = await repository.delete(id)
  return !!res.affected
}
