import styled from "styled-components";

export const InputContainer = styled.div`
   margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    color: #333;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%; 
    max-width: 300px; 
    box-sizing: border-box; /* Para incluir o padding na largura total */
  
  }
  
`
export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;