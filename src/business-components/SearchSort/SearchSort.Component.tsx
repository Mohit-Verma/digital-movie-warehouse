import {useMemo, useState} from 'react';
import {LABELS} from './searchsort.config';
import {appDefinitions} from '@/common';
import {Search, Tooltip} from '@/components';

type TProps = {
    searchText?: string;
    appliedSort?: appDefinitions.ESort;
    sortOptions?: string[];
    onSortUpdate?: (appliedSort:  appDefinitions.ESort) => void;
    onSearchTextUpdate?: (searchText: string) => void;
}

const SearchSort: React.FC<TProps> = (props: TProps): JSX.Element => {
    const [showSortOptions, setShowSortOptions] = useState(false);

    // retain sort selection handling
    const selectedSortIndex = useMemo(() => {
        const {appliedSort = '', sortOptions = []} = props;
        return sortOptions.indexOf(appliedSort);
    }, [props.appliedSort, props.sortOptions]);
    
    return (
        <div className="search-sort-bcomponent">
            <div className="sort-trigger-placeholder">
                <Tooltip
                    closeOnItemClick
                    show={showSortOptions}
                    header={LABELS.SORT_HEADER}
                    items={props.sortOptions ?? []}
                    selectedIndex={selectedSortIndex}
                    onItemClick={(selectedSort) => props.onSortUpdate?.(selectedSort as appDefinitions.ESort)}
                    onTriggerAction={(isVisible) => setShowSortOptions(!isVisible)}
                    onTooltipCloseAction={() => setShowSortOptions(false)}
                    renderItem={(item) => (
                        <span> {item as appDefinitions.ESort} </span>
                    )}>
                    <button>
                        <span> {LABELS.SORT} </span>
                    </button>
                </Tooltip>
            </div>
            <div className="search-placeholder">
                <Search
                    searchText={props.searchText}
                    minChar={3}
                    waitTime={500}
                    placeholder={LABELS.SEARCH_PLACEHOLDER}
                    onSearch={(searchText) => props.onSearchTextUpdate?.(searchText)} />
            </div>
        </div>
    );
};

export {SearchSort};
