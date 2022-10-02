<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActualAmount extends Model
{
    use HasFactory;

    protected $fillable = [ 'year','month','actualAmount' ];

    protected $casts = [
        'year'          => 'integer',
        'month'         => 'integer',
        'actualAmount'  => 'integer',
    ];

    public $timestamps = false;
}
