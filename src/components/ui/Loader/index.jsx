const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-600 text-4xl text-red-600">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white" />
      </div>
    </div>
  );
};

export default Loader;
