import React from 'react';
import type { CourseFile, CourseVideo, PastYearQuestion } from "@/features/courses/types/course";
import EmptyState from '../components/EmptyState';
import FileRow from '../components/FileRow';
import VideoRow from '../components/VideoRow';
import type { TabKey } from '../types';

const TabContent = ({
    activeTab,
    files,
    videos,
    pastYearQuestions,
}: {
    activeTab: TabKey;
    files: CourseFile[];
    videos: CourseVideo[];
    pastYearQuestions: PastYearQuestion[];
}) => {
    if (activeTab === 'files') {
        return files.length === 0 ? (
            <EmptyState label="ملفات" />
        ) : (
            <div className="space-y-2">
                {files.map((file, i) => (
                    <FileRow key={file.id} item={file} index={i} />
                ))}
            </div>
        );
    }

    if (activeTab === 'videos') {
        return videos.length === 0 ? (
            <EmptyState label="فيديوهات" />
        ) : (
            <div className="space-y-2">
                {videos.map((video, i) => (
                    <VideoRow key={video.id} video={video} index={i} />
                ))}
            </div>
        );
    }

    return pastYearQuestions.length === 0 ? (
        <EmptyState label="أسئلة" />
    ) : (
        <div className="space-y-2">
            {pastYearQuestions.map((q, i) => (
                <FileRow key={q.id} item={q} index={i} />
            ))}
        </div>
    );
};

export default TabContent;
