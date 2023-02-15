const { z } = require('zod');

export const loginSchema = z.object({
  email: z.string({
    required_error: 'É preciso informar um email',
    invalid_type_error: 'Email precisa ser uma string',
  }).email({ message: 'Email inválido' }),

  password: z.string({
    required_error: 'É preciso informar uma senha',
    invalid_type_error: 'Senha precisa ser uma string',
  }).min(6, { message: 'Senha precisa ter no mínimo 6 caracteres'}),

})
