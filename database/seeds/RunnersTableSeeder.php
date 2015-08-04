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
    	$this->command->info('Seeding Runners table ...');

        $faker = Faker\Factory::create();

        foreach( range(1,15) as $index ) 
        {
        	Runner::create([
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
