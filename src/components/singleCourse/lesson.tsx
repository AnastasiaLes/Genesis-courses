import { LessonContainer } from './singleCourse.styled'
import icon from '../../images/symbol-defs.svg'
import { type LessonType } from '../../redux/types'
import { type FC } from 'react'

interface singleLesson {
  lesson: LessonType
  handleLesson: (lesson: LessonType) => void
  video: string
}

export const Lesson: FC<singleLesson> = props => {
  return <LessonContainer
        active={props.lesson.link === props.video}
        key={props.lesson.id}
        onClick={() => props.handleLesson(props.lesson)}
        >
          <svg width="18" height="18" style={{ fill: '#787878' }}>
            <use href={icon + '#icon-check'} />
          </svg>
          <p>{props.lesson.title}</p>
          {props.lesson.status !== 'unlocked' &&
            <svg width="18" height="18" style={{ fill: '#787878' }}>
              <use href={icon + '#icon-lock'} />
            </svg>}
        </LessonContainer>
}
