<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminDoctorController extends Controller
{
    public function index(): Response
    {
        $sections = Section::with('doctors')->get();

        return Inertia::render('Admin/Doctors/Index', [
            'sections' => $sections,
        ]);
    }

    public function create(): Response
    {
        $sections = Section::all(['id', 'name']);

        return Inertia::render('Admin/Doctors/Create', [
            'sections' => $sections,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:doctors,email'],
            'department' => ['nullable', 'string', 'max:50'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        }

        Doctor::create($validated);

        return redirect()->route('admin.doctors.index');
    }

    public function edit(string $doctor_id): Response
    {
        $doctor = Doctor::findOrFail($doctor_id);
        $sections = Section::all(['id', 'name']);

        return Inertia::render('Admin/Doctors/Edit', [
            'doctor' => $doctor,
            'sections' => $sections,
        ]);
    }

    public function update(Request $request, string $doctor_id): RedirectResponse
    {
        $doctor = Doctor::findOrFail($doctor_id);
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'department' => ['nullable', 'string', 'max:50'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($doctor->image) {
                Storage::disk('public')->delete($doctor->image);
            }
            $validated['image'] = $request->file('image')->store('doctors', 'public');
        }

        $doctor->update($validated);

        return redirect()->route('admin.doctors.index');
    }

    public function destroy(string $doctor_id): RedirectResponse
    {
        return redirect()->route('admin.doctors.index');
    }
}
