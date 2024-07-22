import React from "react";
import {
  ContainerPaginaInicial,
  Logo,
  Subtitulo,
  DetalheFooter,
  DivBotao,
} from "../Styles/TelaInicial";
import { BotaoCadastrar, BotaoEntrar } from "../Components/Botoes";
import logo from "../img/logo.png"; // Caminho relativo para a imagem
import Login from "./Login";

const TelaInicial = () => {
  return (
    <>
      <ContainerPaginaInicial>
        <Logo src={logo} alt="Logo" />
        <Subtitulo>WR ESTOQUE</Subtitulo>
        <DivBotao>
          <a href={<Login/>}><BotaoCadastrar/></a>
          <a href={<Login/>}><BotaoEntrar /></a>
        </DivBotao>
        <DetalheFooter />
      </ContainerPaginaInicial>
    </>
  );
};

export default TelaInicial;
