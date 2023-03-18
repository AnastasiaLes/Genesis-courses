export interface CoursesTypes {
    courses: {
        id: string | null;
        title: string;
        tags: string[];
        launchDate: string;
        status: string;
        description: string;
        duration: number;
        lessonsCount: number;
        containsLockedLessons: boolean;
        previewImageLink: string;
        rating: number;
        meta: {
            slug: string;
            skills: string[];
            courseVideoPreview: {
                link: string;
                duration: number;
                previewImageLink: string;
            }
        }
    }[]
};

export interface SingleCourseType {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    previewImageLink: string;
    rating: number;
    meta: {
        slug: string;
        skills: string[];
        courseVideoPreview: {
            link: string;
            duration: number;
            previewImageLink: string;
        }
    }
    lessons: {
        id: string;
        title: string;
        duration: number;
        order: number;
        type: string;
        status: string;
        link: string;
        previewImageLink: string;
        meta: null;
    }[]
    containsLockedLessons: boolean;
}