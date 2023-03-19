import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';
import { CoursesTypes, SingleCourseType } from './types';

export const coursesListAPI = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.wisey.app/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authSlice.token;
;
            console.log(token);
            
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    }),
    endpoints: builder => ({
        getToken: builder.query<any, void>({
            query: () => ({
                url: '/auth/anonymous?platform=subscriptions',
            })
        }),
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

export const { useGetTokenQuery, useGetCoursesQuery, useGetOneCourseQuery } = coursesListAPI;