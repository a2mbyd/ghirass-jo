<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'name',
        'description',
        'course_code',
        'credit_hours',
        'is_lab',
    ];

    protected $casts = [
        'is_lab' => 'boolean',
    ];

    /* Relationships */
    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(CourseFile::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(CourseVideo::class);
    }

    public function pastYearQuestions(): HasMany
    {
        return $this->hasMany(CoursePastYearQuestion::class);
    }

    public function prerequisites(): BelongsToMany
    {
        return $this->belongsToMany(
            Course::class,
            'course_prerequisite',
            'course_id',
            'prerequisite_id'
        )->withPivot('requirement_type');
    }

    public function corequisites(): BelongsToMany
    {
        return $this->belongsToMany(
            Course::class,
            'course_corequisite',
            'course_id',
            'corequisite_id'
        );
    }

    public function majors(): BelongsToMany
    {
        return $this->belongsToMany(Major::class, 'course_major')->withPivot('year', 'semester', 'type');
    }
}
