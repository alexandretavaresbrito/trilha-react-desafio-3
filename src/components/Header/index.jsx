import React from "react";
import logo from "../../assets/logo-dio.png";

import { Button } from "../Button";

import {
  Container,
  Wrapper,
  BuscarInputContainer,
  Input,
  Row,
  Menu,
  MenuRight,
  UserPicture,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ autenticado }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Row>
          <Link to="/">
            <img src={logo} alt="Logo da dio" />
          </Link>
          {autenticado ? (
            <>
              <BuscarInputContainer>
                <Input placeholder="Buscar..." />
              </BuscarInputContainer>
              <Menu>Live Code</Menu>
              <Menu>Global</Menu>
            </>
          ) : null}
        </Row>
        <Row>
          {autenticado ? (
            <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4" />
          ) : (
            <>
              <MenuRight onClick={() => navigate("/")}>Home</MenuRight>
              <Button title="Entrar" onClick={() => navigate("/login")} />
              <Button title="Cadastrar" onClick={() => navigate("/cadastro")} />
            </>
          )}
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
