import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-14" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}
