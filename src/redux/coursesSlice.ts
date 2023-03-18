import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CoursesTypes, SingleCourseType } from './types';

export const coursesListAPI = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.wisey.app/api/v1',
        prepareHeaders: (headers) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTA2Y2E0My1iYWIwLTRhNmUtOGQ3ZS1lY2NjNzFmZGE3OWEiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwNjEzMTAsImV4cCI6MTY3OTk2MTMxMH0.p8DESs-AleRWKRQRrr5TdZ21hGSmcNJDSJNP0J814SY";
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    }),
    endpoints: builder => ({
        getCourses: builder.query<CoursesTypes, void>({
            query: () => ({
                url: `/core/preview-courses`,
                method: 'GET',
            }),
        }),
        getOneCourse: builder.query <SingleCourseType, string | undefined>({
            query: (id) => ({
                url: `/core/preview-courses/${id}`
            })
        })
    }),
});

export const { useGetCoursesQuery, useGetOneCourseQuery } = coursesListAPI;