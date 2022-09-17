<?php

use App\ItemType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpItemTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exp_item_types', function (Blueprint $table) {
            $table->id();
            $table->string('name',150);
            $table->smallInteger('priority');
            $table->boolean('income_essential');
            $table->unique(['priority','income_essential']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exp_item_types');
    }
}
