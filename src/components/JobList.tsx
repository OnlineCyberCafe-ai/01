import React from 'react';
import type { Job } from '../types';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Current Government Openings</h2>
      <div className="h-80 overflow-y-auto pr-2">
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex items-start bg-slate-50 p-4 rounded-md border-l-4 border-teal-500 transition-all duration-200 hover:shadow-md hover:bg-teal-50"
            >
              <div className="flex-grow text-slate-800 font-medium">
                {job.title}
              </div>
              {job.isNew && (
                <span className="ml-4 flex-shrink-0 inline-block bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  New
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobList;