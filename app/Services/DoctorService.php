<?php

namespace App\Services;

use App\Models\Doctor;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DoctorService
{
    public function getSectionsWithDoctors(): Collection
    {
        return Section::with('doctors')->get();
    }

    public function sectionsForForm(): Collection
    {
        return Section::orderBy('name')->get(['id', 'name']);
    }

    public function storeImage(?UploadedFile $file): ?string
    {
        if (! $file) {
            return null;
        }

        return $file->store(config('doctor.image.path'), config('doctor.image.disk'));
    }

    public function deleteImage(?string $path): void
    {
        if ($path) {
            Storage::disk(config('doctor.image.disk'))->delete($path);
        }
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $image = null): Doctor
    {
        if ($image) {
            $data['image'] = $this->storeImage($image);
        }

        return Doctor::create($data);
    }

    public function find(int|string $id): Doctor
    {
        return Doctor::findOrFail($id);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Doctor $doctor, array $data, ?UploadedFile $image = null): void
    {
        // if no image given, keep the old image
        if ($image) {
            $this->deleteImage($doctor->image);
            $data['image'] = $this->storeImage($image);
        } else {
            $data['image'] = $doctor->image;
        }

        $doctor->update($data);
    }

    public function delete(Doctor $doctor): void
    {
        $this->deleteImage($doctor->image);
        $doctor->delete();
    }
}
