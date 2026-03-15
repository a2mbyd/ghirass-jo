<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminCourseController;
use App\Http\Controllers\AdminDoctorController;
use App\Http\Controllers\AdminMajorController;
use App\Http\Controllers\AdminSectionController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MajorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/gpa', [HomeController::class, 'gpa'])->name('gpa');
Route::get('/doctors', [HomeController::class, 'doctors'])->name('doctors');

Route::prefix('courses')->controller(CourseController::class)->group(function () {
    Route::get('/', 'index')->name('courses.index');
    Route::get('/{course_code}', 'show')->name('courses.show');
});

Route::prefix('majors')->controller(MajorController::class)->group(function () {
    Route::get('/{major_slug}', 'show')->name('majors.show');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix(config('admin.prefix'))->middleware(['auth', 'admin'])->group(function () {

    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    Route::prefix('majors')->controller(AdminMajorController::class)->group(function () {
        Route::get('/', 'index')->name('admin.majors.index');
        Route::get('/create', 'create')->name('admin.majors.create');
        Route::post('/', 'store')->name('admin.majors.store');
        Route::get('/{major_slug}/edit', 'edit')->name('admin.majors.edit');
        Route::put('/{major_slug}', 'update')->name('admin.majors.update');
        Route::delete('/{major_slug}', 'destroy')->name('admin.majors.destroy');
    });

    Route::prefix('sections')->controller(AdminSectionController::class)->group(function () {
        Route::get('/', 'index')->name('admin.sections.index');
        Route::get('/create', 'create')->name('admin.sections.create');
        Route::post('/', 'store')->name('admin.sections.store');
        Route::delete('/{section_name}', 'destroy')->name('admin.sections.destroy');
    });

    Route::prefix('courses')->controller(AdminCourseController::class)->group(function () {
        Route::get('/', 'index')->name('admin.courses.index');
        Route::get('/create', 'create')->name('admin.courses.create');
        Route::post('/', 'store')->name('admin.courses.store');
        Route::get('/{course_code}/edit', 'edit')->name('admin.courses.edit');
        Route::put('/{course_code}', 'update')->name('admin.courses.update');
        Route::delete('/{course_code}', 'destroy')->name('admin.courses.destroy');
    });

    Route::prefix('doctors')->controller(AdminDoctorController::class)->group(function () {
        Route::get('/', 'index')->name('admin.doctors.index');
        Route::get('/create', 'create')->name('admin.doctors.create');
        Route::post('/', 'store')->name('admin.doctors.store');
        Route::get('/{doctor_id}/edit', 'edit')->name('admin.doctors.edit');
        Route::put('/{doctor_id}', 'update')->name('admin.doctors.update');
        Route::delete('/{doctor_id}', 'destroy')->name('admin.doctors.destroy');
    });

    Route::prefix('users')->middleware('admin-only')->controller(AdminUserController::class)->group(function () {
        Route::get('/', 'index')->name('admin.users.index');
        Route::get('/create', 'create')->name('admin.users.create');
        Route::post('/', 'store')->name('admin.users.store');
        Route::get('/{user_id}/edit', 'edit')->name('admin.users.edit');
        Route::put('/{user_id}', 'update')->name('admin.users.update');
        Route::delete('/{user_id}', 'destroy')->name('admin.users.destroy');
    });
});

Route::get('/login', [AuthController::class, 'login'])->name('login');
