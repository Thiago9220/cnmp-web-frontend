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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
  Textarea,
  Divider,
  Stack,
  Select,
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
  FiEye,
  FiEyeOff,
  FiUpload,
  FiTrash2,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";

import HelpForm from "../helpform";

import cnmpffImage from "../../assets/cnmpff.png";
import logoImage from "../../assets/logo.png";

const NavItem = ({ icon, route, isActive, children, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = () => {
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

const SidebarContent = ({ onClose, isNormalUser, onOpenHelpForm, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          isActive={location.pathname === link.route}
        >
          {link.name}
        </NavItem>
      ))}


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

const MobileNav = ({
  onOpen,
  isNormalUser,
  onOpenEditProfile,
  profileImage,
  displayName,
  ...rest
}) => {
  const navigate = useNavigate();
  const nomeUsuario = displayName || localStorage.getItem("nomeUsuario") || "";

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
          aria-label="notificacoes"
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
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [notifyByPush, setNotifyByPush] = useState(false);
  const [focusHours, setFocusHours] = useState("09:00 - 17:30");
  const [workspaceMode, setWorkspaceMode] = useState("remoto");
  const [themeAccent, setThemeAccent] = useState("default");

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    const perfilUsuario = localStorage.getItem("perfilUsuario");
    setIsNormalUser(perfilUsuario === "usuario");

    const nomeUsuario = localStorage.getItem("nomeUsuario");
    setUserName(nomeUsuario || "");
    setDisplayName(nomeUsuario || "");

    setEmail(localStorage.getItem("usuarioEmail") || "");
    setDepartment(localStorage.getItem("usuarioDepartamento") || "");
    setBio(localStorage.getItem("usuarioBio") || "");

    const storedFocusHours = localStorage.getItem("usuarioFocusHours");
    setFocusHours(storedFocusHours || "09:00 - 17:30");

    const storedWorkspaceMode = localStorage.getItem("usuarioWorkspaceMode");
    setWorkspaceMode(storedWorkspaceMode || "remoto");

    const storedTheme = localStorage.getItem("accentTheme");
    setThemeAccent(storedTheme || "default");

    const storedNotifyEmail = localStorage.getItem("notifyByEmail");
    setNotifyByEmail(storedNotifyEmail === null ? true : storedNotifyEmail === "true");
    const storedNotifyPush = localStorage.getItem("notifyByPush");
    setNotifyByPush(storedNotifyPush === "true");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);

    const savedProfileImage = localStorage.getItem("profileImage");
    setProfileImagePreview(savedProfileImage || null);
  }, [isEditProfileOpen]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast({
        title: "Imagem grande demais",
        description: "Escolha uma foto com ate 3 MB.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setProfileImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImagePreview(null);
    localStorage.removeItem("profileImage");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({
      title: "Foto removida",
      description: "Voltamos para o avatar padrao.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveProfile = () => {
    if (!displayName.trim()) {
      toast({
        title: "Informe um nome",
        description: "Seu nome de exibicao e obrigatorio.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast({
        title: "Email invalido",
        description: "Confira o endereco informado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("nomeUsuario", displayName.trim());
    localStorage.setItem("usuarioEmail", email.trim());
    localStorage.setItem("usuarioDepartamento", department.trim());
    localStorage.setItem("usuarioBio", bio.trim());
    localStorage.setItem("notifyByEmail", String(notifyByEmail));
    localStorage.setItem("notifyByPush", String(notifyByPush));
    localStorage.setItem("usuarioFocusHours", focusHours);
    localStorage.setItem("usuarioWorkspaceMode", workspaceMode);
    localStorage.setItem("accentTheme", themeAccent);

    if (profileImagePreview) {
      localStorage.setItem("profileImage", profileImagePreview);
    } else {
      localStorage.removeItem("profileImage");
    }

    setUserName(displayName.trim());

    toast({
      title: "Perfil atualizado",
      description: "Suas informacoes e preferencias foram salvas.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    onCloseEditProfile();
  };

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha a senha atual e a nova senha.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "Use ao menos 6 caracteres.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "As senhas nao conferem",
        description: "Digite a nova senha novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (oldPassword === newPassword) {
      toast({
        title: "Nada mudou",
      description: "A nova senha precisa ser diferente da atual.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("senhaUsuario", newPassword);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOldPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);

    toast({
      title: "Senha atualizada",
      description: "Guarde sua nova senha com seguranca.",
      status: "success",
      duration: 4000,
      isClosable: true,
      icon: <FiShield />,
    });
  };

  const handleResetPreferences = () => {
    setNotifyByEmail(true);
    setNotifyByPush(false);
    setFocusHours("09:00 - 17:30");
    setWorkspaceMode("remoto");
    setThemeAccent("default");
    setBio("");

    toast({
      title: "Preferencias restauradas",
      description: "Voltamos para as configuracoes recomendadas.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>

      <SidebarContent
        onClose={onClose}
        isNormalUser={isNormalUser}
        onOpenHelpForm={onOpenHelpForm}
        display={{ base: "none", md: "block" }}
      />


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


      <MobileNav
        onOpen={onOpen}
        isNormalUser={isNormalUser}
        onOpenEditProfile={onOpenEditProfile}
        profileImage={profileImagePreview}
        displayName={userName}
      />


      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>

      <Modal
        isOpen={isEditProfileOpen}
        onClose={onCloseEditProfile}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personalizar perfil</ModalHeader>
          <ModalBody>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                align="flex-start"
              >
                <Stack spacing={3} align="center">
                  <Avatar size="xl" src={profileImagePreview || cnmpffImage} />
                  <Button
                    size="sm"
                    leftIcon={<FiUpload />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Trocar foto
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<FiTrash2 />}
                    onClick={handleRemoveImage}
                    isDisabled={!profileImagePreview}
                  >
                    Remover foto
                  </Button>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    display="none"
                  />
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    PNG ou JPG ate 3 MB
                  </Text>
                </Stack>

                <Stack flex="1" spacing={4}>
                  <FormControl>
                    <FormLabel>Nome completo</FormLabel>
                    <Input
                      value={displayName}
                      onChange={(event) => setDisplayName(event.target.value)}
                      placeholder="Seu nome como sera exibido"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email corporativo</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="voce@cnmp.br"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Area / Equipe</FormLabel>
                    <Input
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      placeholder="Ex.: Planejamento Estrategico"
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <FormControl>
                <FormLabel>Bio rapida</FormLabel>
                <Textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows={3}
                  placeholder="Conte em poucas linhas o que voce faz e como prefere ser contatado."
                />
              </FormControl>

              <Stack spacing={4}>
                <Text fontWeight="semibold">Preferencias</Text>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl display="flex" alignItems="center">
                    <Switch
                      isChecked={notifyByEmail}
                      onChange={(event) => setNotifyByEmail(event.target.checked)}
                      mr={3}
                    />
                    <FormLabel mb="0">Alertas por e-mail</FormLabel>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <Switch
                      isChecked={notifyByPush}
                      onChange={(event) => setNotifyByPush(event.target.checked)}
                      mr={3}
                    />
                    <FormLabel mb="0">Notificacoes no painel</FormLabel>
                  </FormControl>
                </Stack>

                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl>
                    <FormLabel>Horario de foco</FormLabel>
                    <Select
                      value={focusHours}
                      onChange={(event) => setFocusHours(event.target.value)}
                    >
                      <option value="08:00 - 17:00">08:00 - 17:00</option>
                      <option value="09:00 - 17:30">09:00 - 17:30</option>
                      <option value="10:00 - 19:00">10:00 - 19:00</option>
                      <option value="flexivel">Flexivel / sob demanda</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Formato de trabalho</FormLabel>
                    <Select
                      value={workspaceMode}
                      onChange={(event) => setWorkspaceMode(event.target.value)}
                    >
                      <option value="remoto">Remoto</option>
                      <option value="hibrido">Hibrido</option>
                      <option value="presencial">Presencial</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cor de destaque</FormLabel>
                    <Select
                      value={themeAccent}
                      onChange={(event) => setThemeAccent(event.target.value)}
                    >
                      <option value="default">Vermelho CNMP</option>
                      <option value="oceano">Azul oceano</option>
                      <option value="floresta">Verde floresta</option>
                      <option value="neon">Roxo neon</option>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing={4}>
                <Text fontWeight="semibold">Seguranca</Text>
                <FormControl>
                  <FormLabel>Senha atual</FormLabel>
                  <InputGroup>
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(event) => setOldPassword(event.target.value)}
                      placeholder="Digite sua senha atual"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="Mostrar senha atual"
                        icon={showOldPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowOldPassword((prev) => !prev)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Nova senha</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="Pelo menos 6 caracteres"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="Mostrar nova senha"
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Confirmar nova senha</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Repita a nova senha"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="Mostrar confirmacao"
                        icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  onClick={handleUpdatePassword}
                  leftIcon={<FiShield />}
                  alignSelf={{ base: "stretch", md: "flex-start" }}
                  colorScheme="red"
                  variant="outline"
                >
                  Atualizar senha com seguranca
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              leftIcon={<FiRefreshCw />}
              onClick={handleResetPreferences}
              mr="auto"
            >
              Restaurar padroes
            </Button>
            <Button onClick={onCloseEditProfile} mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleSaveProfile}>
              Salvar alteracoes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HelpForm isOpen={isHelpFormOpen} onClose={onCloseHelpForm} />


    </Box>
  );
};

export default SidebarWithHeader;
