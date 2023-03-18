import { useGetCoursesQuery } from '../redux/coursesSlice';
import { CourseContainer, InsideContainer, RateContainer } from './courseList.styled';

const CoursesList = () => {
    const {data, isLoading} = useGetCoursesQuery();

    data && console.log(data.courses);
    return (
        isLoading
            ? <p>Loading...</p>
            :
        <>
            
                <h1>Our Courses</h1>
           
                {data && data.courses.map(course =>
                    <CourseContainer key={course.id}>
                        <h2>{course.title}</h2> 
                        <InsideContainer>
                            <img src={`${course.previewImageLink}/cover.webp`} alt={course.title} width={300} />
                            
                            <h3>Skills:</h3>
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

        </>
        
    )
}
export default CoursesList;