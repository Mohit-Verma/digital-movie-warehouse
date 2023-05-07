import {useMemo} from 'react';
import classNames from 'classnames';
import {TStarSize, STAR_SIZE, RESOURCE_PATH} from './rating.config';

type TProps = {
    maxValue: number;
    size?: TStarSize;
    rating?: number;
    readonly?: boolean;
    onChange?: (rating: number) => void;
};

type TStarProps = {
    size: TStarSize;
    selected: boolean;
    static: boolean;
    onClick: (enabled: boolean) => void;
}

type TRatingComponent<P> = React.FC<P> & {
    Size: typeof STAR_SIZE;
};

const RatingComponent: TRatingComponent<TProps> = (props: TProps): JSX.Element => {
    const {size: starSize = STAR_SIZE.SM, rating = 0, maxValue, readonly = false} = props;
    const starList = useMemo(() => [...Array(maxValue)], [maxValue]);

    const onChange = (selected: boolean, index: number): void => {
        const newRating = selected ? index + 1 : index;
        props.onChange?.(newRating);
    };

    return (
        <div className="rating-component">
            {starList.map((_, index) => (
                <StarComponent
                    key={`star_${index}`}
                    size={starSize}
                    selected={index < rating}
                    static={readonly}
                    onClick={(selected) => onChange(selected, index)} />
            ))}
        </div>
    );
};

const StarComponent: React.FC<TStarProps> = (props: TStarProps): JSX.Element => {
    const srcPath = props.selected ? RESOURCE_PATH.SELECTED_STAR : RESOURCE_PATH.NOT_SELECTED_STAR;
    const className = classNames('rating-component-star', {
        'icon-xs': props.size === STAR_SIZE.XS,
        'icon-sm': props.size === STAR_SIZE.SM,
        'icon-md': props.size === STAR_SIZE.MD,
        'icon-lg': props.size === STAR_SIZE.LG,
        'icon-xl': props.size === STAR_SIZE.XL,
        disabled: props.static
    });

    const onClick = (): void => {
        if (!props.static) {
            props.onClick(!props.selected);
        }
    };

    return (
        <img className={className} src={srcPath} onClick={onClick} />
    );
};

RatingComponent.Size = STAR_SIZE;

export {RatingComponent};
