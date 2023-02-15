import { Button, Flex, Image, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import LoginPageImage from '../assets/images/LoginPageImage.svg';
import empbankLogo from '../assets/images/empbankLogo.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface LoginBodyInterface {
  email: string,
  password: string,
}

export default function Login() {
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Use um email válido'),
      password: (value: string) => value.length >= 6 ? null : 'Sua senha deve conter mais que 5 caracteres',
    },
  })

  const fetchLogin = async (body: LoginBodyInterface) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.error) return setInvalidUser(data.error.message);
      navigate('/wallet', { state: data });
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <Flex
        align="flex-start"
        justify="space-around"
        style={{ width: '100%', height: '100%' }}
      >
        <Image
          radius="lg"
          src={LoginPageImage}
          className='login-page-image'
          alt="casal vendo alguma coisa em um tablet"
          style={{ width: '60%', height: '100%', padding: '20px 0px 20px 0px' }}
          sx={() => ({
            '@media (max-width: 600px)': {
              display: 'none',
            }
          })}
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="lg"
          style={{ width: '35%', padding: '5% 0px 0px 0px' }}
          sx={() => ({
            '@media (max-width: 600px)': {
              display: 'flex',
              width: '80% !important',
              height: '100%',
            }
          })}
        >
          <Image
            src={empbankLogo}
            alt="Logo da empbank"
            style={{ width: '100%' }}
            className="empbank-logo"
          />
          <Title
            style={{ width: '100%', height: '46px', fontWeight: '700', fontSize: '32px', lineHeight: '135%' }}
            align="left"
            order={2}
          >Faça seu login</Title>
          <form 
            onSubmit={form.onSubmit((values) => fetchLogin(values))}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '212px' }}
          >
            <TextInput
              label="Email"
              placeholder="Insira seu email"
              {...form.getInputProps('email')}
              style={{ width: '100%', height: '100px' }}
              radius="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Insira sua senha"
              {...form.getInputProps('password')}
              style={{ width: '100%', height: '100px' }}
              radius="md"
            />
            { invalidUser.length > 0 && <Text color='red'>{invalidUser}</Text>}
            <Button
              style={{ backgroundColor: '#60CFFA' }} fullWidth radius="md" size="lg" type="submit"
            >
              <Text
                style={{ fontWeight: '600', fontSize: '20px', lineHeight: '155%', color: '#F2F2F2' }}
              >FAZER LOGIN</Text>
            </Button>
          </form>
          <Button
            style={{ backgroundColor: '#2D303D' }}
            fullWidth
            radius="md"
            size='lg'
            onClick={() => navigate('/register')}
          >
            <Text
              style={{ fontWeight: '600', fontSize: '20px', lineHeight: '155%', color: '#F2F2F2' }}
            >CRIAR CONTA</Text>
          </Button>
        </Flex>
      </Flex>
  );
}
