<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Runner extends Model
{
    protected $table = "runners";
    //protected $fillable = array('chip_code', 'runner_number', 'firstname', 'lasttname', 'efc', 'cfl');
    //protected $fillable = array('efc');
    protected $fillable = array('efc', 'cfl');
}
