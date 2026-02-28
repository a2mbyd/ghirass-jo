<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'))->name('home');
Route::get('/subjects', fn() => Inertia::render('ITSubjects'))->name('subjects');
Route::get('/gpa', fn() => Inertia::render('GPACalculator'))->name('gpa');
Route::get('/doctors', fn() => Inertia::render('Doctors'))->name('doctors');
Route::get('/majors/{major}', fn($major) => Inertia::render('Major', ['major' => $major]))->name('major');
