import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
border-top: 3px solid #088F8F;
box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
background-color: hsl(210,8%,97.5%);
width: -webkit-calc(100vw - 10px);
overflow-x: hidden; 
padding: 20px 0;
display: flex;
align-items: baseline;
justify-content: space-around;
margin: 0;
`;

export const TelIocon = styled.svg`
margin-right: 10px;
margin-bottom: -3px;
fill: #088F8F;
`;