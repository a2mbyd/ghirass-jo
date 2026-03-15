import {
    BookOpen,
    ClipboardList,
    FileText,
    FlaskConical,
    GitBranch,
    Play,
    Plus,
    Video,
} from 'lucide-react';
import Actions from '@/components/ui/Admin/CreateAndEditForm/Actions';
import CourseSelector from '@/components/ui/Admin/CreateAndEditForm/CourseSelector';
import FormCard from '@/components/ui/Admin/CreateAndEditForm/FormCard/FormCard';
import NumberInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/NumberInput';
import SelectInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/SelectInput';
import TextAreaInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/TextAreaInput';
import TextInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/TextInput';
import ToggleInput from '@/components/ui/Admin/CreateAndEditForm/Inputs/ToggleInput';
import { useCourseForm } from '@/hooks/Admin/useCourseForm';
import type {
    AdminCourseBasic,
    AdminCourseWithRelations,
} from '@/types/admin/course';
import type { Section } from '@/types/section';
import { getPYQMeta } from './CourseForm.constants';
import {
    sectionOptions,
    courseMajorTypeOptions,
    courseTypeOptions,
    pyqTypeOptions,
} from './CourseForm.helpers';
import type { CourseFormMode } from './CourseForm.types';
import { MajorsFormCard } from './MajorsRelationForm/MajorsFormCard';
import ResourceCardForm from './ResourceCardForm';

interface CourseFormProps {
    mode: CourseFormMode;
    course?: AdminCourseWithRelations;
    sections: Section[];
    allCourses: AdminCourseBasic[];
    allMajors: { id: number; name: string; slug: string }[];
    cancelLink: string;
}

