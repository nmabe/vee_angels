import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminAngelsSlice from './admin/angel-slice';
import  angelsFilterSlice from './angels/angels-slice';
import  angelsLikesSlice  from './angels/angels-slice';
import usersReducer from './angels/user-slice';
import  angelCommentsSlice  from './angels/angels-slice';
import applicationSlice from './applications/applications-slice';
import contactSlice from './contact/contact-slice';
import contactReportsSlice from './contact/contact-reports-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAngel: adminAngelsSlice,
        users: usersReducer,
        filteredAngel: angelsFilterSlice,
        angelLikes: angelsLikesSlice,
        angelComments: angelCommentsSlice,
        applications: applicationSlice,
        contact: contactSlice,
        reports: contactReportsSlice
    }
});

export default store;