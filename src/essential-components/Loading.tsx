import { InfinitySpin } from "react-loader-spinner";

type Props = {
    isLoading: boolean;
};

const Loading = ({ isLoading }: Props) => {
    return (
        <div>
            {isLoading && (
                <div className="flex items-center justify-center mt-2">
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#0d1b2a"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            )}
        </div>
    );
};

export default Loading;
