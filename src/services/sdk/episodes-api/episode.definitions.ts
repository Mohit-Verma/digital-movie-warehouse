import {AxiosError} from 'axios';
import {episodeSliceDefinitions} from '@/common';

type TResultsEntity = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters?: string[];
    planets?: string[];
    starships?: string[];
    vehicles?: string[];
    species?: string[];
    created: string;
    edited: string;
    url: string;
};

type TEpisodeResponse = {
    count: number;
    next?: boolean;
    previous?: boolean;
    results?: TResultsEntity[];
};

type TEpisodeRecord = Record<number, episodeSliceDefinitions.TEpisodeEntity>;

interface IEpisodesApi {
    setSelectedEpisode: (episodeId: number) => void;
    loadEpisodes: () => Promise<TEpisodeRecord | AxiosError>,
    loadAdditionalData: (episode: episodeSliceDefinitions.TEpisodeEntity) =>
        Promise<episodeSliceDefinitions.TEpisodeEntity | AxiosError>
    getEpisodeRecord: () => TEpisodeRecord;
    getEpisode: (id: number) => episodeSliceDefinitions.TEpisodeEntity;
}

export type {
    IEpisodesApi,
    TResultsEntity,
    TEpisodeResponse,
    TEpisodeRecord
};
