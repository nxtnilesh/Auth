export default function Loader({ size = 'h-8 w-8' }) {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`animate-spin rounded-full ${size} border-4 border-indigo-500 border-t-transparent`}
        ></div>
      </div>
    );
  }