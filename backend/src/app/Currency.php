<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'unit',
        'exchRateDKK',
    ];

    protected $casts = [
        'exchRateDKK' => 'float',
    ];

    public function getDefault() : Currency {
        return $this->query()->where('unit','dkk')->first();
    }
}
