<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\ItemType;

class CreateActualAmountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actual_amounts', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->tinyInteger('month');
            $table->integer('actualAmount');
            $table->foreignIdFor( ItemType::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('actual_amounts');
    }
}
