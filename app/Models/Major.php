<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Major extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'roadmap_image',
    ];

    /* Accessors */
    public function slug(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::slug($value),
        );
    }

    /* Relationships */
    public function sections(): BelongsToMany
    {
        return $this->belongsToMany(Section::class, 'section_major');
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_major')->withPivot('year', 'semester', 'course_major_type');
    }
}
