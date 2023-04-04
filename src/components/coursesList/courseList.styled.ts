import styled from '@emotion/styled';

export const CourseContainer = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    cursor: pointer;
`

export const InsideContainer = styled.div`
    display: flex;
    justify-items: stretch;
    justify-content: center;
    gap: 40px;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        gap: 10px;
        h3, ul {
            margin: 0;
        }
    }
`
