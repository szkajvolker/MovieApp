import { FourSquare } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <FourSquare
        color="#32cd32"
        size="medium"
        text="Loading"
        textColor="red"
      />
    </div>
  );
};

export default Loader;
