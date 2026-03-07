<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /* Relationships */
    public function majors(): BelongsToMany
    {
        return $this->belongsToMany(Major::class, 'section_major');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function doctors(): HasMany
    {
        return $this->hasMany(Doctor::class);
    }
}
