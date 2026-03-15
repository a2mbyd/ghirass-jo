import React, { useState } from 'react';
import MajorsRow from './MajorsRow';
import EmptyResults from './EmptyResults';
import { Major } from '@/types/major';
import MajorsHeaderRow from './MajorsHeaderRow';

interface MajorsTableProps {
    filteredMajors: Major[];
    search: string;
    setSearch: (search: string) => void;
    setShowDeleteAssertionModal: (slug: string) => void;
}
const MajorsTable = ({
    filteredMajors,
    search,
    setSearch,
    setShowDeleteAssertionModal,
}: MajorsTableProps) => {
    return (
        <div className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <MajorsHeaderRow />
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredMajors.length > 0 ? (
                            filteredMajors.map((major, index) => (
                                <MajorsRow
                                    key={major.id}
                                    major={major}
                                    index={index}
                                    setShowDeleteAssertionModal={
                                        setShowDeleteAssertionModal
                                    }
                                />
                            ))
                        ) : (
                            <EmptyResults
                                search={search}
                                setSearch={setSearch}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MajorsTable;
