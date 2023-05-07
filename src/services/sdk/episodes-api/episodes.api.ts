import axios, {AxiosError} from 'axios';
import {TypedUseSelectorHook} from 'react-redux';
import {API_KEY, BASE_URLS} from './episodes.url';
import {IEpisodesApi, TEpisodeRecord, TEpisodeResponse} from './episode.definitions';
import {transformEpisodeData, transformEpisodeWithAdditionalData} from './episode.transformers';
import {episodeSliceDefinitions, sliceDefitions} from '@/common';
import {TDispatch, episodeActions} from '@/store';

const EpisodeApi = (dispatchAction: TDispatch, selector: TypedUseSelectorHook<sliceDefitions.TStore>): IEpisodesApi => {
    const onError = (error: AxiosError): void => {
        console.error(error);
        dispatchAction(episodeActions.onError({
            error: {errorCode: error.status ?? 0, errorMessage: error.message ?? ''}
        }));
    };

    const getEpisodeRecord = (): TEpisodeRecord => {
        const episodeRecord = selector((state) => state[sliceDefitions.ESlice.EPISODES].episodeData);
        return episodeRecord;
    };

    const getEpisode = (id: number): episodeSliceDefinitions.TEpisodeEntity => {
        const episodeRecord = getEpisodeRecord();
        return episodeRecord[id];
    };

    const setSelectedEpisode = (episodeId: number): void => {
        dispatchAction(episodeActions.selectEpisode({episodeId}));
    };

    // for poster and rating details
    const loadAdditionalData = async (
        episodeData: episodeSliceDefinitions.TEpisodeEntity
    ): Promise<episodeSliceDefinitions.TEpisodeEntity | AxiosError> => {
        return axios.get(BASE_URLS.omdb, {params: {apikey: API_KEY, t: episodeData.title}}).then(({data}) => {
            return transformEpisodeWithAdditionalData(episodeData, data);
        }).catch((error: AxiosError) => {
            onError(error);
            return error;
        });
    };

    // loads all episodes at once
    const loadEpisodes = async (): Promise<TEpisodeRecord | AxiosError> => {
        return axios.get(BASE_URLS.episodes, {params: {format: 'json'}}).then((response) => {
            const {results = []} = response.data as unknown as TEpisodeResponse;
            const episodeRecord: TEpisodeRecord = {};
            const additionalDataQueue: Promise<episodeSliceDefinitions.TEpisodeEntity | AxiosError>[] = [];

            results.reduce((record, episodeEntity) => {
                const episodeData = transformEpisodeData(episodeEntity);
                record[episodeEntity.episode_id] = episodeData;
                additionalDataQueue.push(loadAdditionalData(episodeData));

                return record;
            }, episodeRecord);

            dispatchAction(episodeActions.clear());
            dispatchAction(episodeActions.addBulkEpisodes({episodeRecord}));

            /**
             * to retrive additional data relevant to individual episodes asynchronously
             * no redux update on error, as data required is optional
             * view should not be blocked
             */

            Promise.all(additionalDataQueue).then((additionalEpisodeEntities) => {
                additionalEpisodeEntities.forEach((episodeData) => {
                    dispatchAction(episodeActions.addUpdateEpisode({
                        episodeData: episodeData as episodeSliceDefinitions.TEpisodeEntity
                    }));
                });
            });

            return episodeRecord;
        }).catch((error: AxiosError) => {
            onError(error);
            return error;
        });
    };

    return {
        setSelectedEpisode,
        loadEpisodes,
        loadAdditionalData,
        getEpisodeRecord,
        getEpisode
    };
};

export {EpisodeApi};
