import {IEpisodeSlice} from './episodes.store.definition';

enum ESlice {
    EPISODES = 'EPISODES'
}

type TStore = {
    [ESlice.EPISODES]: IEpisodeSlice;
};

export type {TStore};
export {ESlice};
