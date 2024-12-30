import { User } from "../models/use.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getByYd(id);
    if (!user) {
      throw new NotFoundError("Usuário nao encontrado!")
    }
    return user;
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<void> {
    const _user = await this.userRepository.getByYd(id);
    if (!_user) {
      throw new NotFoundError("Usuário não encontrado!")
    }

    _user.name = user.name;
    _user.email = user.email;

    await this.userRepository.update(_user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}