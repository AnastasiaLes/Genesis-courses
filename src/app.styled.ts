import styled from '@emotion/styled';

export const Container = styled.div`
display: flex;
justify-content: center;
justify-items: center;
align-items: center;
flex-direction: column;
width: 1100px;
margin-left: auto;
margin-right: auto;

@media screen and (max-width: 1024px) {
   max-width: 90vw; 
}

`