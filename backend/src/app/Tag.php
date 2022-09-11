<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Post;
use App\TagCategory;

class Tag extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }

    public function category()
    {
        return $this->hasOne(TagCategory::class);
    }
}
