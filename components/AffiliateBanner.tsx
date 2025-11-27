'use client';

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface AffiliateBannerProps {
    title: string;
    description: string;
    link: string;
}

export default function AffiliateBanner({ title, description, link }: AffiliateBannerProps) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
