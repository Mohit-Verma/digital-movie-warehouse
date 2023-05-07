import {useEffect} from 'react';
import {Image} from '../Image';
import {RESOURCE_PATH} from './search.config';

type TProps = {
    minChar?: number;
    waitTime?: number;
    searchText?: string;
    placeholder?: string;
    onSearch: (searchText: string) => void;
};

let timeoutRef: NodeJS.Timeout;

const Search: React.FC<TProps> = (props: TProps): JSX.Element => {
    const {minChar = 3, waitTime = 250, searchText = '', placeholder = ''} = props;

    useEffect(() => {
        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef);
            }
        };
    }, []);

    const onSearch = (value: string, instantSearch = false): void => {
        const searchValue = value.trim();

        // if search text char is less than minChar, return
        if (searchValue && searchValue.length < minChar) {
            return;
        }

        if (timeoutRef) {
            clearTimeout(timeoutRef);
        }

        // trigger search without delay
        if (instantSearch) {
            props.onSearch?.(searchValue);
            return;
        }

        timeoutRef = setTimeout(() => {
            props.onSearch?.(searchValue);
        }, waitTime);
    };

    // triggers search with enter key
    const onKeyDownAction = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const {key, target} = event;
        if (key === 'Enter') {
            onSearch((target as unknown as {value: string}).value ?? '', true);
        }
    };

    // triggers search with change of input value
    const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        onSearch(value);
    };

    return (
        <div className="search-component">
            <Image src={RESOURCE_PATH.SEARCH_ICON} alt="search_icon" width="20px" height="20px" />
            <input
                placeholder={placeholder}
                defaultValue={searchText}
                onKeyDown={onKeyDownAction}
                onChange={onChangeAction} />
        </div>
    );
};

export {Search};
