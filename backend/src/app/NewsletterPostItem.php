<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Post;

class NewsletterPostItem extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function post()
    {
        return $this->hasOne(Post::class);
    }
}
