import {evaluate} from 'mathjs';
import {LABELS} from './episodeDetails.config';
import {episodeSliceDefinitions as episodesDef} from '@/common';
import {Chip, RatingComponent, Image} from '@/components';

type TProps = {
    episodeData: episodesDef.TEpisodeEntity;
}

const EpisodeDetails: React.FC<TProps> = (props: TProps): JSX.Element | null => {
    const {id, title, director, averageRating, openingCrawl, posterUrl, distributedRating} = props.episodeData ?? {};

    if (!id) {
        return null;
    }

    const toPercentValue = (value: string): string => {
        if (value) {
            const percentValue = (evaluate(value)*100).toPrecision(2);
            return `${percentValue}%`;
        }

        return value;
    };

    return (
        <div className="episode-details-bcomponent">
            <div className="episode-title-placeholder">
                <span> {title} </span>
            </div>
            <div className="episode-poster-crawl-placeholder">
                {(!!posterUrl) && (
                    <div className="episode-poster">
                        <Image src={posterUrl} width="250px" />
                    </div>
                )}
                {(!!openingCrawl) && (
                    <div className="episode-opening-crawl">
                        <span> {openingCrawl} </span>
                    </div>
                )}
            </div>
            <div className="episode-director-placeholder">
                <span> {LABELS.DIRECTED_BY} {director} </span>
            </div>
            {(!!averageRating) && (
                <div className="episode-rating-placeholder">
                    <span> {LABELS.AVERAGE_RATING} </span>
                    <RatingComponent readonly maxValue={10} rating={averageRating} size={RatingComponent.Size.MD} />
                </div>
            )}
            {(!!distributedRating?.length) && (
                <div className="episode-distributed-rating-placeholder">
                    {distributedRating.map(({Source: source, Value: value}, index) => (
                        <Chip key={`distributed_rating_${id}_${source}_${index}`} label={`${source}: ${toPercentValue(value)}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export {EpisodeDetails};
