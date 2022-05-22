import Link from "next/link";
import React from "react";

const inspiration = [{ title: "", body: "" }];

export default function Inspiration() {
  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-start">
          <span className="pr-3 bg-gray-100 text-2xl font-bold text-gray-900">Looking for inspiration?</span>
        </div>
      </div>
      <div className="flex flex-col divide-y-2 mt-2 divide-gray-300">
        <Link href="/jreynoldsdev">
          <div className="bg-white hover:shadow-md cursor-pointer transition rounded-md p-4">
            <h2 className="text-lg font-bold">Jake Reynolds</h2>
            <p>Founder, README</p>
          </div>
        </Link>
        <Link href="/sid">
          <div className="bg-white hover:shadow-md cursor-pointer transition rounded-md p-4">
            <h2 className="text-lg font-bold">Sid Sijbrandij</h2>
            <p>Co-founder, CEO, Gitlab</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
