import React from 'react';
import type { CourseFile , CourseVideo , PastYearQuestion } from "@/features/courses/types/course";
import { TAB_CONFIG } from '../course.config';
import TabContent from '../sections/TabContent';
import type { TabKey } from '../types';



interface ContentProps {
    activeTab: TabKey;
    files: CourseFile[];
    videos: CourseVideo[];
    pastYearQuestions: PastYearQuestion[];
}
const Content = ({
    activeTab,
    files,
    videos,
    pastYearQuestions,
}: ContentProps) => {
    const activeConfig = TAB_CONFIG.find((t) => t.key === activeTab)!;
    const counts = {
        files: files.length,
        videos: videos.length,
        questions: pastYearQuestions.length,
    };

    return (
        <section
            className="animate-fade-in-up stagger-5 rounded-3xl border border-border bg-surface p-6 shadow-(--shadow-soft)"
            style={{ animationFillMode: 'both', opacity: 0 }}
        >
            {/* Panel header */}
            <div className="mb-5 flex items-center gap-3" dir="rtl">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${activeConfig.activeClass}`}
                >
                    {activeConfig.icon}
                </div>
                <h3 className="text-base font-bold text-text">
                    {activeConfig.label}
                </h3>
                <span className="mr-auto rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-semibold text-text-muted">
                    {counts[activeTab]}
                </span>
            </div>

            <TabContent
                key={activeTab}
                activeTab={activeTab}
                files={files}
                videos={videos}
                pastYearQuestions={pastYearQuestions}
            />
        </section>
    );
};

export default Content;
