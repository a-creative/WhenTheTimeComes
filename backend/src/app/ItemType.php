<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemType extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'amountReg',
        'type',
        'subType',
        'priority'
    ];

    protected $casts = [
        'priority' => 'integer',
    ];

    public function actualAmounts() {
        return $this->hasMany(ActualAmount::class);
    }

    public function currency() {
        return $this->belongsTo(Currency::class);
    }

    public function plans() {
        return $this->hasMany(ItemTypePlan::class);
    }

    public function currentPlan() {
        return $this->belongsTo(ItemTypePlan::class);
    }
}
