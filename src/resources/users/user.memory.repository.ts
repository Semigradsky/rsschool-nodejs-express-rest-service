import MemoryRepository from 'common/memory.repository';

import { IUser } from './user.model';

export default new MemoryRepository<string, IUser>();
