import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {AppStoreHooks} from './hooks';
import {Divider, EmptyErrorView, Loader} from './components';
import {EpisodeDetails, EpisodeList, SearchSort} from './business-components';
import {appDefinitions} from '@/common';
import {EpisodeApi} from '@/services';
import './app.styles.scss';

const App: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setSort] = useState<appDefinitions.ESort>();
    const [search, setSearch] = useState('');

    const dispatchAction = AppStoreHooks.useAppDispatch();
    const appSelector = AppStoreHooks.useAppSelector;
    const {error, episodeData, selectedEpisodeId} = appSelector((state) => state.EPISODES);
    const selectedEpisodeData = episodeData[selectedEpisodeId ??  -1];

    const episodeApi = EpisodeApi(dispatchAction, appSelector);
    const sortOptions = Object.values(appDefinitions.ESort);
    const episodeSelectorClass = classNames('episode-selector', {
        'with-details-window': !!selectedEpisodeId
    });

    const loadEpisodes = async(): Promise<void> => {
        setIsLoading(true);
        episodeApi.loadEpisodes().finally(() => setIsLoading(false));
    };

    const onEpisodeSelect = (episodeId: number): void => {
        episodeApi.setSelectedEpisode(episodeId);
    };

    useEffect(() => {
        loadEpisodes();
    }, []);

    return (
        <>
            {(isLoading) && (<Loader />)}
            <div className="app">
                <SearchSort
                    sortOptions={sortOptions}
                    appliedSort={sort}
                    searchText={search}
                    onSearchTextUpdate={setSearch}
                    onSortUpdate={setSort} />
                {(error.errorMessage) ? (
                    <EmptyErrorView
                        mode={EmptyErrorView.Mode.ERROR}
                        message={error.errorMessage}
                        onRetry={loadEpisodes} />
                ) : (
                    <div className={episodeSelectorClass}>
                        <EpisodeList
                            appliedSort={sort}
                            searchText={search}
                            selectedEpisodeId={selectedEpisodeId}
                            episodes={Object.values(episodeData)}
                            onEpisodeSelect={onEpisodeSelect} />
                        {(!!selectedEpisodeId) && (
                            <>
                                <Divider direction={Divider.Direction.VERTICAL} />
                                <EpisodeDetails episodeData={selectedEpisodeData} />
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
