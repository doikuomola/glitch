import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function loading() {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-20 rounded-lg w-full bg-[#585858] overflow-hidden" />
        <Skeleton className="h-20 rounded-lg w-full bg-[#585858] overflow-hidden" />
        <Skeleton className="h-20 rounded-lg w-full bg-[#585858] overflow-hidden" />
        <Skeleton className="h-20 rounded-lg w-full bg-[#585858] overflow-hidden" />
        <Skeleton className="h-20 rounded-lg w-full bg-[#585858] overflow-hidden" />
      </div>
    </div>
  );
}
