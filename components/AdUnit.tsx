'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AdUnit() {
    const bannerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    // Initial check for viewport width on client side
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        // Wait until mobile check is done and ref is available
        if (isMobile === null || !bannerRef.current) return;
        
        // Prevent duplicate script injections (strict mode / re-renders)
        if (bannerRef.current.innerHTML !== '') return;

        const key = isMobile ? 'cca79e2b5885a6999d8176ec5e8c0b3d' : 'e0c41bad79ee2b54bd54592939dbb629';
        const height = isMobile ? 50 : 90;
        const width = isMobile ? 320 : 728;

        // 1. Inject configuration object
        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `atOptions = {
            'key' : '${key}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
        };`;

        // 2. Inject remote invocation script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
        invokeScript.async = true;

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(invokeScript);

    }, [isMobile]);

    // Don't render skeleton until we know the dimensions
    if (isMobile === null) {
        return <div className="w-full flex justify-center my-4 h-[90px]"></div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center my-6">
            <span className="text-[10px] text-gray-400 mb-1 uppercase tracking-widest font-semibold flex items-center gap-1">Advertisement</span>
            <div 
                ref={bannerRef} 
                className={`overflow-hidden flex items-center justify-center rounded ${isMobile ? 'min-h-[50px] min-w-[320px]' : 'min-h-[90px] min-w-[728px]'}`}
            ></div>
        </div>
    );
}
