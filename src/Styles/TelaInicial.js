import styled from "styled-components";

export const ContainerPaginaInicial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;

  @media (max-width: 430px) and (max-height: 932px) {
    padding: 20px;
  }
`;

export const Titulo = styled.h1`
  font-size: 50px;
  color: #333;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif; /* Aplicedededeeydeudija a fonte Poppins */

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 1.5rem;
    color: darkblue;
  }
`;

export const Subtitulo = styled.h2`
  font-size: 23px;
  color: #333;
  margin-top: -5%;
  margin-bottom: 20%;
  font-family: @media (max-width: 430px) and (max-height: 932px) {
    font-size: 1.25rem;
    color: darkblue;
  }
`;

export const Logo = styled.img`
  width: 250px; /* Ajuste o tamanho conforme necessário */
  height: 250px;
`;

export const BotaoCadastro = styled.button`
  background-color: #2b439c;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "60px"};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 30px;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
  font-family: "Poppins", sans-serif; /* Aplica a fonte Poppins */

  @media (max-width: 430px) and (max-height: 932px) {
    padding: auto;
    font-size: 20px;
  }
`;

export const BotaoLogin = styled.button`
  background-color: white;
  color: black;
  border: 2px solid #ccc;
  padding: 10px 20px;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "60px"};
  font-size: 30px;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 430px) and (max-height: 932px) {
    padding: auto;
    font-size: 20px;
  }
`;
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1; 
`;

export const DetalheFooter = styled.div`
  width: 100%; 
  height: 50px;
  background-color: #2B439C;
  border-radius: 200px 200px 0 0;
  position: absolute; 
  bottom: 0;
  left: 0;
`;