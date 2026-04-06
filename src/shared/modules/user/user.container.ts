import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { UserEntity, UserModel } from './user.entity.js';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';

export function createUserContainer(parent?: Container) {
  const userContainer = new Container(parent ? { parent } : undefined);
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
