import styled from '@emotion/styled';

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