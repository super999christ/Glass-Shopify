const LoadingBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full animate-spin"
        style={{ borderTopColor: 'transparent' }}
      ></div>
    </div>
  );
};

export default LoadingBar;