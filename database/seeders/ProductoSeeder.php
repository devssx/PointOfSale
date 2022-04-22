<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('productos')->insert([
            'nombre' => 'Pedigree Cachorro 7Kg',
            'codBar' => '1111111111',
            'familia' => 'Alimento',
            'descripcion' => 'Bolsa de 7Kg de alimento pedigree para perro cachorro.',
            'especificacion' => 'Bolsa Alimento 7Kg Marca Pedigree',
            'precio' => 570,
            'maximos' => 100,
            'minimos' => 5,
            'stock' => 1,
            'favorito' => 1, // index 1 - n
            'image' => 'https://m.media-amazon.com/images/I/71gVIUFsA1S._AC_SX466_.jpg'
        ]);

        DB::table('productos')->insert([
            'nombre' => 'Desparacitante Care Max',
            'codBar' => '2222222222',
            'familia' => 'Desparacitantes',
            'descripcion' => '2 tabletas de desparacitante para perros y gatos',
            'especificacion' => '2 tabletas de desparacitante',
            'precio' => 570,
            'maximos' => 100,
            'minimos' => 5,
            'stock' => 1,
            'favorito' => 1, // index 1 - n
            'image' => 'https://cdn.shopify.com/s/files/1/0268/6861/products/caremax-adultong_grande.png'
        ]);
    }
}
