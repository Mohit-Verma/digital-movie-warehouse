type TProps = {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
};

const Image: React.FC<TProps> = (props: TProps): JSX.Element => {
    const {src, alt = '', width, height} = props;
    return (
        <img src={src} alt={alt} width={width} height={height} />
    );
};

export {Image};
