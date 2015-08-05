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

    /**
     * Returns a set of runners, those who have entered the final corridor.
     */
    public function dashboard()
    {
        $runners = Runner::where('efc', '<>','------')->orderBy('result', 'asc')->get();

        return response()->json($runners);

    }

    /**
     * Returns a set of chip codes, representing runners, for test client.
     */
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
     * Update the specified runner in storage.
     *
     * @param  int  $chip_code
     */
    public function update($chip_code)
    {

         $clock_time = Input::get('clock_time');
         //$runnerUpdate = Runner::first($chip_code);  //findOrFail
         $runnerUpdate = Runner::where('chip_code', $chip_code)->first();   //dump($runnerUpdate);

        
        if ( Input::get('timing_point') == 'A' ) {
            $runnerUpdate->efc = $clock_time;
        } else {
            $runnerUpdate->cfl = $clock_time;
            $runnerUpdate->result = Input::get('resultOrder');
        }

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
