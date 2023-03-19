import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { CourseContainer, InsideContainer, RateContainer } from './courseList.styled';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/authSlice';
import { useGetCoursesQuery, useGetTokenQuery } from '../../redux/coursesSlice';

const CoursesList = () => {
    const dispatch = useDispatch();
    const { data: token, isError: isTokenError } = useGetTokenQuery();
    token && dispatch(setToken(token));
    const { data, isLoading, isError: isCoursesError } = useGetCoursesQuery(undefined, {skip: !token});
    const coursesPerPage = 10;
    const totalCourses = data ? data?.courses.length : 0;
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: coursesPerPage
    });
    const navigate = useNavigate();

    useEffect(() => {
        const total = data ? Math.ceil(totalCourses / coursesPerPage) : 0;
        setPagination({ ...pagination, count: total });
    }, [pagination.from, pagination.to, data]);

    const handlePaginationClick = (event: any, page: number) => {
        const from = (page - 1) * coursesPerPage;
        const to = (page - 1) * coursesPerPage + coursesPerPage;
        setPagination({...pagination, from: from, to: to})
    }

    const currentPageCourses = data?.courses.slice(pagination.from, pagination.to);
    
    return (
    isLoading
        ? <CircularProgress
            color="primary"
            size='100px'
            sx={{ marginTop: '50px' }}
        />
        :
        <>
                {isTokenError && isCoursesError ? <h3>Oops, something went wrong...</h3> : <h1>Our Courses</h1>}
                {data && currentPageCourses?.map(course =>
                    <CourseContainer key={course.id} onClick={() => navigate(generatePath("/:id", { id: course.id }))}>
                        <h2>{course.title}</h2> 
                        <InsideContainer>
                            <img src={`${course.previewImageLink}/cover.webp`} alt={course.title} width={300} />
                            
                            {course.meta.skills && <h3>Skills:</h3>}
                            <ul>
                                {course.meta.skills && course.meta.skills.map(
                                    skill =>
                                        <li key={skill}>{skill.replace(skill[0], skill[0].toUpperCase())}</li>)
                                } 
                            </ul>
                        </InsideContainer>
                        <RateContainer>
                            <p><b>Lessons Count: </b>{course.lessonsCount}</p>
                            <p><b>Rate: </b>{course.rating}</p>
                        </RateContainer>
                    </CourseContainer>
                    
                )}

    {/* ==Pagination== */}
                {pagination.count > 0 && <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        disabled={pagination.count <= 1 ? true : false} 
                        count={pagination.count}
                        onChange={handlePaginationClick}
                    />
                </Box>}

        </>
        
    )
}
export default CoursesList;