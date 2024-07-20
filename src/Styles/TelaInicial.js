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
  font-family: "Poppins", sans-serif; 

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 1.5rem;
    color: black;
  }
`;

export const Subtitulo = styled.h2`
  font-size: 23px;
  color: #333;
  margin-top: -5%;
  margin-bottom: 20%;
  font-family: 'poppins';
  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 1.25rem;
    color: black;
  }
`;

export const Logo = styled.img`
  width: 250px; 
  height: 250px;
`;

export const GlobalButton = styled.button`
  background-color: ${(props) => props.color || "#ffffff"};;
  color: ${(props) => props.color || "#000000"};
  border-radius: ${(props) => props.borderRadius || "7px"};
  border: 2px solid #ccc;
  padding: 10px 20px;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "60px"};
  font-size: 30px;
  cursor: pointer;
  margin: 10px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover{
      color: white;
      background-color: darkblue;
    }

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