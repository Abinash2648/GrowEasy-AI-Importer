"use client";

export default function Loading({ loading, loadingText, progress }) {
  if (!loading) return null;

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Processing CSV
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-5 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>

      <p className="text-center mt-4 text-lg font-semibold">
        {loadingText}
      </p>

      <p className="text-center text-blue-600 font-bold mt-2">
        {progress}%
      </p>

    </div>
  );
}