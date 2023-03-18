import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { useGetOneCourseQuery } from "../../redux/coursesSlice"
import icon from '../../images/symbol-defs.svg'
import { LessonContainer } from './singleCourse.styled';
import { useState } from 'react';

const SingleCourse = () => {
    const params = useParams();
    const courseId = params['id'];
    const { data } = useGetOneCourseQuery(courseId)

    const [video, setVideo] = useState(data?.lessons[0].link)

    data && console.log(data.lessons[0].link);
    
    return(
        <div>
            <h2>{data?.title}</h2>
            <ReactPlayer playing controls url={video} />
            <h3>Description of the course: </h3> <p>{data?.description}</p>
            <h3>Lessons: </h3>
            {data?.lessons.map(lesson =>
                <LessonContainer
                    key={lesson.id}
                    onClick={() => lesson.status === 'unlocked' && setVideo(lesson.link)}
                    style={{backgroundColor: lesson.link===video ? 'lightblue' : 'transparent'}}
                >
                    <svg width="18" height="18" style={{ fill: '#787878' }}>
                        <use href={icon + '#icon-check'} />
                    </svg>
                    <p>{lesson.title}</p>
                    {lesson.status !== 'unlocked' &&
                        <svg width="18" height="18" style={{ fill: '#787878' }}>
                        <use href={icon + '#icon-lock'} />
                    </svg>}
                </LessonContainer>)}
            
        </div>
    )
}

export default SingleCourse;