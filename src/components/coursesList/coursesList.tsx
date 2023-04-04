import { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'

import { CourseContainer, InsideContainer } from './courseList.styled'
import { useDispatch } from 'react-redux'
import { setToken } from '../../redux/authSlice'
import { useGetCoursesQuery, useGetTokenQuery } from '../../redux/coursesSlice'

const CoursesList = (): JSX.Element => {
  const dispatch = useDispatch()
  const { data: token, isError: isTokenError } = useGetTokenQuery()
  token && dispatch(setToken(token))
  const { data, isLoading, isError: isCoursesError } = useGetCoursesQuery(undefined, { skip: !token })
  const coursesPerPage = 10
  const totalCourses = data ? data?.courses.length : 0
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: coursesPerPage
  })
  const navigate = useNavigate()

  useEffect(() => {
    const total = data ? Math.ceil(totalCourses / coursesPerPage) : 0
    setPagination({ ...pagination, count: total })
  }, [pagination.from, pagination.to, data])

  const handlePaginationClick = (page: number) => {
    const from = (page - 1) * coursesPerPage
    const to = (page - 1) * coursesPerPage + coursesPerPage
    setPagination({ ...pagination, from, to })
  }

  const currentPageCourses = data?.courses.slice(pagination.from, pagination.to)

  return (
    isLoading
      ? <CircularProgress
        size='100px'
        sx={{ marginTop: '20%', color: '#088F8F' }}
        />
      : <>
            {isTokenError && isCoursesError
              ? <h3>Oops, something went wrong...</h3>
              : <h2>Our Courses</h2>}

            <Box sx={{ width: '100%' }}>
                <Grid container alignItems="stretch" rowSpacing={2} columnSpacing={2}>
                {data && currentPageCourses?.map(course =>
                <Grid item xs={12} md={6} key={course.id} onClick={() => navigate(generatePath('/:id', { id: course.id }))}>
                    <CourseContainer>
                        <h3>{course.title}</h3>
                        <InsideContainer>
                            <img src={`${course.previewImageLink}/cover.webp`} alt={course.title} width={300} />
                        <div>
                            <p><b>Lessons Count: </b>{course.lessonsCount}</p>
                            <p><b>Rate: </b>{course.rating}</p>
                        </div>
                        </InsideContainer>
                        <p>{course.meta.skills && <b>Skills: </b>} {course.meta.skills.join('; ')}</p>
                    </CourseContainer>
                </Grid>
                )}
                </Grid>
            </Box>

    {/* ==Pagination== */}
            {pagination.count > 0 &&
                <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    disabled={pagination.count <= 1}
                    count={pagination.count}
                    onChange={() => handlePaginationClick}
                />
            </Box>}
        </>
  )
}
export default CoursesList