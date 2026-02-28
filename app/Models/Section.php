<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Section extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'major_id'
    ];

    /* Relationships */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
