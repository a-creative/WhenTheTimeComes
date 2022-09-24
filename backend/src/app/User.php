<?php

namespace App;

use Illuminate\Auth\Authenticatable as TAuthenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as IAuthenticatable ;

class User extends Model implements IAuthenticatable
{
    use HasFactory, TAuthenticatable;
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','username','password'];
}
