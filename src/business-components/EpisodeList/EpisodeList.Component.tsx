import {useMemo} from 'react';
import {LABELS} from './epiisodeList.config';
import {episodeSliceDefinitions as EpisodesDef, appDefinitions, episodeSliceDefinitions} from '@/common';
import {EmptyErrorView, List, RatingComponent} from '@/components';

type TProps = {
    selectedEpisodeId?: number;
    episodes: EpisodesDef.TEpisodeEntity[];
    searchText?: string;
    appliedSort?: string;
    emptyListMessage?: string;
    onEpisodeSelect?: (episodeId: number) => void;
}

const EpisodeList: React.FC<TProps> = (props: TProps): JSX.Element => {
    const {selectedEpisodeId, appliedSort = '', searchText = '', emptyListMessage = LABELS.EMPTY_LIST_MESSAGE, episodes = []} = props;
    
    // sort and search handling
    const episodeList = useMemo(() => {
        const modifiedList: EpisodesDef.TEpisodeEntity[] = [];

        switch (appliedSort) {
            case appDefinitions.ESort.EPI_ASC:
                modifiedList.push(...episodes.sort((current, next) =>
                    current.indexLabel.localeCompare(next.indexLabel)
                ));
                break;
            case appDefinitions.ESort.EPI_DESC:
                modifiedList.push(...episodes.sort((current, next) =>
                    next.indexLabel.localeCompare(current.indexLabel)
                ));
                break;
            case appDefinitions.ESort.TIME_ASC:
                modifiedList.push(...episodes.sort((current, next) =>
                    current.releaseDate.localeCompare(next.releaseDate)
                ));
                break;
            case appDefinitions.ESort.TIME_DESC:
                modifiedList.push(...episodes.sort((current, next) =>
                    next.releaseDate.localeCompare(current.releaseDate)
                ));
                break;
            case appDefinitions.ESort.RATING_ASC:
                modifiedList.push(...episodes.sort((current, next) =>
                    (current.averageRating ?? 0) - (next.averageRating ?? 0)
                ));
                break;
            case appDefinitions.ESort.RATING_DESC:
                modifiedList.push(...episodes.sort((current, next) =>
                    (next.averageRating ?? 0) - (current.averageRating ?? 0)
                ));
                break;
            default:
                modifiedList.push(...episodes);
                break;
        }

        if (searchText) {
            const filteredList = modifiedList.filter((episode) => {
                const {id, title, director} = episode;
                const text = searchText.toLowerCase();
                return (
                    id.toString().toLowerCase().includes(text) ||
                    title.toLowerCase().includes(text) ||
                    director.toLowerCase().includes(text)
                );
            });

            modifiedList.length = 0;
            modifiedList.push(...filteredList);
        }

        return modifiedList;
    }, [appliedSort, searchText, episodes]);

    // retain episode selection handling
    const selectedEpisodeIndex = useMemo(() => {
        return episodeList.findIndex((episode) => episode.id === selectedEpisodeId);
    }, [episodeList]);

    // conditional empty result message handling
    const emptyResultMessage = useMemo(() => {
        if (searchText) {
            return `${LABELS.EMPTY_SEARCH_LIST_MESSAGE} '${searchText}'`;
        }
        return emptyListMessage;
    }, [episodeList, searchText]);

    if (!episodeList.length) {
        return (
            <EmptyErrorView
                mode={EmptyErrorView.Mode.EMPTY}
                message={emptyResultMessage} />
        );
    }

    return (
        <div className="episode-list-bcomponent">
            <List
                selectable={!!props.onEpisodeSelect}
                selectedIndex={selectedEpisodeIndex}
                items={episodeList}
                onSelect={(item) => props.onEpisodeSelect?.((item as EpisodesDef.TEpisodeEntity).id)}
                renderItem={(episode) => {
                    const {
                        title, indexLabel, releaseDate, averageRating = 0
                    } = episode as episodeSliceDefinitions.TEpisodeEntity;

                    return (
                        <div className="episode-entity-item">
                            <div className="episode-index-label">
                                <span> {indexLabel} </span>
                            </div>
                            <div className="episode-title-label">
                                <span> {title} </span>
                            </div>
                            <div className="episode-rating">
                                <RatingComponent
                                    readonly maxValue={10}
                                    rating={averageRating}
                                    size={RatingComponent.Size.XS} />
                            </div>
                            <div className="episode-release-label">
                                <span> {releaseDate} </span>
                            </div>
                        </div>
                    );
                }} />
        </div>
    );
};

export {EpisodeList};
