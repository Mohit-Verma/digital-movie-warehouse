import {Image} from '../Image';
import {RESOURCE_PATH, EMODE, LABELS} from './empty.error.config';

type TProps = {
    mode?: EMODE;
    message?: string;
    onRetry?: () => void;
};

type TEmptyErrorView<P> = React.FC<P> & {Mode: typeof EMODE}; 

const EmptyErrorView: TEmptyErrorView<TProps> = (props: TProps): JSX.Element => {
    const {mode = EMODE.EMPTY} = props;
    const imgSrc = mode === EMODE.EMPTY ? RESOURCE_PATH.EMPTY_IMAGE : RESOURCE_PATH.ERROR_IMAGE;

    return (
        <div className="empty-error-view">
            <Image src={imgSrc} />
            {(props.message) && (
                <span> {props.message} </span>
            )}
            {(props.onRetry) && (
                <button onClick={() => props.onRetry?.()}> {LABELS.RETRY} </button>
            )}
        </div>
    );
};

EmptyErrorView.Mode = EMODE;

export {EmptyErrorView};
