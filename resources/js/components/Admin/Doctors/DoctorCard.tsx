import { Link } from '@inertiajs/react';
import { Pencil, Trash2, User } from 'lucide-react';
import React from 'react';
import AdminDoctorController from '@/actions/App/Http/Controllers/AdminDoctorController';
import type { Doctor } from "@/features/doctors/types/doctors";
import { getImageUrl } from "@/shared/lib/utils";

interface Props {
    doctor: Doctor;
    onDeleteClick: (id: number) => void;
}

const DoctorCard = ({ doctor, onDeleteClick }: Props) => {
    return (
        <div className="group flex w-28 flex-col items-center gap-2">
            {/* Avatar */}
            <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border bg-surface-alt transition-all group-hover:border-primary-300 group-hover:shadow-md">
                    {doctor.image ? (
                        <img
                            src={getImageUrl(doctor.image) ?? ''}
                            alt={doctor.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.removeAttribute('hidden');
                            }}
                        />
                    ) : null}
                    <div
                        className="flex h-full w-full items-center justify-center"
                        hidden={!!doctor.image}
                    >
                        <User className="h-9 w-9 text-text-subtle" />
                    </div>
                </div>

                {/* Action buttons overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
                        <Link
                            href={AdminDoctorController.edit.url(doctor.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-muted transition hover:bg-accent-amber hover:text-white"
                            title="تعديل"
                        >
                            <Pencil className="h-3 w-3" />
                        </Link>
                        <button
                            onClick={() => onDeleteClick(doctor.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-muted transition hover:bg-accent-rose hover:text-white"
                            title="حذف"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Name & location */}
            <div className="w-full text-center">
                <p className="truncate text-xs font-semibold text-text">{doctor.name}</p>
                {doctor.department && (
                    <p className="truncate text-xs text-text-muted">
                        موقع الدكتور في {doctor.department}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DoctorCard;
