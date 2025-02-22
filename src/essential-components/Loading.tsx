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
                        width="200"
                        color="#0d1b2a"
                    />
                </div>
            )}
        </div>
    );
};

export default Loading;
