import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialState = {
    isLoading: false,
    angelsList: []
}

export const fetchFilteredAngels = createAsyncThunk('angels/angels/get', 
    async ({filter, sort}) => {

        const queryParams = new URLSearchParams({
            ...filter,
            sort
        });
        
        const res = await axios.get(`${API_URL}/api/angels/angels/get?${queryParams}`);
        return res?.data;
    }
);

const angelsFilterSlice = createSlice({
    name: 'filteredAngels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredAngels.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchFilteredAngels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.angelsList = action.payload
        }).addCase(fetchFilteredAngels.rejected, (state, action) => {
            state.angelsList = [],
            state.isLoading = false
        })
    }
});

export const likeAngel = createAsyncThunk('angels/angels/like', 
    async (id) => {
    const {angelId } = id;
    console.log(angelId);
    
    const res = await axios.post(`${API_URL}/api/angels/angels/like/${angelId}`, id, {
        withCredentials: true
     });
    return res?.data;
}
);
export const unlikeAngel = createAsyncThunk('angels/angels/unlike', async (id) => {
    console.log(id);
    const res = await axios.post(`${API_URL}/api/angels/angels/unlike/${id}`);
    return res?.data;
}
);
export const getLikes = createAsyncThunk('angels/angels/likes', async (id) => {
    const res = await axios.get(`${API_URL}/api/angels/angels/likes/${id}`);
    return res?.data;
}
);

export const getAllLikes = createAsyncThunk('angels/angels/allLikes', async () => {
    const res = await axios.get(`${API_URL}/api/angels/angels/allLikes`);
    return res?.data;
}
);


const angelLikesSlice = createSlice({
    name: 'angelLikes',
    initialState: {
        isLoading: false,
        likes: []
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase( likeAngel.pending,  (state, action) => {
            state.isLoading = true;
        }).addCase(likeAngel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.likes = action.payload.likes;
        }
        ).addCase(likeAngel.rejected, (state, action) => {
            state.isLoading = false;
            state.likes = [];
        }).addCase(unlikeAngel.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(unlikeAngel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.likes = action.payload;
        }).addCase(unlikeAngel.rejected, (state, action) => {
            state.isLoading = false;
            state.likes = [];
        }).addCase(getLikes.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getLikes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.likes = action.payload.likes;
        }).addCase(getLikes.rejected, (state, action) => {
            state.isLoading = false;
            state.likes = [];
        })
    }
});

export const addComment = createAsyncThunk('angels/angels/comments/',
    async (id) => {
        const { angelId, userId, commentText } = id;
        console.log(angelId, userId, commentText);

        const res = await axios.post(`${API_URL}/api/angels/angels/comments/${angelId}`, id,);
        return res?.data;
    }
);

export const getComments = createAsyncThunk('angels/angels/comments/',
    async (id) => {
        const res = await axios.get(`${API_URL}/api/angels/angels/comments/${id}`);
        return res?.data;
    } 
);

const angelCommentsSlice = createSlice({
    name: 'angelLkes',
    initialState: {
        isLoading: false,
        comments: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase( addComment.pending, (state, action) => {
            state.isLoading = true;
        }).addCase( addComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.comments;
        }).addCase( addComment.rejected, (state,action) => {
            state.isLoading = false;
            state.comments = [];
        }).addCase( getComments.pending, (state, action) => {
            state.rejected = true;
        }).addCase( getComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.comments = action.payload.comments;
        }).addCase( getComments.rejected, (state, action) => {
            state.isLoading = false;
            state.comments = [];
        });
    }
});


export default  angelsFilterSlice.reducer;
export const angelLikesReducer = angelLikesSlice.reducer;
export const angelCommentsReducer = angelCommentsSlice.reducer;