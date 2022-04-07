<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id(); // cod_prod

            $table->string('nombre', 100);
            $table->string('codBar', 50);
            $table->string('familia', 50);
            $table->string('descripcion', 500);
            $table->string('especificacion', 500);
            $table->decimal('precio');
            $table->unsignedInteger('maximos')->default(0);
            $table->unsignedInteger('minimos')->default(0);
            $table->boolean('stock');
            $table->tinyInteger('favorito');
            $table->string('image')->default('');

            $table->timestamps();

            // https://www.codegrepper.com/code-examples/php/laravel+data+types
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
