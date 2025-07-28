import React from "react";

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Match Analysis Result
      </h2>
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        <div className="rounded-lg bg-green-50 px-4 py-2 font-semibold text-green-700">
          Score: <span className="text-2xl">{result.score}</span> / 100
        </div>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-700">
          Highlighted Matches
        </h3>
        <ul className="list-disc pl-6">
          {result.highlighted_matches.map((item, idx) => (
            <li key={idx} className="font-medium text-green-700">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-700">
          Missing Areas
        </h3>
        <ul className="list-disc pl-6">
          {result.missing_areas.map((item, idx) => (
            <li key={idx} className="font-medium text-red-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-700">
          Suggestions to Improve Your CV
        </h3>
        <ul className="list-disc pl-6">
          {result.improvement_suggestions.map((item, idx) => (
            <li key={idx} className="mb-4 text-blue-700">
              <div className="mb-2">{item.suggestion}</div>
              {item.example && (
                <div className="mt-2 rounded-lg bg-gray-50 p-3 text-gray-700">
                  {item.example}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;
