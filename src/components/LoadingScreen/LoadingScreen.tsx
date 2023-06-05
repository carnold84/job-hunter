import Loading from "../Loading";

const LoadingScreen = () => {
  return (
    <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white/75">
      <Loading />
    </div>
  );
};

export default LoadingScreen;
