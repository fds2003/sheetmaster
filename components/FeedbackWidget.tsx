'use client';

import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-50 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                aria-label="Feedback"
            >
                <MessageSquare className="w-6 h-6" />
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Send Feedback</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <form
                        action="https://formsubmit.co/support@getsheetmaster.com"
                        method="POST"
                        className="space-y-3"
                    >
                        <input type="hidden" name="_subject" value="SheetMaster Feedback" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                                Email (optional)
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={3}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                                placeholder="How can we improve?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                            Send Feedback
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
