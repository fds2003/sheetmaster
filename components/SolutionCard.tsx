import Link from 'next/link';
import { Mail, Calendar, Banknote, Calculator, Search, Package, GraduationCap, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Mail,
    Calendar,
    Banknote,
    Calculator,
    Search,
    Package,
    GraduationCap,
};

interface SolutionCardProps {
    slug: string;
    title: string;
    description: string;
    icon: string;
}

export default function SolutionCard({ slug, title, description, icon }: SolutionCardProps) {
    const IconComponent = iconMap[icon] || Calculator;
    
    // 提取简短标题（去掉 | 后面的部分）
    const shortTitle = title.split('|')[0].trim();
    
    return (
        <Link
            href={`/solutions/${slug}`}
            className="group relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <IconComponent className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                        {shortTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
            <div className="absolute bottom-4 right-4 text-green-500 group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
