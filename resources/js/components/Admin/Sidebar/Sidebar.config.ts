import { dashboard } from '@/routes/admin';
import { index as coursesIndex } from '@/routes/admin/courses';
import { index as doctorsIndex } from '@/routes/admin/doctors';
import { index as majorsIndex } from '@/routes/admin/majors';
import { index as sectionsIndex } from '@/routes/admin/sections';
import { index as usersIndex } from '@/routes/admin/users';
import {
    BookMarked,
    GraduationCap,
    Layers,
    LayoutDashboard,
    Stethoscope,
    Users,
} from 'lucide-react';

import { NavItem } from './Sidebar.types';

export const NAV_ITEMS: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: dashboard.url() },
    { icon: GraduationCap, label: 'Majors', href: majorsIndex.url() },
    { icon: Layers, label: 'Sections', href: sectionsIndex.url() },
    { icon: BookMarked, label: 'Courses', href: coursesIndex.url() },
    { icon: Stethoscope, label: 'Doctors', href: doctorsIndex.url() },
];
