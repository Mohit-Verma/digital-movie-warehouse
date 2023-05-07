type TProps = {
    label: string;
}

const Chip: React.FC<TProps> = (props: TProps): JSX.Element => {
    return (
        <div className="chip-component">
            {props.label}
        </div>
    );
};

export {Chip};