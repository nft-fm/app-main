import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --color-text: '#21252C'
    }
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body{
        background: #fff;
        -webkit-font-smoothing: antialiased;
    }
  
    html{
        font-size: 100%;
    }
    h3 {
        font-style: normal;
        font-weight: 500;
        font-size: 50px;
        line-height: 100%;
        color: var(---color-text);
    }
    h4 {
        font-style: normal;
        font-weight: normal;
        font-size: 37px;
        line-height: 110%;
        color: var(---color-text);
        &.bold  {
            font-weight: bold;
        }
    }
    h5 {
        font-style: normal;
        font-weight: normal;
        font-size: 28px;
        line-height: 120%;
        color: var(---color-text);
        &.bold  {
            font-weight: bold;
        }
    }
    h6 {
        font-style: normal;
        font-weight: normal;
        font-size: 21px;
        line-height: 120%;
    }
    p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 150%;
        &.bold  {
            font-weight: bold;
        }
    }
    a {
        font-size: 1rem;
    }
    span {
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 150%;
        &.bold  {
            font-weight: bold;
        }
    }
    
    .textWhite {
        color: #FBFAFB
    }
    code, button {
        font-size: 16px;
    }
    button {
        outline: none !important;
    }
`;