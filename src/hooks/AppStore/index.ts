import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {sliceDefitions} from '@/common';
import {TDispatch} from '@/store';

const useAppSelector: TypedUseSelectorHook<sliceDefitions.TStore> = useSelector;
const useAppDispatch = () => useDispatch<TDispatch>();

export {
    useAppDispatch,
    useAppSelector
};
