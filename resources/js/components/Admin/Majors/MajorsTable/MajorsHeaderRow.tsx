import React from 'react';

const MajorsHeaderRow = () => {
    return (
        <tr className="border-b border-border bg-surface-alt">
            <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                #
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                الاسم
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                الرابط
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                الوصف
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold tracking-wider text-text-subtle uppercase">
                الإجراءات
            </th>
        </tr>
    );
};

export default MajorsHeaderRow;
