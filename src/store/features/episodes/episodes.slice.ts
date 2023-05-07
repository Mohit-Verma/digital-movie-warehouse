import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {episodeSliceDefinitions as SliceDefs} from '@/common';

const initialState: SliceDefs.IEpisodeSlice = {
    episodeData: {},
    error: {
        errorCode: 0,
        errorMessage: ''
    }
};

const {reducer: episodeReducers, actions: episodeActions} = createSlice({
    name: 'EpisodeSlice',
    initialState,
    reducers: {
        addBulkEpisodes: (state = initialState, action: PayloadAction<SliceDefs.IAddBulkEpisodesAction>) => {
            state.episodeData = action.payload.episodeRecord;
        },
        addUpdateEpisode: (state = initialState, action: PayloadAction<SliceDefs.IAddEpisodeAction>) => {
            const {episodeData} = action.payload;
            state.episodeData[episodeData.id] = episodeData;
        },
        selectEpisode: (state = initialState, action: PayloadAction<SliceDefs.ISelectEpisodeAction>) => {
            state.selectedEpisodeId = action.payload.episodeId;
        },
        onError: (state = initialState, action: PayloadAction<SliceDefs.IError>) => {
            state.error = action.payload.error;
        },
        clear: () => initialState
    }
});

export {
    episodeActions,
    episodeReducers
};
