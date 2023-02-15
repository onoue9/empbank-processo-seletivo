import { z } from 'zod';

export const userRegisterSchema = z.object({
  fullName: z.string({
    required_error: 'Você precisa informar seu nome completo',
    invalid_type_error: 'O nome completo deve ser uma string'
  }).min(1, { message: 'Você precisa informar seu nome completo'}),

  email: z.string({
    required_error: 'Você precisa informar seu email',
    invalid_type_error: 'o email deve ser uma string',
  }).email({ message: 'Você precisa informar um email válido' }),

  password: z.string({
    required_error: 'Você precisa informar sua senha',
    invalid_type_error: 'A senha deve ser uma string',
  }).min(6, { message: 'A senha deve ter no mínimo 6 caracteres'}),

});
