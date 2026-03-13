<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminCourseController;
use App\Http\Controllers\AdminMajorController;
use App\Http\Controllers\AdminDoctorController;
use App\Http\Controllers\AdminSectionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MajorController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/gpa', [HomeController::class, 'gpa'])->name('gpa');
Route::get('/doctors', [HomeController::class, 'doctors'])->name('doctors');

Route::prefix('courses')->controller(CourseController::class)->group(function () {
    Route::get('/', 'index')->name('courses');
    Route::get('/{course_code}', 'show')->name('course');
});

Route::prefix('majors')->controller(MajorController::class)->group(function () {
    Route::get('/{major_slug}', 'show')->name('major');
});

Route::prefix('admin')->controller(AdminController::class)->group(function () {
    Route::get('/', 'dashboard')->name('admin.dashboard');

    Route::prefix('majors')->controller(AdminMajorController::class)->group(function () {
        Route::get('/', 'index')->name('admin.majors');
        Route::get('/create', 'create')->name('admin.majors.create');
        Route::post('/', 'store')->name('admin.majors.store');
        Route::get('/{major_slug}/edit', 'edit')->name('admin.major.edit');
        Route::put('/{major_slug}/update', 'update')->name('admin.major.update');
        Route::delete('/{major_slug}', 'destroy')->name('admin.major.destroy');
    });

    Route::prefix('sections')->controller(AdminSectionController::class)->group(function () {
        Route::get('/', 'index')->name('admin.sections.index');
        Route::get('/create', 'create')->name('admin.sections.create');
        Route::post('/', 'store')->name('admin.sections.store');
        Route::delete('/{section_name}', 'destroy')->name('admin.section.destroy');
    });

    Route::prefix('courses')->controller(AdminCourseController::class)->group(function () {
        Route::get('/', 'index')->name('admin.courses.index');
        Route::get('/create', 'create')->name('admin.courses.create');
        Route::post('/', 'store')->name('admin.courses.store');
        Route::get('/{course_code}/edit', 'edit')->name('admin.course.edit');
        Route::put('/{course_code}/update', 'update')->name('admin.course.update');
        Route::delete('/{course_code}', 'destroy')->name('admin.course.destroy');
    });
    
    Route::prefix('doctors')->controller(AdminDoctorController::class)->group(function () {
        Route::get('/', 'index')->name('admin.doctors.index');
        Route::get('/create', 'create')->name('admin.doctors.create');
        Route::post('/', 'store')->name('admin.doctors.store');
        Route::get('/{doctor_id}/edit', 'edit')->name('admin.doctor.edit');
        Route::put('/{doctor_id}/update', 'update')->name('admin.doctor.update');
        Route::delete('/{doctor_id}', 'destroy')->name('admin.doctor.destroy');
    });
});
