import classNames from 'classnames';
import {ValueOf} from '@/utils';

enum EDirection {
    HORIZONTAL = 'hr',
    VERTICAL = 'vr'
}

type TDirection = ValueOf<typeof EDirection>;

type TProps = {
    direction?: TDirection; 
};

type TDivider = React.FC<TProps> & {
    Direction: typeof EDirection;
}

const Divider: TDivider = (props: TProps): JSX.Element => {
    const {direction = EDirection.HORIZONTAL} = props;
    const className = classNames('divider-component', direction);

    return (
        <div className={className} />
    );
};

Divider.Direction = EDirection;

export {Divider};
