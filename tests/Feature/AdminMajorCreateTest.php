<?php

use App\Models\Course;
use App\Models\Major;
use App\Models\Section;
use App\Models\User;

test('create page displays form with courses and sections', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('admin.majors.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Admin/Majors/Create')
        ->has('allCourses')
        ->has('allSections')
    );
});

test('store creates a new major with courses and redirects', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $section = Section::factory()->create();
    $courses = Course::factory()->count(2)->create(['section_id' => $section->id]);

    $response = $this->post(route('admin.majors.store'), [
        'name' => 'تخصص جديد',
        'description' => 'وصف التخصص',
        'slug' => 'new-major',
        'courses' => $courses->pluck('id')->toArray(),
    ]);

    $response->assertRedirect(route('admin.majors'));

    $major = Major::where('slug', 'new-major')->first();
    expect($major)->not->toBeNull()
        ->and($major->name)->toBe('تخصص جديد');
});
