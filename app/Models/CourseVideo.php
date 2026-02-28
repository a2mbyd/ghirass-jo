<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'title',
        'url'
    ];

    /* Relationships */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
