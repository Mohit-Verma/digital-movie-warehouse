import {useMemo, useRef} from 'react';
import classNames from 'classnames';
import {Image} from '../Image';
import {Divider} from '../Divider';
import {RESOURCE_PATH} from './tooltip.config';

type TProps<T> = {
    show: boolean;
    items: Array<T>;
    selectedIndex?: number;
    header: string | React.ReactNode;
    closeOnItemClick?: boolean;
    children?: React.ReactNode;
    triggerElement?: React.ReactNode;
    onTooltipCloseAction?: () => void;
    renderItem: (item: T) => React.ReactNode;
    onTriggerAction?: (isShown: boolean) => void;
    onItemClick: (item: T, index: number) => void;
};

const Tooltip: React.FC<TProps<unknown>> = <T, >(props: TProps<T>): JSX.Element | null => {
    const triggerElementRef = useRef<HTMLDivElement>(null);
    const onItemClick = (item: T, index: number): void => {
        props.onItemClick(item, index);

        if (props.closeOnItemClick) {
            props.onTooltipCloseAction?.();
        }
    };

    const [topPos, leftPos] = useMemo(() => {
        const {top = 0, right = 0} = triggerElementRef.current?.getBoundingClientRect() ?? {};
        return [
            `${top + 50}px`,
            `${right - 100}px`
        ];
    }, [triggerElementRef.current]);

    return (
        <div className="tooltip-component">
            <div className="tooltip-trigger-element" ref={triggerElementRef} onClick={() => props.onTriggerAction?.(props.show)}>
                {props.triggerElement ?? props.children}
            </div>
            {(props.show && props.items.length) && (
                <div className="tooltip-content" style={{top: topPos, left: leftPos}}>
                    <div className="tooltip-header">
                        <div className="tooltip-title">
                            <span> {props.header} </span>
                        </div>
                        {(props.onTooltipCloseAction) && (
                            <div className="tooltip-close-action" onClick={() => props.onTooltipCloseAction?.()}>
                                <Image src={RESOURCE_PATH.CLOSE_ICON} width="15px" height="15px" />
                            </div>
                        )}
                    </div>
                    <div className="tooltip-items">
                        {props.items.map((item, index) => {
                            const tooltipItemClass = classNames('tooltip-item', {
                                'selected': index === props.selectedIndex
                            });
                            return (
                                <div className={tooltipItemClass} key={`tooltip_${index}`} onClick={() => onItemClick(item, index)}>
                                    {props.renderItem(item)}
                                    <Divider />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export {Tooltip};
