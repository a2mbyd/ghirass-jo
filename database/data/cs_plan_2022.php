<?php

/**
 * CS Major (علوم الحاسوب) - خطّة 2022
 * Mirrors resources/js/data/CS Major.ts
 *
 * Legend — prerequisite types:
 * - سابق نجاح (succeeded_before): must succeed before taking the course
 * - سابق دراسة (studied_before): should study before (soft prerequisite)
 * - متزامن (corequisite): can be taken concurrently
 *
 * Course types in course_major pivot:
 * - required_university : mandatory for all university students
 * - required_college    : mandatory for all college (faculty) students
 * - required_major      : mandatory for this major
 * - elective_major      : elective within the major
 * - elective_university : open university elective
 */

return [
    'major' => [
        'name' => 'علوم الحاسوب',
        'slug' => 'cs',
        'description' => 'أساسيات البرمجة، الخوارزميات، وهياكل البيانات. .',
        'roadmap_image' => '/images/cs-major-roadmap-2022.png',
    ],

    'sections' => [
        ['name' => 'متطلبات الجامعة العامة'],
        ['name' => 'الرياضيات'],
        ['name' => 'علوم الحاسوب'],
        ['name' => 'هندسة الحاسوب'],
        ['name' => 'نظم المعلومات'],
        ['name' => 'هندسة البرمجيات'],
        ['name' => 'مشروع التخرج'],
        ['name' => 'اختياري قسم'],
        ['name' => 'متطلب جامعة اختياري'],
    ],

    'courses' => [
        // ─── متطلبات الجامعة العامة — type: required_university ───
        ['course_code' => 'GEN101', 'name' => 'اللغة العربية ومهارات الاتصال والتواصل', 'description' => 'Arabic Language and Communication Skills', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 1, 'semester' => 1, 'type' => 'required_university'],
        ['course_code' => 'GEN102', 'name' => 'اللغة الانجليزية ومهارات الاتصال', 'description' => 'English Language and Communication Skills', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 1, 'semester' => 1, 'type' => 'required_university'],
        ['course_code' => 'GEN103', 'name' => 'القيادة والمسؤولية المجتمعية', 'description' => 'Leadership and Social Responsibility', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 2, 'semester' => 1, 'type' => 'required_university'],
        ['course_code' => 'GEN104', 'name' => 'الريادة والإبداع', 'description' => 'Entrepreneurship and Innovation', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 2, 'semester' => 2, 'type' => 'required_university'],
        ['course_code' => 'GEN105', 'name' => 'مهارات الاتصال وأخلاقيات المهن', 'description' => 'Communication Skills and Professional Ethics', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 3, 'semester' => 1, 'type' => 'required_university'],
        ['course_code' => 'GEN106', 'name' => 'المهارات الحياتية', 'description' => 'Life Skills', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 3, 'semester' => 2, 'type' => 'required_university'],
        ['course_code' => 'GEN107', 'name' => 'علوم عسكرية', 'description' => 'Military Science', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 1, 'semester' => 2, 'type' => 'required_university'],
        ['course_code' => 'PHY101', 'name' => 'فيزياء عامة عملي', 'description' => 'General Physics Practical', 'credit_hours' => 1, 'is_lab' => true, 'section' => 0, 'year' => 1, 'semester' => 1, 'type' => 'required_university'],
        ['course_code' => 'PHY102', 'name' => 'فيزياء 2', 'description' => 'Physics 2', 'credit_hours' => 3, 'is_lab' => false, 'section' => 0, 'year' => 1, 'semester' => 2, 'type' => 'required_university', 'prerequisites' => [['course_code' => 'PHY101', 'type' => 'succeeded_before']]],

        // ─── الرياضيات — type: required_major (except MATH241B → required_college) ───
        ['course_code' => 'MATH101', 'name' => 'تفاضل وتكامل 1', 'description' => 'Calculus 1', 'credit_hours' => 3, 'is_lab' => false, 'section' => 1, 'year' => 1, 'semester' => 1, 'type' => 'required_major'],
        ['course_code' => 'MATH102', 'name' => 'تفاضل وتكامل 2', 'description' => 'Calculus 2', 'credit_hours' => 3, 'is_lab' => false, 'section' => 1, 'year' => 1, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'MATH101', 'type' => 'succeeded_before']]],
        ['course_code' => 'MATH241A', 'name' => 'احصاء واحتمالات', 'description' => 'Statistics and Probabilities', 'credit_hours' => 3, 'is_lab' => false, 'section' => 1, 'year' => 2, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'MATH102', 'type' => 'succeeded_before']]],
        ['course_code' => 'MATH241B', 'name' => 'مبادئ الجبر الخطي', 'description' => 'Principles of Linear Algebra', 'credit_hours' => 3, 'is_lab' => false, 'section' => 1, 'year' => 2, 'semester' => 1, 'type' => 'required_college', 'prerequisites' => [['course_code' => 'MATH102', 'type' => 'succeeded_before']]],
        ['course_code' => 'MATH241C', 'name' => 'رياضيات متقطعة', 'description' => 'Discrete Mathematics', 'credit_hours' => 3, 'is_lab' => false, 'section' => 1, 'year' => 3, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS202', 'type' => 'succeeded_before']]],

        // ─── نظم المعلومات — IS302 → required_college, rest → required_major ───
        ['course_code' => 'IS101', 'name' => 'مقدمة إلى تكنولوجيا المعلومات', 'description' => 'Introduction to Information Technology', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 1, 'semester' => 2, 'type' => 'required_major'],
        ['course_code' => 'IS201', 'name' => 'مقدمة في صفحات الويب', 'description' => 'Introduction to Web Pages', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 2, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS202', 'type' => 'succeeded_before']]],
        ['course_code' => 'IS301', 'name' => 'تكنولوجيا الشبكة العنكبوتية', 'description' => 'Web Technology', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 3, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'IS201', 'type' => 'succeeded_before']]],
        ['course_code' => 'IS302', 'name' => 'أساسيات قواعد البيانات', 'description' => 'Database Fundamentals', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 3, 'semester' => 2, 'type' => 'required_college', 'prerequisites' => [['course_code' => 'CS203', 'type' => 'succeeded_before']]],
        ['course_code' => 'IS401', 'name' => 'التدريب الميداني', 'description' => 'Field Training', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 4, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'IS301', 'type' => 'succeeded_before']]],
        ['course_code' => 'IS402', 'name' => 'تحليل وتصميم الأنظمة', 'description' => 'Systems Analysis and Design', 'credit_hours' => 3, 'is_lab' => false, 'section' => 4, 'year' => 4, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'IS302', 'type' => 'succeeded_before']]],

        // ─── علوم الحاسوب — CS201, CS202, CS203 → required_college; rest → required_major ───
        ['course_code' => 'CS101', 'name' => 'حاسوب استدراكي', 'description' => 'Introductory Computer Science', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 1, 'semester' => 2, 'type' => 'required_major', 'corequisites' => ['PHY102', 'IS101']],
        ['course_code' => 'CS201', 'name' => 'مقدمة إلى البرمجة', 'description' => 'Introduction to Programming', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 2, 'semester' => 1, 'type' => 'required_college', 'prerequisites' => [['course_code' => 'CS101', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS202', 'name' => 'مقدمة إلى البرمجة الكينونية', 'description' => 'Introduction to Object-Oriented Programming', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 2, 'semester' => 2, 'type' => 'required_college', 'prerequisites' => [['course_code' => 'CS201', 'type' => 'succeeded_before']], 'corequisites' => ['BIO301']],
        ['course_code' => 'CS203', 'name' => 'تراكيب البيانات', 'description' => 'Data Structures', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 2, 'semester' => 2, 'type' => 'required_college', 'prerequisites' => [['course_code' => 'CS202', 'type' => 'succeeded_before'], ['course_code' => 'MATH241B', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS302', 'name' => 'نظرية الحسابات', 'description' => 'Theory of Computation', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'MATH241C', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS303', 'name' => 'تحليل وتصميم الخوارزميات', 'description' => 'Analysis and Design of Algorithms', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS203', 'type' => 'succeeded_before'], ['course_code' => 'MATH241C', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS304', 'name' => 'مبادئ نظم التشغيل', 'description' => 'Operating Systems Principles', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE201', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS305', 'name' => 'نظرية التشفير', 'description' => 'Cryptography Theory', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'MATH241A', 'type' => 'succeeded_before']]],
        ['course_code' => 'CS306', 'name' => 'التفاعل الانسان مع الحاسوب', 'description' => 'Human-Computer Interaction', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 2, 'type' => 'required_major'],
        ['course_code' => 'CS401', 'name' => 'الذكاء الاصطناعي', 'description' => 'Artificial Intelligence', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 4, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS303', 'type' => 'succeeded_before']]],
        ['course_code' => 'BIO301', 'name' => 'علم الاحياء الحسابي', 'description' => 'Computational Biology', 'credit_hours' => 3, 'is_lab' => false, 'section' => 2, 'year' => 3, 'semester' => 2, 'type' => 'required_major', 'corequisites' => ['CS202']],

        // ─── هندسة الحاسوب — type: required_major ───
        ['course_code' => 'CE201', 'name' => 'تنظيم الحاسوب', 'description' => 'Computer Organization', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 2, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS202', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE202', 'name' => 'تصميم المنطق الرقمي', 'description' => 'Digital Logic Design', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 2, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE201', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE203', 'name' => 'مختبر تصميم المنطق الرقمي', 'description' => 'Digital Logic Design Lab', 'credit_hours' => 1, 'is_lab' => true, 'section' => 3, 'year' => 2, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE202', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE301', 'name' => 'معمارية الحاسوب', 'description' => 'Computer Architecture', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 3, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE201', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE302', 'name' => 'النظم الحاسوبية الموزعة', 'description' => 'Distributed Computer Systems', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 3, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE301', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE303', 'name' => 'شبكات الحاسوب', 'description' => 'Computer Networks', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 3, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS304', 'type' => 'succeeded_before']]],
        ['course_code' => 'CE304', 'name' => 'الشبكات اللاسلكية', 'description' => 'Wireless Networks', 'credit_hours' => 3, 'is_lab' => false, 'section' => 3, 'year' => 4, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE303', 'type' => 'succeeded_before']]],

        // ─── هندسة البرمجيات — type: required_major ───
        ['course_code' => 'SE201', 'name' => 'أساسيات البرمجيات', 'description' => 'Software Engineering Fundamentals', 'credit_hours' => 3, 'is_lab' => false, 'section' => 5, 'year' => 2, 'semester' => 1, 'type' => 'required_major'],
        ['course_code' => 'SE202', 'name' => 'مختبر نمذجة البرمجة الكينونية', 'description' => 'Object-Oriented Programming Modeling Lab', 'credit_hours' => 1, 'is_lab' => true, 'section' => 5, 'year' => 2, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'SE201', 'type' => 'studied_before'], ['course_code' => 'CS202', 'type' => 'succeeded_before']]],
        ['course_code' => 'SE302', 'name' => 'أساسيات الوسائط المتعددة', 'description' => 'Multimedia Fundamentals', 'credit_hours' => 3, 'is_lab' => false, 'section' => 5, 'year' => 3, 'semester' => 1, 'type' => 'required_major'],
        ['course_code' => 'SE401', 'name' => 'أساسيات هندسة البرمجيات', 'description' => 'Software Engineering Principles', 'credit_hours' => 3, 'is_lab' => false, 'section' => 5, 'year' => 4, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'SE201', 'type' => 'succeeded_before']]],

        // ─── مشروع التخرج — type: required_major ───
        ['course_code' => 'CS491', 'name' => 'مشروع تخرج 1', 'description' => 'Graduation Project 1', 'credit_hours' => 3, 'is_lab' => false, 'section' => 6, 'year' => 4, 'semester' => 1, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CE302', 'type' => 'studied_before'], ['course_code' => 'CE304', 'type' => 'studied_before'], ['course_code' => 'IS402', 'type' => 'studied_before'], ['course_code' => 'SE401', 'type' => 'studied_before'], ['course_code' => 'CS401', 'type' => 'studied_before'], ['course_code' => 'IS401', 'type' => 'studied_before'], ['course_code' => 'SE302', 'type' => 'studied_before'], ['course_code' => 'CS306', 'type' => 'studied_before'], ['course_code' => 'CS305', 'type' => 'studied_before'], ['course_code' => 'CS302', 'type' => 'studied_before'], ['course_code' => 'SE202', 'type' => 'studied_before']]],
        ['course_code' => 'CS492', 'name' => 'مشروع تخرج 2', 'description' => 'Graduation Project 2', 'credit_hours' => 3, 'is_lab' => false, 'section' => 6, 'year' => 4, 'semester' => 2, 'type' => 'required_major', 'prerequisites' => [['course_code' => 'CS491', 'type' => 'succeeded_before']]],

        // ─── اختياري قسم — type: elective_major (3 courses) ───
        ['course_code' => 'DEPELEC1', 'name' => 'اختياري قسم 1', 'description' => 'Department Elective 1', 'credit_hours' => 3, 'is_lab' => false, 'section' => 7, 'year' => 4, 'semester' => 2, 'type' => 'elective_major'],
        ['course_code' => 'DEPELEC2', 'name' => 'اختياري قسم 2', 'description' => 'Department Elective 2', 'credit_hours' => 3, 'is_lab' => false, 'section' => 7, 'year' => 4, 'semester' => 2, 'type' => 'elective_major'],
        ['course_code' => 'DEPELEC3', 'name' => 'اختياري قسم 3', 'description' => 'Department Elective 3', 'credit_hours' => 3, 'is_lab' => false, 'section' => 7, 'year' => 4, 'semester' => 2, 'type' => 'elective_major'],

        // ─── متطلب جامعة اختياري — type: elective_university (3 courses) ───
        ['course_code' => 'UNIELEC1', 'name' => 'متطلب جامعة اختياري 1', 'description' => 'University Elective 1', 'credit_hours' => 3, 'is_lab' => false, 'section' => 8, 'year' => 3, 'semester' => 2, 'type' => 'elective_university'],
        ['course_code' => 'UNIELEC2', 'name' => 'متطلب جامعة اختياري 2', 'description' => 'University Elective 2', 'credit_hours' => 3, 'is_lab' => false, 'section' => 8, 'year' => 3, 'semester' => 2, 'type' => 'elective_university'],
        ['course_code' => 'UNIELEC3', 'name' => 'متطلب جامعة اختياري 3', 'description' => 'University Elective 3', 'credit_hours' => 3, 'is_lab' => false, 'section' => 8, 'year' => 3, 'semester' => 2, 'type' => 'elective_university'],
    ],
];
