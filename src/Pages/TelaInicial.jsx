import React from 'react';
import { ContainerPaginaInicial, Logo, Subtitulo, DetalheFooter } from '../Styles/TelaInicial';
import { BotaoCadastrar, BotaoEntrar } from '../Components/Botoes';
import logo from '../img/logo.png'; // Caminho relativo para a imagem

const TelaInicial = () => {
  return (
    <>
    <ContainerPaginaInicial>
      <Logo src={logo} alt="Logo" />
      <Subtitulo>WR ESTOQUE</Subtitulo>
      <BotaoCadastrar />
      <BotaoEntrar />
    </ContainerPaginaInicial>
      <DetalheFooter/>
    </>
  );
};

export default TelaInicial;
