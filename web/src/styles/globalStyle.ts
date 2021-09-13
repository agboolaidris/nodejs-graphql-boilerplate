import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
  font-family: 'Roboto', sans-serif;
  }

body{
  width:100%;
  min-height:100vh;
  background-color:#E5E5E5;
  
}

p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 25px;
  }

@media only screen and (max-width:700px){
  p,a {
      font-size: 14px;
      line-height: 18px;
    }
}


`;
