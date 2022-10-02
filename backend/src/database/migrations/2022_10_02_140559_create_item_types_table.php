<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Currency;
use App\ItemTypePlan;
use App\ItemType;

class CreateItemTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('amountReg', 150)->nullable();
            $table->enum('type',['income','expense']);
            $table->enum('subType', ['expenseIncomeEssential'])->nullable();
            $table->smallInteger('priority')->unsigned();
            $table->foreignIdFor(Currency::class,'currency_id')->constrained()->restrictOnDelete();
            $table->unique(['type','subType','currency_id','priority']);
            $table->foreignIdFor(ItemTypePlan::class)->nullable()->constrained()->restrictOnDelete();
        });

        Schema::table('item_type_plans', function(Blueprint $table ) {
            $table->foreignIdFor(ItemType::class)->change()->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_types');
    }
}
