import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  NormalText,
  CriarText,
  Row,
  Wrapper,
} from "./styles";

const Cadastro = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const schema = yup
    .object({
      nome: yup.string().min(4, "No minimo 4 digitos").required(),
      email: yup.string().email("Email inválido").required(),
      password: yup.string().min(6, "No minimo 6 digitos").required(),
    })
    .required();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
      });

  const onSubmit = async (formData) => {
    const ident = (totalUsers + 1).toString();
    setUser({
        id: ident,
        ...formData
    })

    try {
        await api.post("/users", formData);
        navigate("/login");
    } catch (e) {
        alert("Erro no cadastro", { error: e.message });
    }
  };

  console.log("errors", errors);

  useEffect(() => {
    api.get("/users").then((response) => {
      setTotalUsers(response.data.length);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    console.log(user);
    
  }, [user]);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome Completo"
                leftIcon={<MdPerson />}
                errorMessage={errors?.nome?.message}
                name="nome"
                control={control}
              />
              <Input
                placeholder="E-mail"
                errorMessage={errors?.email?.message}
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              <Input
                type="password"
                errorMessage={errors?.password?.message}
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="password"
                control={control}
              />
              <Button title="Entrar" variant="secondary" type="submit" />
            </form>
            <br />
            <SubtitleLogin>
              Ao clicar em "criar minha conta grátis", declaro que aceito as
              Políticas de Privacidade e os Termos de Uso da DIO.
            </SubtitleLogin>
            <Row>
              <NormalText>Já tenho conta</NormalText>
              <CriarText>
                <Link to="/login">Fazer login</Link>
              </CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Cadastro };
