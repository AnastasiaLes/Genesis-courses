import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { CourseImg } from './singleCourse.styled';
import { useGetOneCourseQuery } from "../../redux/coursesSlice"

import { LessonType } from '../../redux/types';
import { Lesson } from './lesson';

const SingleCourse = () => {
    const params = useParams();

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

    return (
    isLoading
        ? <CircularProgress
            color="primary"
            size='100px'
            sx={{ marginTop: '50px' }} />
        :
        <div>
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
            
                {isError
                    ? <h3>Oops, something went wrong...</h3>
                    : <h3>Description of the course: </h3>
                }
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
                
            {data?.lessons.map((singleLesson: LessonType) =>
                <Lesson
                    handleLesson={handleLesson}
                    lesson={singleLesson}
                    video={video}
                />
            )}
            
        </div>
    )
}

export default SingleCourse;