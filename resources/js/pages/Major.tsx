import PageHeader from '@/components/PageHeader';
import React from 'react';

const Major = ({ major }: { major: string }) => {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <PageHeader
                title="التخصص"
                subtitle="عرض المقررات للتخصص"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="card">
                    <h2 className="text-2xl font-bold">{major}</h2>
                </div>
            </div>
        </div>
    );
};

export default Major;
