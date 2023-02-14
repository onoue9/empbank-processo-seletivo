import { Button, Flex, Image, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import LoginPageImage from '../assets/images/LoginPageImage.svg';
import empbankLogo from '../assets/images/empbankLogo.svg';

export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => value.length >= 6 ? null : 'Invalid password',
    },
  })
  
  return (
      <Flex
        align="flex-start"
        justify="space-around"
        style={{ width: '100%', height: '100%' }}
      >
        <Image
          radius="lg"
          src={LoginPageImage}
          alt="casal vendo alguma coisa em um tablet"
          style={{ width: '60%', height: '100%', padding: '20px 0px 20px 0px' }}
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="lg"
          style={{ width: '35%', padding: '5% 0px 0px 0px' }}
        >
          <Image
            src={empbankLogo}
            alt="Logo da empbank"
            style={{ width: '100%' }}
          />
          <Title
            style={{ width: '100%', height: '46px', fontWeight: '700', fontSize: '32px', lineHeight: '135%' }}
            align="left"
            order={2}
          >Faça seu login</Title>
          <form 
            onSubmit={form.onSubmit((values) => console.log(values))}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '212px' }}
          >
            <TextInput
              label="Email"
              placeholder="Insira seu email"
              {...form.getInputProps('email')}
              style={{ width: '100%', height: '100px' }}
              radius="md"
            />
            <TextInput
              label="Password"
              placeholder="Insira sua senha"
              {...form.getInputProps('password')}
              type="password"
              style={{ width: '100%', height: '100px' }}
              radius="md"
            />
            <Button style={{ backgroundColor: '#60CFFA' }} fullWidth radius="md" size="lg" type="submit">
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
          >
            <Text
              style={{ fontWeight: '600', fontSize: '20px', lineHeight: '155%', color: '#F2F2F2' }}
            >CRIAR CONTA</Text>
          </Button>
        </Flex>
      </Flex>
  );
}
