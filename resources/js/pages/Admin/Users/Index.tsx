import AdminUserController from '@/actions/App/Http/Controllers/AdminUserController';
import IndexPageHeader from '@/components/ui/Admin/CreateAndEditForm/IndexPageHeader';
import DeleteItemAssertionModal from '@/components/ui/Admin/DeleteItemAssertionModal';
import { Link, router } from '@inertiajs/react';
import { Pencil, Search, Trash2, Users } from 'lucide-react';
import React, { useState } from 'react';

interface AdminUser {
    id: number;
    username: string;
    unhashed_password: string | null;
    role: 'admin' | 'contributor';
    created_at: string;
}

interface Props {
    users?: AdminUser[];
}

const Index = ({ users = [] }: Props) => {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

    const filtered = users.filter((user) => {
        const q = search.toLowerCase();
        return (
            user.username.toLowerCase().includes(q) ||
            user.role.toLowerCase().includes(q)
        );
    });

    const handleDelete = (): void => {
        if (deleteTarget === null) {
            return;
        }
        router.delete(AdminUserController.destroy.url(deleteTarget));
        setDeleteTarget(null);
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-8" dir="rtl">
            {deleteTarget !== null && (
                <DeleteItemAssertionModal
                    isOpen
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                    title="هل أنت متأكد من حذف هذا المستخدم؟"
                    description="هذا الإجراء غير قابل للتراجع. سيتم حذف المستخدم بشكل دائم."
                />
            )}

            <IndexPageHeader
                title="المستخدمون"
                subtitle="إدارة حسابات الدخول إلى لوحة التحكم"
                icon={Users}
                link={AdminUserController.create.url()}
                linkText="إضافة مستخدم"
            />

            <div className="animate-fade-in-up stagger-1 mb-6">
                <div className="relative max-w-sm">
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم المستخدم  ..."
                        className="w-full rounded-xl border border-border bg-surface py-2.5 pr-9 pl-3 text-sm text-text placeholder-text-subtle transition outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    />
                </div>
            </div>

            <div className="animate-fade-in-up stagger-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-soft)">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-background/60">
                            <tr className="text-right text-xs font-semibold text-text-subtle">
                                <th scope="col" className="px-5 py-3">
                                    اسم المستخدم
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    كلمة المرور
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    الدور
                                </th>
                                <th scope="col" className="px-5 py-3">
                                    تاريخ الإنشاء
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-center"
                                >
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {filtered.length > 0 ? (
                                filtered.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-background/50"
                                    >
                                        <td className="px-5 py-3.5 font-medium text-text">
                                            {user.username}
                                        </td>
                                        <td className="px-5 py-3.5 text-text">
                                            {user.role !== 'admin'
                                                ? (user.unhashed_password ??
                                                  '—')
                                                : '********'}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                                                    user.role === 'admin'
                                                        ? 'bg-primary-500/10 text-primary-600 ring-primary-500/20'
                                                        : 'bg-slate-500/10 text-slate-600 ring-slate-500/20'
                                                }`}
                                            >
                                                {user.role === 'admin'
                                                    ? 'مدير'
                                                    : 'محرر'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-text-subtle">
                                            {new Intl.DateTimeFormat('ar-EG', {
                                                dateStyle: 'medium',
                                            }).format(
                                                new Date(user.created_at),
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {user.role === 'contributor' && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={AdminUserController.edit.url(
                                                            user.id,
                                                        )}
                                                        className="rounded-lg border border-border p-1.5 text-text-subtle transition hover:border-primary-500 hover:text-primary-600"
                                                        title="تعديل"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDeleteTarget(
                                                                user.id,
                                                            )
                                                        }
                                                        className="rounded-lg border border-border p-1.5 text-text-subtle transition hover:border-red-400 hover:text-red-600"
                                                        title="حذف"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-12 text-center text-sm text-text-muted"
                                    >
                                        {search
                                            ? 'لا توجد نتائج مطابقة للبحث.'
                                            : 'لا يوجد مستخدمون حتى الآن.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-border px-5 py-3 text-xs text-text-subtle">
                    {filtered.length} من {users.length} مستخدم
                </div>
            </div>
        </div>
    );
};

export default Index;
