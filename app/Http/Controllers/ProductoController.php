<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Obtiene Producto
     * 
     * cb: codigo de barras
     * kw: keywords (nombre or descripcion)
     * id: id
     * all: regresa todos
     */
    public function search(Request $request)
    {
        if ($request->filled('cb')) {
            return Producto::where('codBar', $request->get('cb'))->get();
        }

        if ($request->filled('kw')) {
            return Producto::where('nombre', 'LIKE', '%' . $request->get('kw') . '%')
                ->orWhere('descripcion', 'LIKE', '%' . $request->get('kw') . '%')
                ->paginate(10)
                ->setPath('')
                ->appends(array('search' => $request->get('kw'),));
        }

        if ($request->filled('id')) {
            return Producto::where('id', $request->get('id'))->get();
        }

        if ($request->has('all')) {
            return Producto::all();
        }

        return Producto::paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
