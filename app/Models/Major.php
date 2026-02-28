<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Major extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'slug',
        'roadmap_image'
    ];

    /* Accessors */
    public function slug(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Str::slug($value),
        );
    }

    /* Relationships */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }
}
