import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Button,
} from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiUserPlus,
  FiEdit3,
} from "react-icons/fi";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

// Importando o componente de ajuda
import HelpForm from "../helpform";

// Importando imagens (ajuste paths se necessário)
import cnmpffImage from "../../assets/cnmpff.png";
import logoImage from "../../assets/logo.png";

// -----------------------------------------------------------------------------
// NavItem
// -----------------------------------------------------------------------------
const NavItem = ({ icon, route, isActive, children, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navega para a rota recebida como prop
    navigate(route);
  };

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? "0" : "transparent"}
        color={isActive ? "red" : "inherit"}
        _hover={{
          bg: "gray.300",
          color: "black",
        }}
        onClick={handleClick}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

// -----------------------------------------------------------------------------
// SidebarContent
// -----------------------------------------------------------------------------
const SidebarContent = ({ onClose, isNormalUser, onOpenHelpForm, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Definição das rotas
  const LinkItems = isNormalUser
    ? [{ name: "Medições de indicador", icon: FiTrendingUp, route: "/medicoes" }]
    : [
        { name: "Indicadores", icon: FiHome, route: "/HomePageLogada" },
        { name: "Medições de indicador", icon: FiTrendingUp, route: "/medicoes" },
        { name: "Cadastrar usuários", icon: FiUserPlus, route: "/Cadastramentodeusuario" },
        { name: "Incluir indicadores", icon: FiStar, route: "/administracao" },
      ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={logoImage}
          h="16"
          w="auto"
          cursor="pointer"
          onClick={() => navigate("/HomePageLogada")}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          // Marca como ativo se a rota atual bater com a route
          isActive={location.pathname === link.route}
        >
          {link.name}
        </NavItem>
      ))}

      {/* Botão para abrir o modal de ajuda */}
      <Box position="absolute" bottom="8" w="full" px="4">
        <Button
          onClick={onOpenHelpForm}
          colorScheme="gray"
          background={"white"}
          size="sm"
          width="full"
        >
          Precisa de ajuda? Fale conosco
        </Button>
      </Box>
    </Box>
  );
};

// -----------------------------------------------------------------------------
// MobileNav
// -----------------------------------------------------------------------------
const MobileNav = ({ onOpen, isNormalUser, onOpenEditProfile, profileImage, ...rest }) => {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  const handleSair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image
        display={{ base: "flex", md: "none" }}
        src={logoImage}
        h="12"
        w="auto"
        cursor="pointer"
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="notificações"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar size={"sm"} src={profileImage || cnmpffImage} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{nomeUsuario || "Usuário"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {isNormalUser ? "Usuário" : "Gestor"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem icon={<FiEdit3 />} onClick={onOpenEditProfile}>
                Editar Perfil
              </MenuItem>
              <MenuItem onClick={handleSair} icon={<FiLogOut />}>
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

// -----------------------------------------------------------------------------
// SidebarWithHeader (componente principal)
// -----------------------------------------------------------------------------
const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isHelpFormOpen,
    onOpen: onOpenHelpForm,
    onClose: onCloseHelpForm,
  } = useDisclosure();
  const {
    isOpen: isEditProfileOpen,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
  } = useDisclosure();

  const [isNormalUser, setIsNormalUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const toast = useToast();
  const token = localStorage.getItem("token");

  // Carrega dados iniciais
  useEffect(() => {
    const perfilUsuario = localStorage.getItem("perfilUsuario");
    setIsNormalUser(perfilUsuario === "usuario");

    const nomeUsuario = localStorage.getItem("nomeUsuario");
    if (nomeUsuario) {
      setUserName(nomeUsuario);
    }

    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImagePreview(savedProfileImage);
    }
  }, [isEditProfileOpen]);

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      {/* SIDEBAR - DESKTOP */}
      <SidebarContent
        onClose={onClose}
        isNormalUser={isNormalUser}
        onOpenHelpForm={onOpenHelpForm}
        display={{ base: "none", md: "block" }}
      />

      {/* SIDEBAR - MOBILE (Drawer) */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            isNormalUser={isNormalUser}
            onOpenHelpForm={onOpenHelpForm}
          />
        </DrawerContent>
      </Drawer>

      {/* TOPO (NAVBAR) */}
      <MobileNav
        onOpen={onOpen}
        isNormalUser={isNormalUser}
        onOpenEditProfile={onOpenEditProfile}
        profileImage={profileImagePreview}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>

      {/* MODAL DE AJUDA */}
      <HelpForm isOpen={isHelpFormOpen} onClose={onCloseHelpForm} />

      {/*
        Se você desejar criar um modal de editar perfil, pode fazê-lo aqui.
        Exemplo rápido (descomente se necessário):
        
        <Modal isOpen={isEditProfileOpen} onClose={onCloseEditProfile}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Perfil</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              // Coloque os campos para edição de perfil
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseEditProfile}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      */}
    </Box>
  );
};

export default SidebarWithHeader;
