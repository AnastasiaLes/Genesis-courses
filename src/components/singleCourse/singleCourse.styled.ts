import styled from '@emotion/styled';

export const ListBtn = styled.button`
    padding: 10px 20px;
    background-color: #FFBC0F;
    border-radius: 50px;
    border: transparent;
    cursor:pointer;
    margin-top: 20px;

    hover: {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .25);
    } 
`;

export const LessonContainer = styled.div<{active: boolean} >`
background-color: ${props => (props.active
    ? '#FFBC0F40'
    : 'transparent'
)};
    display: flex;
    align-items: baseline;
    gap: 30px;
    cursor: pointer;
    padding-left: 30px;
    border-radius: 10px;

:hover {
    color: blue;
}
`;

export const CourseImg = styled.img`
    width: 800px;
`;