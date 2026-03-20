'use client';

import React from 'react';

export default function AdUnit() {
    return (
        <div className="w-full h-[90px] bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Advertisement</p>
                <p className="text-gray-300 text-[10px]">
                    {/* Google AdSense <ins> tag will be inserted here */}
                    AdSense Placeholder
                </p>
            </div>
        </div>
    );
}
