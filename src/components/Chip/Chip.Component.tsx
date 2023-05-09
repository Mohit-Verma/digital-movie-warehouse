type TProps = {
    label: string;
}

const Chip: React.FC<TProps> = (props: TProps): JSX.Element => {
    return (
        <span className="chip-component">
            {props.label}
        </span>
    );
};

export {Chip};