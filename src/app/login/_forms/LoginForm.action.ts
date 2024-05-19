'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { LoginRequest } from './LoginForm';

export const loginService = async (loginValues: LoginRequest) => await requestEchoAPI(_withSuccess({}));
