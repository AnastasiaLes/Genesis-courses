import styled from '@emotion/styled';

export const CourseContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin-bottom: 50px;
    padding: 2%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    cursor: pointer;
`;

export const InsideContainer = styled.div`
    display: flex;
    justify-items: stretch;
    justify-content: center;
    gap: 40px;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        gap: 20px;
        h3, ul {
            margin: 0;
        }
    }
`;

export const RateContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-content: start;
    gap: 40px;
`;
