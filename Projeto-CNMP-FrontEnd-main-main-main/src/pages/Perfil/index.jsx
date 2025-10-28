
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    const nome = localStorage.getItem('nomeUsuario');
    const email = localStorage.getItem('userEmail');

    if (nome && email) {
      setPerfil({ nome, email });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({
      ...perfil,
      [name]: value,
    });
  };

  const handleSave = () => {
    localStorage.setItem('nomeUsuario', perfil.nome);

    toast({
      title: 'Perfil atualizado.',
      description: 'Seu nome foi atualizado com sucesso!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    navigate('/HomePageLogada');
  };

  return (
    <Header>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg">Editar Perfil</Heading>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="nome"
              value={perfil.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </FormControl>
          <FormControl isReadOnly>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={perfil.email}
              isReadOnly
            />
          </FormControl>
          <FormControl isReadOnly>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              value="******"
              isReadOnly
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSave}>
            Salvar
          </Button>
        </VStack>
      </Box>
    </Header>
  );
};

export default EditarPerfil;
