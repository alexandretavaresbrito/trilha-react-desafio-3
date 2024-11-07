import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
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
  EsqueciText,
  CriarText,
  Row,
  Wrapper,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const schema = yup
    .object({
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

  console.log(isValid, errors);

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      const { data } = await api.get(
        `/users?email=${formData.email}&password=${formData.password}`
      );
      console.log(data);

      if (data.length && data[0].id) {
        navigate("/feed");
      } else {
        alert("Usuário ou senha inválido");
      }
    }catch(e) {
      alert('Erro no login', {error: e.message})
    }
  };

  console.log("errors", errors);

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
            <TitleLogin>Faça seu cadastro</TitleLogin>
            <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            <Row>
              <EsqueciText>Esqueci minha senha</EsqueciText>
              <CriarText>Criar Conta</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Login };
