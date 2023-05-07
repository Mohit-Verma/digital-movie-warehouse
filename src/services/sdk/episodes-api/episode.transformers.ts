import {evaluate} from 'mathjs';
import {TResultsEntity} from './episode.definitions';
import {episodeSliceDefinitions} from '@/common';
import {NUMERIC_ROMAN_MAP} from '@/utils';

const getAverageRating = (distributedRatings?: episodeSliceDefinitions.TRatingsEntity[]): number => {
    let ratings = 0;

    if (!distributedRatings?.length) {
        return ratings;
    }

    distributedRatings.forEach(({Value: value}) => {
        ratings += evaluate(value);
    });
    
    return Math.floor(ratings * 10 / distributedRatings.length);
};

const transformEpisodeData = (episodeEntity: TResultsEntity): episodeSliceDefinitions.TEpisodeEntity => {
    const {
        title,
        director,
        episode_id: id,
        opening_crawl: openingCrawl,
        release_date: releaseDate
    } = episodeEntity;

    return {
        id,
        title: `EPISODE ${NUMERIC_ROMAN_MAP[id]} - ${title}`,
        indexLabel: `EPISODE ${id}`,
        director,
        openingCrawl,
        releaseDate
    };
};

const transformEpisodeWithAdditionalData = (
    episodeEntity: episodeSliceDefinitions.TEpisodeEntity,
    additionalEntity: episodeSliceDefinitions.TAdditionalEpisodeEntity
): episodeSliceDefinitions.TEpisodeEntity => {
    const {
        Ratings: distributedRating,
        Poster: posterUrl
    } = additionalEntity;

    const tData = {
        ...episodeEntity,
        posterUrl,
        distributedRating,
        averageRating: getAverageRating(distributedRating)
    };

    return tData;
};

export {
    transformEpisodeData,
    transformEpisodeWithAdditionalData
};
