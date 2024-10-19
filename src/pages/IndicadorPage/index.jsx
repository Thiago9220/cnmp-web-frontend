import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  IconButton,
  Button,
  HStack,
  Checkbox,
  Box,
  Text,
} from '@chakra-ui/react';
import { FaSearch, FaRegEdit } from "react-icons/fa";

export default function IndicadorPage() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    // Buscar nome do usuário no localStorage (ou de qualquer armazenamento seguro que você esteja usando)
    const nome = localStorage.getItem('nomeUsuario');
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  return (
    <Box>
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Bem-vindo, {nomeUsuario ? nomeUsuario : 'Usuário'}!
        </Text>
      </Box>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th><Checkbox colorScheme="green" /></Th>
              <Th>ID</Th>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Área</Th>
              <Th>Unid. Med.</Th>
              <Th>Classificador</Th>
              <Th>Grupo</Th>
              <Th>Responsável</Th>
              <Th>Ações</Th>
            </Tr>
            <Tr>
              <Th><Checkbox colorScheme="green" /></Th> 
              <Th><Input size="sm" placeholder="ID" /></Th>
              <Th><Input size="sm" placeholder="Código" /></Th>
              <Th><Input size="sm" placeholder="Nome" /></Th>
              <Th>
                <Select size="sm" placeholder="Todas">
                  <option value="opcao1">Opção 1</option>
                </Select>
              </Th>
              <Th><Input size="sm" placeholder="Unid. Med." /></Th>
              <Th>
                <Select size="sm" placeholder="Todos">
                  <option value="opcao1">Opção 1</option>
                </Select>
              </Th>
              <Th>
                <Select size="sm" placeholder="Todos">
                  <option value="opcao1">Opção 1</option>
                </Select>
              </Th>
              <Th>
                <Select size="sm" placeholder="Responsável">
                  <option value="opcao1">Opção 1</option>
                </Select>
              </Th>
              <Th>
                <HStack>
                  <Button size="sm" colorScheme="gray">Limpar</Button>
                  <Button size="sm" colorScheme="blue">Filtrar</Button>
                </HStack>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><Checkbox colorScheme="green" /></Td> 
              <Td>
                <IconButton aria-label='Search database' icon={<FaSearch />} size="sm" />
                <IconButton aria-label='Edit entry' icon={<FaRegEdit />} size="sm" />
              </Td>
            </Tr>
            {/* Add more rows as needed */}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
