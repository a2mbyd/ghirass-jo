<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoursePastYearQuestion extends Model
{
    protected $fillable = [
        'course_id',
        'name',
        'url',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