export default function CourseForm({
    mode,
    course,
    sections,
    allCourses,
    allMajors,
    cancelLink,
}: CourseFormProps) {
    const {
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
    } = useCourseForm({ mode, course, allMajors });

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <FormCard
                title="المعلومات الأساسية"
                icon={<BookOpen className="h-4 w-4 text-primary-500" />}
                allowOverflow
            >
                <div className="flex flex-col gap-5 p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
                        <TextInput
                            id="course_code"
                            label="رمز المادة"
                            value={form.data.course_code}
                            onChange={(v) => form.setData('course_code', v)}
                            placeholder="مثال: EE201"
                            error={form.errors.course_code}
                            required
                            dir="ltr"
                        />
                        <TextInput
                            id="name"
                            label="اسم المادة"
                            value={form.data.name}
                            onChange={(v) => form.setData('name', v)}
                            placeholder="مثال: تحليل الدوائر الكهربائية"
                            error={form.errors.name}
                            required
                            dir="rtl"
                            className={
                                isEdit ? 'md:col-span-4' : 'md:col-span-3'
                            }
                        />
                        <NumberInput
                            variant="stepper"
                            id="credit_hours"
                            label="الساعات المعتمدة"
                            value={form.data.credit_hours}
                            onChange={(v) =>
                                form.setData(
                                    'credit_hours',
                                    Math.min(6, Math.max(1, Number(v) || 1)),
                                )
                            }
                            min={1}
                            max={6}
                            error={form.errors.credit_hours}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <SelectInput
                            id="section_id"
                            label="القسم"
                            value={String(form.data.section_id ?? '')}
                            onChange={(v) =>
                                form.setData('section_id', v ? Number(v) : null)
                            }
                            options={sectionOptions(sections)}
                            error={form.errors.section_id}
                        />

                        <ToggleInput
                            id="is_lab"
                            label="مادة مختبر/نظرية"
                            value={form.data.is_lab}
                            onChange={(v) => form.setData('is_lab', v)}
                            onLabel="مادة مختبر"
                            offLabel="مادة نظرية"
                            onIcon={<FlaskConical className="h-4 w-4" />}
                            offIcon={<BookOpen className="h-4 w-4" />}
                            error={form.errors.is_lab}
                        />

                        <SelectInput
                            id="course_type"
                            label="نوع المادة"
                            value={form.data.course_type}
                            onChange={(v) => form.setData('course_type', v)}
                            options={courseTypeOptions}
                            error={form.errors.course_type}
                        />
                    </div>

                    <TextAreaInput
                        id="description"
                        label="الوصف"
                        value={form.data.description}
                        onChange={(v) => form.setData('description', v)}
                        placeholder="أدخل وصفاً مختصراً للمادة الدراسية..."
                        error={form.errors.description}
                        rows={3}
                    />
                </div>
            </FormCard>
            {/* Majors */}
            {!form.data.course_type.endsWith('university') && (
                <MajorsFormCard
                    courseType={form.data.course_type}
                    majors={form.data.majors}
                    allMajors={availableMajorsToAdd}
                    courseMajorTypeOptions={courseMajorTypeOptions}
                    getMajorName={getMajorName}
                    error={form.errors.majors}
                    onAdd={addMajorAssignment}
                    onUpdate={updateMajorField}
                    onRemove={removeMajorAssignment}
                />
            )}
            {/* Prerequisites */}
            {!form.data.course_type.endsWith('university') && (
                <FormCard
                    title="المتطلبات السابقة"
                    icon={<GitBranch className="h-4 w-4 text-accent-amber" />}
                >
                    <div className="p-6">
                        <p className="mb-4 text-xs text-text-muted">
                            مواد يجب إتمامها قبل هذه المادة
                        </p>
                        <CourseSelector
                            allCourses={allCourses}
                            assignedIds={form.data.prerequisites}
                            onAssign={assignPrereq}
                            onUnassign={unassignPrereq}
                            emptyAssignedLabel="اسحب مادة لإضافتها كمتطلب سابق"
                        />
                        {form.errors.prerequisites && (
                            <p className="mt-2 text-xs text-danger">
                                {form.errors.prerequisites}
                            </p>
                        )}
                    </div>
                </FormCard>
            )}

            <ResourceCardForm
                title="الملفات والروابط"
                icon={<FileText className="h-4 w-4 text-emerald-600" />}
                countLabel={`${fileCount} ملف`}
                color="emerald"
                existingItems={existingFiles.map((f) => ({
                    id: f.id,
                    label: f.title,
                    url: f.url,
                }))}
                deletedIds={deletedFileIds}
                onToggleDelete={toggleFileDeletion}
                pendingItems={pendingFiles.map((f) => ({
                    label: f.title,
                    url: f.url,
                }))}
                onRemovePending={removePendingFile}
                rowIcon={<FileText className="h-4 w-4 text-emerald-600" />}
                rowIconBg="bg-emerald-50"
                isFormVisible={showNewFileForm}
                onToggleForm={() => setShowNewFileForm((v) => !v)}
                addButtonLabel="إضافة ملف"
                formTitle="إضافة ملف جديد"
                formContent={
                    <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput
                            label="العنوان"
                            value={newFileForm.title}
                            onChange={(v) =>
                                setNewFileForm((f) => ({ ...f, title: v }))
                            }
                            placeholder="مثال: ملزمة المادة"
                            required
                        />
                        <div className="flex items-end gap-2">
                            <div className="relative flex-1">
                                <TextInput
                                    label="رابط الملف"
                                    value={newFileForm.url}
                                    onChange={(v) =>
                                        setNewFileForm((f) => ({
                                            ...f,
                                            url: v,
                                        }))
                                    }
                                    placeholder="https://..."
                                    dir="ltr"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addFile}
                                disabled={
                                    !newFileForm.title || !newFileForm.url
                                }
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                إضافة
                            </button>
                        </div>
                    </div>
                }
                emptyIcon={<FileText className="h-9 w-9 text-text-subtle" />}
                emptyText="لا توجد ملفات مرفوعة بعد"
            />

            <ResourceCardForm
                title="مقاطع الفيديو"
                icon={<Video className="h-4 w-4 text-rose-600" />}
                countLabel={`${videoCount} فيديو`}
                color="rose"
                existingItems={existingVideos.map((v) => ({
                    id: v.id,
                    label: v.title,
                    url: v.url,
                }))}
                deletedIds={deletedVideoIds}
                onToggleDelete={toggleVideoDeletion}
                pendingItems={pendingVideos.map((v) => ({
                    label: v.title,
                    url: v.url,
                }))}
                onRemovePending={removePendingVideo}
                rowIcon={<Play className="h-4 w-4 text-rose-600" />}
                rowIconBg="bg-rose-50"
                isFormVisible={showNewVideoForm}
                onToggleForm={() => setShowNewVideoForm((v) => !v)}
                addButtonLabel="إضافة فيديو"
                formTitle="إضافة فيديو جديد"
                formContent={
                    <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput
                            label="العنوان"
                            value={newVideoForm.title}
                            onChange={(v) =>
                                setNewVideoForm((f) => ({ ...f, title: v }))
                            }
                            placeholder="مثال: شرح المحاضرة الأولى"
                            required
                        />
                        <div className="flex items-end gap-2">
                            <div className="relative flex-1">
                                <TextInput
                                    label="رابط الفيديو"
                                    value={newVideoForm.url}
                                    onChange={(v) =>
                                        setNewVideoForm((f) => ({
                                            ...f,
                                            url: v,
                                        }))
                                    }
                                    placeholder="https://youtube.com/..."
                                    dir="ltr"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addVideo}
                                disabled={
                                    !newVideoForm.title || !newVideoForm.url
                                }
                                className="flex items-center gap-1.5 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                إضافة
                            </button>
                        </div>
                    </div>
                }
                emptyIcon={<Video className="h-9 w-9 text-text-subtle" />}
                emptyText="لا توجد مقاطع فيديو مضافة بعد"
            />

            <ResourceCardForm
                title="أسئلة السنوات السابقة"
                icon={<ClipboardList className="h-4 w-4 text-accent-amber" />}
                countLabel={`${pyqCount} ملف`}
                color="amber"
                existingItems={existingPYQs.map((p) => {
                    const meta = getPYQMeta(p.name);
                    return {
                        id: p.id,
                        label: p.name,
                        url: p.url,
                        badge: { text: meta.label, className: meta.color },
                    };
                })}
                deletedIds={deletedPYQIds}
                onToggleDelete={togglePYQDeletion}
                pendingItems={pendingPYQs.map((p) => {
                    const meta = getPYQMeta(p.name);
                    return {
                        label: p.name,
                        url: p.url,
                        badge: { text: meta.label, className: meta.color },
                    };
                })}
                onRemovePending={removePendingPYQ}
                // no rowIcon / rowIconBg — badge mode handles the visual
                isFormVisible={showNewPYQForm}
                onToggleForm={() => setShowNewPYQForm((v) => !v)}
                addButtonLabel="إضافة أسئلة"
                formTitle="إضافة أسئلة جديدة"
                formContent={
                    <>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <SelectInput
                                label="النوع"
                                value={newPYQForm.name}
                                onChange={(v) =>
                                    setNewPYQForm((f) => ({ ...f, name: v }))
                                }
                                options={pyqTypeOptions}
                                required
                            />
                            <div className="flex items-end gap-2 sm:col-span-2">
                                <div className="relative flex-1">
                                    <TextInput
                                        label="الرابط"
                                        value={newPYQForm.url}
                                        onChange={(v) =>
                                            setNewPYQForm((f) => ({
                                                ...f,
                                                url: v,
                                            }))
                                        }
                                        placeholder="https://..."
                                        dir="ltr"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={addPYQ}
                                    disabled={!newPYQForm.url}
                                    className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    إضافة
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-text-muted">
                                معاينة النوع:
                            </span>
                            <span
                                className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${getPYQMeta(newPYQForm.name).color}`}
                            >
                                {getPYQMeta(newPYQForm.name).label}
                            </span>
                        </div>
                    </>
                }
                emptyIcon={
                    <ClipboardList className="h-9 w-9 text-text-subtle" />
                }
                emptyText="لا توجد أسئلة سنوات سابقة مضافة بعد"
            />
            <Actions
                cancelLink={cancelLink}
                submitText={isEdit ? 'حفظ التغييرات' : 'إضافة المادة'}
                processing={form.processing}
            />
        </form>
    );
}
