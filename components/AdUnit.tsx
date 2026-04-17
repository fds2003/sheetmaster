'use client';

import React, { useEffect, useState } from 'react';

export default function AdUnit() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // Initial check for viewport width on client side
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Don't render skeleton until we know the dimensions
    if (isMobile === null) {
        return <div className="w-full flex justify-center my-4 h-[90px]"></div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center my-6">
            <span className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest font-semibold flex items-center gap-1">Advertisement</span>
            <div className={`overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100 rounded ${isMobile ? 'h-[50px] w-[320px]' : 'h-[90px] w-[728px]'}`}>
                <iframe 
                    title="Advertisement"
                    src={isMobile ? "/promo-m.html" : "/promo-d.html"}
                    width={isMobile ? 320 : 728}
                    height={isMobile ? 50 : 90}
                    frameBorder="0"
                    scrolling="no"
                    style={{ border: 'none', overflow: 'hidden' }}
                />
            </div>
        </div>
    );
}
