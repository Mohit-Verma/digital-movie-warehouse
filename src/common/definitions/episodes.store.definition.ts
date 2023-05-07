type TRatingsEntity = {
    Source: string;
    Value: string;
}

type TEpisodeEntity = {
    id: number;
    title: string;
    indexLabel: string;
    openingCrawl: string;
    director: string;
    releaseDate: string;
    actors?: string[];
    posterUrl?: string;
    averageRating?: number;
    distributedRating?: TRatingsEntity[];
};

type TAdditionalEpisodeEntity = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings?: TRatingsEntity[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};

type TError = {
    errorCode: number;
    errorMessage: string;
}

interface IEpisodeSlice {
    selectedEpisodeId?: number;
    episodeData: Record<number, TEpisodeEntity>;
    error: TError;
}

interface IAddBulkEpisodesAction {
    episodeRecord: Record<number, TEpisodeEntity>;
}

interface IAddEpisodeAction {
    episodeData: TEpisodeEntity;
}

interface ISelectEpisodeAction {
    episodeId: number;
}

interface IError {
    error: TError;
}

export type {
    IEpisodeSlice,
    IAddBulkEpisodesAction,
    IAddEpisodeAction,
    ISelectEpisodeAction,
    IError,

    TRatingsEntity,
    TEpisodeEntity,
    TAdditionalEpisodeEntity
};
