function ShimmerUI() {
  return (
    <div className="p-6">
      {/* Page Title Shimmer */}
      <div className="h-8 w-1/2 bg-gray-300 rounded-md animate-pulse mb-6"></div>

      {/* Shimmer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded shadow-md animate-pulse"
          >
            {/* Shimmer Title */}
            <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-4"></div>
            {/* Shimmer Subtitle */}
            <div className="h-4 w-1/2 bg-gray-300 rounded-md mb-6"></div>
            {/* Shimmer Button */}
            <div className="h-10 w-full bg-gray-300 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShimmerUI;
