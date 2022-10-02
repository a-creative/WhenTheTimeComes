<?php

use App\ItemType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTypePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_type_plans', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['fixed','variable']);
            $table->json('typeOptions');
            $table->foreignIdFor(ItemType::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_type_plans');
    }
}
