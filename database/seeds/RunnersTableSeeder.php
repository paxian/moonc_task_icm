<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\Runner;

class RunnersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $runners = 10;  // <--- EDIT HERE NUMBER OF DESIRED RUNNERS.

    	$this->command->info('Seeding Runners table ...');

        $faker = Faker\Factory::create();

        foreach( range(1,$runners) as $index ) 
        {
        	Runner::create([
                           'result' => 0,   
        				'chip_code'	=> $faker->year . $faker->year . $faker->year,
	          		'runner_number' => $faker->year,
	          			'firstname'	=> $faker->name,
	          			'lasttname'	=> $faker->lastname,
	           				  'efc'	=> '------',
	          				  'cfl'	=> '------'
        		]);
        }

        $this->command->info('Runners table seeded!');
    }
}
