<?php

namespace App\Http\Controllers;

use App\Http\Resources\DoctorResource;
use App\Http\Resources\MajorResource;
use App\Models\Doctor;
use App\Models\Major;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'majors' => MajorResource::collection(Major::all()),
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
            ->groupBy(fn ($doctor) => $doctor->section?->name)
            ->map(fn ($group) => DoctorResource::collection($group));

        return Inertia::render('Doctors', [
            'doctorsBySection' => $doctorsBySection,
        ]);
    }
}
