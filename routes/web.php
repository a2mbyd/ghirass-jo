<?php

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
