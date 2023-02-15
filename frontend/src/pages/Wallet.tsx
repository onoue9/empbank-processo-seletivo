import { Button, Flex, Image, Modal, NumberInput, Select, Table, Text, TextInput, Pagination, NumberInputProps } from '@mantine/core';
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
import { chunk } from 'lodash';
import { useLocation } from 'react-router-dom';
import './Wallet.css';

type ChunkedData = TransactionInterface[][];

interface TransactionBodyInterface {
  title: string,
  value: number,
  category: string,
  type: string,
  userId: number,
}

export default function Wallet() {
  const [transactions, setTransactions] = useState([]);
  const [chunkedTransactions, setChunkedTransactions] = useState<ChunkedData>([]);
  const [toogleModal, setToogleModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState('entry');
  const [activePage, setActivePage] = useState(1);
  const [searchFilter, setSearchFilter] = useState('');
  const entryButtonType = useRef<HTMLButtonElement>(null);
  const outButtonType = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { state } = location;

  const form = useForm({
    initialValues: {
      title: '',
      value: 0,
      category: '',
    },

    validate: {
      title: (value: string) => value.length > 0 ? null : 'Você precisa preencher o título',
      value: (value: number) => value !== 0 ? null : 'Você precisa preencher o valor',
      category: (value: string) => value.length > 0 ? null : 'Você precisa escolher uma categoria',
    },
  })

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  const transactionsTr = () => (
    chunkedTransactions[activePage - 1]?.map((transaction: TransactionInterface) => (
      <tr className="tr" key={transaction.id} style={{ width: '100%', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CED4DA', borderRadius: '5px', gap: '10px' }}>
        <td className="td" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '40%', border: '0' }}>
          <Image
            src={transaction.type === 'entry' ? greenElipse : redElipse}
            alt="Ícone de uma elipse"
            style={{ width: '10px', height: '10px', color: 'green' }}
          />
          <Text style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{transaction.title}</Text>
        </td>
        <td className="td" style={{ border: '0', width: '20%', padding: '0px 10px' }}>
          <Text
            color={transaction.type === 'out' ? 'red' : 'green'}
            style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>
              {transaction.type === 'out' ?  `- ${currencyFormatter.format(parseFloat(transaction.value))}` : currencyFormatter.format(parseFloat(transaction.value)) }
            </Text>
        </td>
        <td className="td" style={{ border: '0', width: '20%', padding: '0px 10px' }}>
          <Text style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{transaction.category}</Text>
        </td>
        <td className="td" style={{ border: '0', width: '20%', padding: '0px 30px' }}>
          <Text style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '16px', lineHeight: '160%', fontWeight: '400', fontFamily: 'Roboto' }}>{dateFormatter.format(new Date(transaction.createdAt))}</Text>
        </td>
      </tr>
    ))
  )

  const fetchNewTransaction = async (body: TransactionBodyInterface) => {
    try {
      const response = await fetch('http://localhost:3001/transaction/createTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () => {
    const filteredTransactions = async () => {
      const transaction = transactions.filter(
        (transaction: TransactionInterface) => transaction.title.toLowerCase().includes(searchFilter.toLowerCase())
        || transaction.category.toLowerCase().includes(searchFilter.toLowerCase())
      );
      const chunkedData = chunk(transaction, 10) as ChunkedData;
      setActivePage(1);
      setChunkedTransactions(chunkedData);
    }
    filteredTransactions();
  }

  useEffect(() => {
    const getFetch = async () => {
      const response = await fetch(`http://localhost:3001/transaction/${state?.id}`)
      const data = await response.json();
      setTransactions(data.sort((a: TransactionInterface, b: TransactionInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ));
      const chunkedData = chunk(data, 10) as ChunkedData;
      setChunkedTransactions(chunkedData);
    }
    getFetch();
  }, [toogleModal])

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
        sx={() => ({
          '@media (max-width: 600px)': {
            padding: '0px !important'
          }
        })}
      >
        <Modal
          opened={toogleModal}
          onClose={() => { setToogleModal(!toogleModal); setSelectedButton('entry'); }}
          title="Nova Transação"
          padding={50}
          shadow="md"
          style={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '24px', lineHeight: '140%', color: '#2D303D' }}
        >
          <form
            onSubmit={form.onSubmit((values) => {
                fetchNewTransaction({...values, type: selectedButton, userId: state.id });
                setToogleModal(!toogleModal);
                setSelectedButton('entry');
              })
            }
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}
          >
            <TextInput
              label="Título"
              placeholder="Insira o título da transação"
              {...form.getInputProps('title')}
              style={{ width: '100%', fontWeight: '600', fontSize: '14px', lineHeight: '155%', color: '#212529' }}
            />
            <TextInput
              label="Valor"
              labelProps={{ style: { fontWeight: '600', fontSize: '14px', lineHeight: '155%', color: '#212529' }}}
              placeholder="Insira o valor da transação"
              {...form.getInputProps('value')}
              style={{ width: '100%' }}
              type="number"
            />
            <Select
              data={[
                { label: 'Alimentação', value: 'Alimentação' },
                { label: 'Salário', value: 'Salário' },
                { label: 'Transporte', value: 'Transporte' },
                { label: 'Aluguel', value: 'Aluguel' },
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
                style={{ width: '100%', height: '58px', fontWeight: '400', fontSize: '16px', lineHeight: '160%', color: '#2D303D', backgroundColor: 'transparent', border: '1px solid #CED4DA', boxShadow: '0 0 4px #2D303D' }}
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
          sx={() => ({
            '@media (max-width: 600px)': {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }
          })}
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
          sx={() => ({
            '@media (max-width: 600px)': {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }
          })}
        >
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', padding: '20px' }}
            sx={() => ({
              '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '80% !important',
              }
            })}
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
              >
                {currencyFormatter.format(transactions.reduce<number>((acc: number, cur: { type: string; value: string; }) => cur.type === 'entry' ? acc + parseFloat(cur.value) : acc, 0))}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', padding: '20px' }}
            sx={() => ({
              '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '80% !important',
              }
            })}
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
              >
                {currencyFormatter.format(transactions.reduce<number>((acc: number, cur: { type: string; value: string; }) => cur.type === 'out' ? acc + parseFloat(cur.value) : acc, 0))}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            direction="column"
            style={{ width: '30%', border: '1px solid #CED4DA', borderRadius: '5px', backgroundColor: '#2D303D', color: '#FFFFFF', padding: '20px' }}
            sx={() => ({
              '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '80% !important',
              }
            })}
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
              >
                {currencyFormatter.format(transactions.reduce<number>((acc: number, cur: { type: string; value: string; }) => cur.type === 'out' ? acc - parseFloat(cur.value) : acc + parseFloat(cur.value), 0))}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          style={{ width: '100%', height: '54px' }}
          sx={() => ({
            '@media (max-width: 600px)': {
              display: 'flex',
              gap: '20px',
              width: '80% !important',
            }
          })}
        >
          <TextInput
            placeholder="Busque uma transação"
            size='lg'
            style={{ width: '86%', fontSize: '16px', lineHeight: '140%', fontWeight: '400', fontFamily: 'Roboto' }}
            onChange={(event) => setSearchFilter(event.target.value) }
          />
          <Button
            leftIcon={<Image src={searchIcon} alt="Ícone de procura" />}
            size='lg'
            style={{ width: '13%', background: 'transparent', color: '#60CFFA', border: '1px solid #60CFFA' }}
            onClick={handleSearch}
            sx={() => ({
              '@media (max-width: 600px)': {
                width: '30% !important',
              }
            })}
          >
            <Text
              style={{ fontSize: '16px', lineHeight: '160%', fontWeight: '700', fontFamily: 'Roboto' }}
              sx={() => ({
                '@media (max-width: 600px)': {
                  display: 'none',
                }
              })}
            >Buscar</Text>
          </Button>
        </Flex>
        <Flex
          style={{ width: '100%' }}
        >
          <Table
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}
            sx={() => ({
              '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }
            })}
          >
            <tbody style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              {transactionsTr()}
            </tbody>
            <Pagination page={activePage} onChange={setActivePage} total={chunkedTransactions.length}
              sx={() => ({
                '@media (max-width: 600px)': {
                  paddingBottom: '20px'
                }
              })}
            />
          </Table>
        </Flex>
      </Flex>
  );
}
