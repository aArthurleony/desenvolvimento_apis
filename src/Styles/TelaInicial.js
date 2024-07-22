import styled from "styled-components";

export const ContainerPaginaInicial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 30px;
  height: 80vh;
  text-align: center;
  background-color: white;
  width: 430px;
  height: 932px;
  margin: 0 auto;
`;

export const Titulo = styled.h1`
  font-size: 50px;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  color: black;
`;

export const Subtitulo = styled.h2`
  font-size: 23px;
  color: #333;
  margin-top: -10%;
  margin-bottom: 20%;
  font-family: "poppins";
  color: black;
`;

export const Logo = styled.img`
  width: 250px;
  height: 250px;
`;

export const DivBotao = styled.div`
  width: auto;
  height: auto;
  margin-bottom: 150px
`
export const GlobalButton = styled.button`
  background-color: ${(props) => props.color || "#ffffff"};
  color: ${(props) => props.color || "#000000"};
  border-radius: ${(props) => props.borderRadius || "7px"};
  border: 2px solid #ccc;
  padding: 10px 20px;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "60px"};
  font-size: 30px;
  cursor: pointer;
  margin: 10px;
  padding: auto;
  font-size: 20px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    color: white;
    background-color: #2b439c;
  }
`;
export const DetalheFooter = styled.div`
  width: 432px;
  height: 50px;
  background-color: #2b439c;
  border-radius: 200px 200px 0 0;
  bottom: 0;


`;
