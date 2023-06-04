const Loading = () => {
  return (
    <div className="bottom-0 left-0 right-0 top-0 h-12 w-12">
      <div className="relative mx-0 my-auto w-12 before:block">
        <svg
          className="absolute bottom-0 left-0 right-0 top-0 m-auto h-12 w-12 origin-center animate-loadingCircle stroke-orange-600"
          viewBox="25 25 50 50"
        >
          <circle
            className="animate-loadingPath"
            cx="50"
            cy="50"
            r="15"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeDasharray="1, 200"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
