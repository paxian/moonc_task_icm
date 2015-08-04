<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Response;
use App\Models\Runner;
use DB;
use Input;

class RunnersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    public function test_client()
    {

    }

    public function dashboard()
    {
        // $runners = DB::table('runners')->select('chip_code', 'firstname')->get();

        // return response()->json($runners);

    }

    public function runners()
    {
        //$runners = Runner::all();
        //$runners = DB::table('runners')->select('chip_code')->get();
        $runners = Runner::get(['chip_code']);

        //return response()->json(['records' => $runners]);
        return response()->json($runners);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update($chip_code) //Request $request, 
    {
        // $runner = Input::all();

        // $runnerUpdate = Runner::find($chip_code);

        // $runnerUpdate->efc = $runner['efc'];
//-----
         $efc = Input::get('efc'); //dump($efc);
         //$runnerUpdate = Runner::first($chip_code);
        $runnerUpdate = Runner::where('chip_code', $chip_code)->first(); 
//----- 
        //dump($runnerUpdate);
         $runnerUpdate->efc = $efc;
    //dump($runnerUpdate);

        /*
        if ( Input::get('tp') == 'A' ) {
            $runner->efc = Input::get('efc');
        } else {
            $runner->efc = Input::get('efl');
        }
        */


        $runnerUpdate->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
