import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { LessonContainer, CourseImg, ListBtn } from './singleCourse.styled';
import { useGetOneCourseQuery } from "../../redux/coursesSlice"
import icon from '../../images/symbol-defs.svg'
import { LessonType } from '../../redux/types';

const SingleCourse = () => {
    const params = useParams();
    const navigate = useNavigate()
    const courseId = params['id'];
    const { data, isLoading, isError } = useGetOneCourseQuery(courseId)

    const [video, setVideo] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);
    
    useEffect(() => {
        data && setImage(data?.lessons[0].previewImageLink);
        const firstVideo = data?.lessons.find((lesson: { status: string; }) => lesson.status === 'unlocked');
        const currentLesson = localStorage.getItem(`${courseId}`);
        if (currentLesson) {
            setVideo(currentLesson);   
        } else if (!currentLesson && firstVideo)
        setVideo(firstVideo?.link);
        
    }, [data]);

    const handleLesson = (lesson: LessonType) => {
        lesson.status === 'unlocked'
            ? setVideo(lesson.link)
            : setAlert(true);
        localStorage.setItem(`${courseId}`, lesson.link);
    };

    const handleListBtnClick = () => {
        localStorage.removeItem('playedTime');
        navigate('/');
    }
    
    return (
    isLoading
        ? <CircularProgress
            color="primary"
            size='100px'
            sx={{ marginTop: '50px' }} />
        :
        <div>
            <ListBtn onClick={handleListBtnClick}>Courses List</ListBtn>
            <h2>{data?.title}</h2>
            {video
                ?
                    <ReactPlayer
                    
                    playing
                    controls
                    startOffset='20'
                    url={video}
                    volume={1}
                    width="100%"
                    height="100%"
                    onProgress={(progress) => {
                        localStorage.setItem('playedTime', JSON.stringify(progress.playedSeconds));
                    }}
                />
                : <CourseImg src={`${image}/lesson-1.webp`} alt={data?.title} />
            }
            
                {isError ? <h3>Oops, something went wrong...</h3> : <h3>Description of the course: </h3>}
                <p>{data?.description}</p>
            <h3>Lessons: </h3>
        {/* ==Alert == */}
            {alert && <Alert
                sx={{width: '250px'}}
                variant="filled"
                severity="warning"
                onClose={() => setAlert(false)}
            >
                This video is locked!
                </Alert>}
                
            {data?.lessons.map((lesson: LessonType) =>
                <LessonContainer
                    key={lesson.id}
                    onClick={() => handleLesson(lesson)}
                    style={{backgroundColor: lesson.link && lesson.link===video ? '#FFBC0F40' : 'transparent'}}
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