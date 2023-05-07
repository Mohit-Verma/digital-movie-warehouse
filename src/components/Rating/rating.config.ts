import {ESize} from '../common.types';
import {pick, ValueOf} from '@/utils';

const STAR_SIZE = {...pick(ESize, ['XS', 'SM', 'MD', 'LG', 'XL'])};

const RESOURCE_PATH = {
    SELECTED_STAR: '/resources/star_selected.png',
    NOT_SELECTED_STAR: '/resources/star_not_selected.png'
};

type TStarSize = ValueOf<typeof STAR_SIZE>;

export type {
    TStarSize
};

export {
    STAR_SIZE,
    RESOURCE_PATH
};
