import {
    store,
    update,
} from '@/actions/App/Http/Controllers/AdminCourseController';
import { AdminCourseWithRelations } from '@/types/admin/course';
import { useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import type {
    CourseFormData,
    CourseFormMode,
    FormMajorAssignment,
    NewMajorForm,
    FormPYQ,
    FormResource,
} from '@/components/Admin/Courses/CourseForm/CourseForm.types';

interface UseCourseFormParams {
    mode: CourseFormMode;
    course?: AdminCourseWithRelations;
    allMajors: { id: number; name: string; slug: string }[];
}

const defaultNewMajorForm = {
    id: '',
    year: 1,
    semester: 1,
    course_major_type: 'required_major',
};

export function useCourseForm({
    mode,
    course,
    allMajors,
}: UseCourseFormParams) {
    const isEdit = mode === 'edit';

    const [showNewMajorForm, setShowNewMajorForm] = useState(false);
    const [newMajorForm, setNewMajorForm] = useState(defaultNewMajorForm);

    const [showNewFileForm, setShowNewFileForm] = useState(false);
    const [newFileForm, setNewFileForm] = useState<FormResource>({
        title: '',
        url: '',
    });

    const [showNewVideoForm, setShowNewVideoForm] = useState(false);
    const [newVideoForm, setNewVideoForm] = useState<FormResource>({
        title: '',
        url: '',
    });

    const [showNewPYQForm, setShowNewPYQForm] = useState(false);
    const [newPYQForm, setNewPYQForm] = useState<FormPYQ>({
        name: 'final',
        url: '',
    });

    const form = useForm<CourseFormData>({
        name: isEdit ? course!.name : '',
        course_code: isEdit ? course!.course_code : '',
        description: isEdit ? (course!.description ?? '') : '',
        credit_hours: isEdit ? course!.credit_hours : 3,
        course_type: isEdit ? course!.course_type : 'major_course',
        is_lab: isEdit ? course!.is_lab : false,
        section_id: isEdit ? course!.section_id : null,
        prerequisites: isEdit ? course!.prerequisites.map((p) => p.id) : [],
        majors: isEdit
            ? course!.majors.map((m) => ({
                  id: m.id,
                  year: m.pivot.year,
                  semester: m.pivot.semester,
                  course_major_type: m.pivot.course_major_type,
              }))
            : [],
        files: [],
        videos: [],
        past_year_questions: [],
        new_files: [],
        delete_file_ids: [],
        new_videos: [],
        delete_video_ids: [],
        new_past_year_questions: [],
        delete_pyq_ids: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            form.transform((data) => ({
                name: data.name,
                course_code: data.course_code,
                description: data.description,
                credit_hours: data.credit_hours,
                course_type: data.course_type,
                is_lab: data.is_lab,
                section_id: data.section_id,
                prerequisites: data.prerequisites,
                majors: data.majors,
                new_files: data.new_files,
                delete_file_ids: data.delete_file_ids,
                new_videos: data.new_videos,
                delete_video_ids: data.delete_video_ids,
                new_past_year_questions: data.new_past_year_questions,
                delete_pyq_ids: data.delete_pyq_ids,
            }));
            form.put(update.url(course!.course_code));

            return;
        }

        form.transform((data) => ({
            name: data.name,
            course_code: data.course_code,
            description: data.description,
            credit_hours: data.credit_hours,
            course_type: data.course_type,
            is_lab: data.is_lab,
            section_id: data.section_id,
            prerequisites: data.prerequisites,
            majors: data.majors,
            files: data.files,
            videos: data.videos,
            past_year_questions: data.past_year_questions,
        }));
        form.post(store.url());
    };

    const assignedMajorIds = useMemo(
        () => new Set(form.data.majors.map((m) => m.id)),
        [form.data.majors],
    );
    const availableMajorsToAdd = allMajors.filter(
        (m) => !assignedMajorIds.has(m.id),
    );

    const addMajorAssignment = (formData?: NewMajorForm) => {
        const data = formData ?? newMajorForm;
        if (!data.id) {
            return;
        }

        form.setData('majors', [
            ...form.data.majors,
            {
                id: Number(data.id),
                year: data.year,
                semester: data.semester,
                course_major_type: data.course_major_type,
            },
        ]);
        setNewMajorForm(defaultNewMajorForm);
        setShowNewMajorForm(false);
    };

    const removeMajorAssignment = (id: number) => {
        form.setData(
            'majors',
            form.data.majors.filter((m) => m.id !== id),
        );
    };

    const updateMajorField = (
        id: number,
        field: 'year' | 'semester' | 'course_major_type',
        value: number | string,
    ) => {
        form.setData(
            'majors',
            form.data.majors.map((m: FormMajorAssignment) =>
                m.id === id ? { ...m, [field]: value } : m,
            ),
        );
    };

    const getMajorName = (id: number) =>
        allMajors.find((m) => m.id === id)?.name ?? '—';

    const assignPrereq = (id: number) => {
        form.setData('prerequisites', [...form.data.prerequisites, id]);
    };

    const unassignPrereq = (id: number) => {
        form.setData(
            'prerequisites',
            form.data.prerequisites.filter((pid) => pid !== id),
        );
    };

    const getPendingFiles = () =>
        isEdit ? form.data.new_files : form.data.files;
    const setPendingFiles = (next: FormResource[]) => {
        if (isEdit) {
            form.setData('new_files', next);
        } else {
            form.setData('files', next);
        }
    };

    const addFile = () => {
        if (!newFileForm.title || !newFileForm.url) {
            return;
        }

        setPendingFiles([...getPendingFiles(), { ...newFileForm }]);
        setNewFileForm({ title: '', url: '' });
        setShowNewFileForm(false);
    };

    const removePendingFile = (index: number) => {
        setPendingFiles(getPendingFiles().filter((_, i) => i !== index));
    };

    const isFileDeleted = (id: number) =>
        form.data.delete_file_ids.includes(id);
    const toggleFileDeletion = (id: string | number) => {
        if (!isEdit) {
            return;
        }

        const numId = Number(id);
        if (isFileDeleted(numId)) {
            form.setData(
                'delete_file_ids',
                form.data.delete_file_ids.filter((fid) => fid !== numId),
            );
        } else {
            form.setData('delete_file_ids', [
                ...form.data.delete_file_ids,
                numId,
            ]);
        }
    };

    const getPendingVideos = () =>
        isEdit ? form.data.new_videos : form.data.videos;
    const setPendingVideos = (next: FormResource[]) => {
        if (isEdit) {
            form.setData('new_videos', next);
        } else {
            form.setData('videos', next);
        }
    };

    const addVideo = () => {
        if (!newVideoForm.title || !newVideoForm.url) {
            return;
        }

        setPendingVideos([...getPendingVideos(), { ...newVideoForm }]);
        setNewVideoForm({ title: '', url: '' });
        setShowNewVideoForm(false);
    };

    const removePendingVideo = (index: number) => {
        setPendingVideos(getPendingVideos().filter((_, i) => i !== index));
    };

    const isVideoDeleted = (id: number) =>
        form.data.delete_video_ids.includes(id);
    const toggleVideoDeletion = (id: string | number) => {
        if (!isEdit) {
            return;
        }

        const numId = Number(id);
        if (isVideoDeleted(numId)) {
            form.setData(
                'delete_video_ids',
                form.data.delete_video_ids.filter((vid) => vid !== numId),
            );
        } else {
            form.setData('delete_video_ids', [
                ...form.data.delete_video_ids,
                numId,
            ]);
        }
    };

    const getPendingPYQs = () =>
        isEdit
            ? form.data.new_past_year_questions
            : form.data.past_year_questions;
    const setPendingPYQs = (next: FormPYQ[]) => {
        if (isEdit) {
            form.setData('new_past_year_questions', next);
        } else {
            form.setData('past_year_questions', next);
        }
    };

    const addPYQ = () => {
        if (!newPYQForm.url) {
            return;
        }

        setPendingPYQs([...getPendingPYQs(), { ...newPYQForm }]);
        setNewPYQForm({ name: 'final', url: '' });
        setShowNewPYQForm(false);
    };

    const removePendingPYQ = (index: number) => {
        setPendingPYQs(getPendingPYQs().filter((_, i) => i !== index));
    };

    const isPYQDeleted = (id: number) => form.data.delete_pyq_ids.includes(id);
    const togglePYQDeletion = (id: string | number) => {
        if (!isEdit) {
            return;
        }

        const numId = Number(id);
        if (isPYQDeleted(numId)) {
            form.setData(
                'delete_pyq_ids',
                form.data.delete_pyq_ids.filter((pid) => pid !== numId),
            );
        } else {
            form.setData('delete_pyq_ids', [
                ...form.data.delete_pyq_ids,
                numId,
            ]);
        }
    };

    const existingFiles = isEdit ? course!.files : [];
    const existingVideos = isEdit ? course!.videos : [];
    const existingPYQs = isEdit ? course!.past_year_questions : [];
    const pendingFiles = getPendingFiles();
    const pendingVideos = getPendingVideos();
    const pendingPYQs = getPendingPYQs();

    const fileCount = isEdit
        ? existingFiles.length -
          form.data.delete_file_ids.length +
          pendingFiles.length
        : pendingFiles.length;
    const videoCount = isEdit
        ? existingVideos.length -
          form.data.delete_video_ids.length +
          pendingVideos.length
        : pendingVideos.length;
    const pyqCount = isEdit
        ? existingPYQs.length -
          form.data.delete_pyq_ids.length +
          pendingPYQs.length
        : pendingPYQs.length;

    const deletedFileIds = useMemo(
        () => new Set(form.data.delete_file_ids),
        [form.data.delete_file_ids],
    );
    const deletedVideoIds = useMemo(
        () => new Set(form.data.delete_video_ids),
        [form.data.delete_video_ids],
    );
    const deletedPYQIds = useMemo(
        () => new Set(form.data.delete_pyq_ids),
        [form.data.delete_pyq_ids],
    );

    return {
        form,
        isEdit,
        showNewMajorForm,
        setShowNewMajorForm,
        newMajorForm,
        setNewMajorForm,
        showNewFileForm,
        setShowNewFileForm,
        newFileForm,
        setNewFileForm,
        showNewVideoForm,
        setShowNewVideoForm,
        newVideoForm,
        setNewVideoForm,
        showNewPYQForm,
        setShowNewPYQForm,
        newPYQForm,
        setNewPYQForm,
        availableMajorsToAdd,
        addMajorAssignment,
        removeMajorAssignment,
        updateMajorField,
        getMajorName,
        assignPrereq,
        unassignPrereq,
        addFile,
        removePendingFile,
        isFileDeleted,
        toggleFileDeletion,
        addVideo,
        removePendingVideo,
        isVideoDeleted,
        toggleVideoDeletion,
        addPYQ,
        removePendingPYQ,
        isPYQDeleted,
        togglePYQDeletion,
        existingFiles,
        existingVideos,
        existingPYQs,
        pendingFiles,
        pendingVideos,
        pendingPYQs,
        fileCount,
        videoCount,
        pyqCount,
        deletedFileIds,
        deletedVideoIds,
        deletedPYQIds,
        handleSubmit,
    };
}
