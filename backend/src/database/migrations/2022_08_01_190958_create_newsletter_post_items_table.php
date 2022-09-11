<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Post;

class CreateNewsletterPostItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('newsletter_post_items', function (Blueprint $table) {
            $table->id();
            $table->mediumText('text')->nullable();
            $table->string('username');
            $table->foreignIdFor(Post::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('newsletter_post_items');
    }
}
