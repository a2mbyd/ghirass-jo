<?php

return [
    'default_role' => 'contributor',

    'superuser' => [
        'username' => env('SUPERUSER_USERNAME'),
        'password' => env('SUPERUSER_PASSWORD'),
    ],

    'messages' => [
        'created' => 'تم إنشاء المستخدم بنجاح',
        'updated' => 'تم تحديث المستخدم بنجاح',
        'deleted' => 'تم حذف المستخدم بنجاح',
    ],
];
