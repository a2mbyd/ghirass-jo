<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Major;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'majors' => Major::all(),
        ]);
    }

    public function gpa()
    {
        return Inertia::render('GPACalculator');
    }

    public function doctors()
    {
        $doctors = Doctor::with('section')->get();

        $doctorsBySection = $doctors
            ->groupBy(fn (Doctor $d) => $d->section?->name)
            ->map(fn ($doctorsInSection) => $doctorsInSection->map(fn (Doctor $d) => [
                'id' => (string) $d->id,
                'name' => $d->name,
                'email' => $d->email,
                'department' => $d->department ?? '',
                'section' => $d->section?->name ?? '',
                'image' => $d->image ?? '',
            ])->values()->all())
            ->all();

        return Inertia::render('Doctors', [
            'doctorsBySection' => $doctorsBySection,
        ]);
    }
}
