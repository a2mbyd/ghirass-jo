<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use App\Services\DoctorService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminDoctorController extends Controller
{
    public function __construct(
        protected DoctorService $doctorService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Doctors/Index', [
            'sections' => $this->doctorService->getSectionsWithDoctors(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Doctors/Create', [
            'sections' => $this->doctorService->sectionsForForm(),
        ]);
    }

    public function store(StoreDoctorRequest $request): RedirectResponse
    {
        $this->doctorService->create($request->validated(), $request->file('image'));

        return redirect()->route('admin.doctors.index')
            ->with('success', config('doctor.messages.created'));
    }

    public function edit(string $doctor_id): Response
    {
        $doctor = $this->doctorService->find($doctor_id);

        return Inertia::render('Admin/Doctors/Edit', [
            'doctor' => $doctor,
            'sections' => $this->doctorService->sectionsForForm(),
        ]);
    }

    public function update(UpdateDoctorRequest $request, string $doctor_id): RedirectResponse
    {
        $doctor = $this->doctorService->find($doctor_id);
        $this->doctorService->update($doctor, $request->validated(), $request->file('image'));

        return redirect()->route('admin.doctors.index')
            ->with('success', config('doctor.messages.updated'));
    }

    public function destroy(string $doctor_id): RedirectResponse
    {
        $doctor = $this->doctorService->find($doctor_id);
        $this->doctorService->delete($doctor);

        return redirect()->route('admin.doctors.index')
            ->with('success', config('doctor.messages.deleted'));
    }
}
