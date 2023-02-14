import { Button, Flex, Image, Modal, NumberInput, Select, Table, Text, TextInput } from '@mantine/core';
import empbankLogo from '../assets/images/empbankLogo.svg';
import dollarSignIcon from '../assets/icons/dollarSignIcon.svg';
import entryIcon from '../assets/icons/entryIcon.svg';
import outIcon from '../assets/icons/outIcon.svg';
import searchIcon from '../assets/icons/searchIcon.svg';
import redElipse from '../assets/icons/redElipse.svg';
import greenElipse from '../assets/icons/greenElipse.svg';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import TransactionInterface from '../interfaces/TransactionInterface';

export default function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [toogleModal, setToogleModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const entryButtonType = useRef<HTMLButtonElement>(null);
  const outButtonType = useRef<HTMLButtonElement>(null);

  const form = useForm({
    initialValues: {
      title: '',
      value: 0,
      category: '',
    },

    validate: {
      title: (value: string) => value.length > 0 ? null : 'Invalid title',
      value: (value: number) => typeof value === 'number' ? null : 'Invalid value',
    },
  })

  useEffect(() => {
    const getFetch = async () => {
      const response = await fetch('http://localhost:3001/transaction/1')
      const data = await response.json();
      console.log(data);
      setTransactions(data);
    }
    getFetch();
  }, [])

  useEffect(() => {
    const setButtonType = () => {
      if (entryButtonType.current) {
        if (selectedButton === 'entry') {
          entryButtonType.current.style.boxShadow = '0 0 4px #2D303D'
        } else {
          entryButtonType.current.style.boxShadow = 'none'
        }
      }
      if(outButtonType.current) {
        if(selectedButton === 'out') {
          outButtonType.current.style.boxShadow = '0 0 4px #2D303D'
        } else {
          outButtonType.current.style.boxShadow = 'none'
        }
      }
    }
    setButtonType();
  }, [selectedButton])

  return (
      <Flex
        align="center"
        direction="column"
        gap="md"
        style={{ padding: '80px 160px' }}
      >
        <Modal
          opened={toogleModal}
          onClose={() => setToogleModal(!toogleModal)}
          title="Nova Transação"
          padding={50}
          shadow="md"
          style={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '24px', lineHeight: '140%', color: '#2D303D' }}
        >
          <form
            onSubmit={form.onSubmit((values) => console.log(values, selectedButton))}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}
          >
            <TextInput
              label="Título"
              placeholder="Insira o título da transação"
              {...form.getInputProps('title')}
              style={{ width: '100%', fontWeight: '600', fontSize: '14px', lineHeight: '155%', color: '#212529' }}
            />
            <NumberInput
              label="Valor"
              labelProps={{ style: { fontWeight: '600', fontSize: '14px', lineHeight: '155%', color: '#212529' }}}
              placeholder="Insira o valor da transação"
              {...form.getInputProps('value')}
              style={{ width: '100%' }}
            />
            <Select
              data={[
                { label: 'Alimentação', value: 'alimentacao' },
                { label: 'Salário', value: 'salario' },
                { label: 'Transporte', value: 'transporte' },
                { label: 'Aluguel', value: 'aluguel' },
              ]}
              label="Categoria"
              placeholder='Selecione uma categoria'
              {...form.getInputProps('category')}
              style={{ width: '100%', fontWeight: '600', fontSize: '14px', lineHeight: '155%', color: '#212529' }}
            />
            <Flex
              align="center"
              justify="space-between"
              style={{ width: '100%' }}
              gap="md"
            >
              <Button
                style={{ width: '100%', height: '58px', fontWeight: '400', fontSize: '16px', lineHeight: '160%', color: '#2D303D', backgroundColor: 'transparent', border: '1px solid #CED4DA' }}
                onClick={() => setSelectedButton('entry')}
                ref={entryButtonType}
              >
                <Text
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '400', fontSize: '16px', lineHeight: '160%', color: '#2D303D' }}
                >
                  <Image
                  src={entryIcon}
                  alt="Ícone de entrada"
                  style={{ width: '24px', height: '24px' }}
                  />
                  Entrada
                </Text>
              </Button>
              <Button
                style={{ width: '100%', height: '58px', fontWeight: '400', fontSize: '16px', lineHeight: '160%', color: '#2D303D', backgroundColor: 'transparent', border: '1px solid #CED4DA' }}
                onClick={() => setSelectedButton('out')}
                ref={outButtonType}
              >
                <Text
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: '400', fontSize: '16px', lineHeight: '160%', color: '#2D303D' }}
                >
                  <Image
                  src={outIcon}
                  alt="Ícone de saída"
                  style={{ width: '24px', height: '24px' }}
                  />
                  Saída
                </Text>
              </Button>
            </Flex>
            <Button
              fullWidth
              style={{ height: '58px', backgroundColor: '#60CFFA' }}
              type="submit"
            >Adicionar</Button>
          </form>
        </Modal>
        <Flex
          align="center"
          justify="space-between"
          style={{ width: '100%' }}
        >
          <Image
            src={empbankLogo}
            alt="Logo da empbank"
            style={{ width: '371px', height: '87px' }}
          />
          <Button
            style={{ width: '152px', height: '50px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', backgroundColor: '#60CFFA', borderRadius: '6px' }}
            onClick={() => setToogleModal(!toogleModal)}
          >
            <Text
              style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
            >Nova transação</Text>
          </Button>
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          style={{ width: '100%' }}
        >
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', padding: '20px' }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
              >Entradas</Text>
              <Image
                src={entryIcon}
                alt="Ícone de entrada"
                style={{ width: '32px', height: '32px' }}
              />
            </Flex>
            <Flex
              align="start"
              justify="start"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '32px', lineHeight: '140%', fontWeight: '700', fontFamily: 'Roboto' }}
              >R$ 10.000,00</Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', padding: '20px' }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
              >Saídas</Text>
              <Image
                src={outIcon}
                alt="Ícone de saída"
                style={{ width: '32px', height: '32px' }}
              />
            </Flex>
            <Flex
              align="start"
              justify="start"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '32px', lineHeight: '140%', fontWeight: '700', fontFamily: 'Roboto' }}
              >R$ 2.000,00</Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', backgroundColor: '#2D303D', color: '#FFFFFF', padding: '20px' }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
              >Total</Text>
              <Image
                src={dollarSignIcon}
                alt="Ícone cifrão"
                style={{ width: '20px', height: '20px' }}
              />
            </Flex>
            <Flex
              align="start"
              justify="start"
              style={{ width: '100%' }}
            >
              <Text
                style={{ fontSize: '32px', lineHeight: '140%', fontWeight: '700', fontFamily: 'Roboto' }}
              >R$ 8.000,00</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          style={{ width: '100%', height: '54px' }}
        >
          <TextInput
            placeholder="Busque uma transação"
            size='lg'
            style={{ width: '86%', fontSize: '16px', lineHeight: '140%', fontWeight: '400', fontFamily: 'Roboto' }}
            
          />
          <Button
            leftIcon={<Image src={searchIcon} alt="Ícone de procura" />}
            size='lg'
            style={{ width: '13%', background: 'transparent', color: '#60CFFA', border: '1px solid #60CFFA' }}
          >
            <Text
              style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
            >Buscar</Text>
          </Button>
        </Flex>
        <Flex
          style={{ width: '100%' }}
        >
          <Table
            style={{ width: '100%', height: '100%' }}
          >
            <tbody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              {transactions.map((transaction: TransactionInterface) => (
                <tr key={transaction.id} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CED4DA', borderRadius: '5px', gap: '10px' }}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '40%', border: '0' }}>
                    <Image
                      src={transaction.type === 'Entrada' ? greenElipse : redElipse}
                      alt="Ícone de uma elipse"
                      style={{ width: '10px', height: '10px', color: 'green' }}
                    />
                    <Text style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{transaction.title}</Text>
                  </td>
                  <td style={{ border: '0' }}>
                    <Text style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>R${transaction.value}</Text>
                  </td>
                  <td style={{ border: '0' }}>
                    <Text style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{transaction.category}</Text>
                  </td>
                  <td style={{ border: '0' }}>
                    <Text style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{transaction.createdAt}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Flex>
      </Flex>
  );
}
