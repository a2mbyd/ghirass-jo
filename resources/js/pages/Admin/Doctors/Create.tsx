import AdminDoctorController from '@/actions/App/Http/Controllers/AdminDoctorController';
import FormSectionHeader from '@/components/ui/Admin/EditPage.FormSectionHeader';
import { Section } from '@/types/section';
import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, Loader2, Stethoscope, User } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface FormData {
    name: string;
    email: string;
    department: string;
    section_id: string;
    image: File | null;
}

const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text placeholder-text-subtle shadow-(--shadow-soft) transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';

const Create = ({ sections }: { sections: Section[] }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<FormData>({
        name: '',
        email: '',
        department: '',
        section_id: '',
        image: null,
    });

    const handleImageChange = (file: File) => {
        form.setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(AdminDoctorController.store.url(), { forceFormData: true });
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {/* Header */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-accent-violet">
                        <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-text">
                            إضافة دكتور
                        </h1>
                        <p className="text-sm text-text-muted">
                            إنشاء عضو هيئة تدريس جديد
                        </p>
                    </div>
                </div>
                <Link
                    href={AdminDoctorController.index.url()}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-muted shadow-(--shadow-soft) transition hover:border-primary-500 hover:text-primary-500"
                >
                    <ArrowRight className="h-4 w-4" />
                    العودة للقائمة
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                {/* Basic info */}
                <section className="animate-fade-in-up stagger-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="المعلومات الأساسية"
                        icon={<Stethoscope className="h-4 w-4 text-primary-500" />}
                    />
                    <div className="flex flex-col gap-5 p-6">
                        <div className="flex gap-5">
                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-medium text-text" htmlFor="name">
                                    الاسم <span className="mr-1 text-danger">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    className={inputClass}
                                    placeholder="مثال: Dr. Ahmad Hassan"
                                    required
                                />
                                {form.errors.name && <p className="text-xs text-danger">{form.errors.name}</p>}
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-medium text-text" htmlFor="email">
                                    البريد الإلكتروني <span className="mr-1 text-danger">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="example@university.edu"
                                    dir="ltr"
                                    required
                                />
                                {form.errors.email && <p className="text-xs text-danger">{form.errors.email}</p>}
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-medium text-text" htmlFor="department">
                                    الموقع (القسم)
                                </label>
                                <input
                                    id="department"
                                    type="text"
                                    value={form.data.department}
                                    onChange={(e) => form.setData('department', e.target.value)}
                                    className={inputClass}
                                    placeholder="مثال: C4"
                                />
                                {form.errors.department && <p className="text-xs text-danger">{form.errors.department}</p>}
                            </div>

                            <div className="flex-1 space-y-1.5">
                                <label className="block text-sm font-medium text-text" htmlFor="section_id">
                                    القسم
                                </label>
                                <select
                                    id="section_id"
                                    value={form.data.section_id}
                                    onChange={(e) => form.setData('section_id', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">— بدون قسم —</option>
                                    {sections.map((s) => (
                                        <option key={s.id} value={String(s.id)}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.section_id && <p className="text-xs text-danger">{form.errors.section_id}</p>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Avatar */}
                <section className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                    <FormSectionHeader
                        title="الصورة الشخصية"
                        icon={<User className="h-4 w-4 text-primary-500" />}
                    />
                    <div className="flex items-center gap-6 p-6">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-border bg-surface-alt">
                            {imagePreview ? (
                                <img src={imagePreview} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <User className="h-10 w-10 text-text-subtle" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-sm text-text-muted">
                                اختر صورة بصيغة JPG أو PNG بحجم أقصاه 2 ميغابايت
                            </p>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                            >
                                اختيار صورة
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        handleImageChange(file);
                                    }
                                }}
                            />
                            {form.errors.image && <p className="text-xs text-danger">{form.errors.image}</p>}
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="animate-fade-in-up stagger-3 flex justify-end gap-3">
                    <Link
                        href={AdminDoctorController.index.url()}
                        className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-muted transition hover:border-primary-500 hover:text-primary-500"
                    >
                        إلغاء
                    </Link>
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 disabled:opacity-60"
                    >
                        {form.processing && <Loader2 className="h-4 w-4 animate-spin" />}
                        إضافة الدكتور
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
