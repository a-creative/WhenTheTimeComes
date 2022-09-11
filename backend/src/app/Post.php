<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Tag;
use App\PostSubject;

class Post extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function subject()
    {
        return $this->hasOne(PostSubject::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
