<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemTypePlan extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'type',
        'typeOptions'
    ];

    protected $casts = [
        'typeOptions' => 'array',
    ];

    
}
