import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, GraduationCap } from 'lucide-react';

interface CourseOutline {
    semester: number;
    courses: string[];
}

interface MajorAccordionProps {
    name: string;
    outline: CourseOutline[];
    index?: number;
}

export default function MajorAccordion({ name, outline, index = 0 }: MajorAccordionProps) {
    const [open, setOpen] = useState(false);
    const delay = `stagger-${Math.min(index + 1, 10)}`;
    const gradients = [
        'from-primary-500 to-accent-cyan',
        'from-accent-violet to-accent-rose',
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <Collapsible.Root
            open={open}
            onOpenChange={setOpen}
            className={`animate-fade-in-up opacity-0 ${delay} overflow-hidden rounded-2xl border border-border bg-surface shadow-md`}
        >
            <Collapsible.Trigger asChild>
                <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-right transition-colors hover:bg-surface-alt"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`rounded-lg bg-gradient-to-br ${gradient} p-2`}
                        >
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-display font-semibold text-text">
                            {name}
                        </span>
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </button>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <div className="border-t border-border px-6 py-4">
                    <div className="space-y-6">
                        {outline.map((sem) => (
                            <div key={sem.semester}>
                                <h4 className="mb-2 font-medium text-primary-600">
                                    الفصل {sem.semester}
                                </h4>
                                <ul className="flex flex-wrap gap-2">
                                    {sem.courses.map((course) => (
                                        <li
                                            key={course}
                                            className="rounded-lg bg-surface-alt px-3 py-2 text-sm text-text"
                                        >
                                            {course}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}
