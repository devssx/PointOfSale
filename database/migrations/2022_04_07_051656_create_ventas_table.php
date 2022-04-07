<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id(); // id_venta

            $table->date('fecha');
            $table->string('folio', 20);
            $table->string('codUser', 20);
            $table->string('comentario', 500);
            $table->decimal('subtotal');
            $table->decimal('iva');
            $table->decimal('total');
            $table->date('fechaCancelado')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ventas');
    }
}
