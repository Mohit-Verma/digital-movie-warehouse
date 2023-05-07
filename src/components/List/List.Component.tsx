import classNames from 'classnames';
import {Divider} from '../Divider';

type TProps<T> = {
    items: Array<T>;
    selectable?: boolean;
    selectedIndex?: number;
    onSelect?: (item: T, index: number) => void;
    renderItem: (item: T) => JSX.Element;
};

const List: React.FC<TProps<unknown>> = <T, >(props: TProps<T>): JSX.Element | null => {
    if (props.items.length) {
        return (
            <div className="list-component">
                {props.items.map((item, index) => {
                    const listItemClass = classNames('list-item', {
                        selectable: !!props.selectable,
                        selected: props.selectedIndex === index
                    });

                    return (
                        <div className={listItemClass} key={`list-item-${index}`} onClick={() => props.onSelect?.(item, index)}>
                            {props.renderItem(item)}
                            <Divider />
                        </div>
                    );})}
            </div>
        );
    }

    return null;
};

export {List};
