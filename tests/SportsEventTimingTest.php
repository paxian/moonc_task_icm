<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Illuminate\Http\ParseJson;

use vendor\autoload;

class SportsEventTimingTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        //$this->visit('/');
             //->see('Laravel 5');

        $this->call('GET', '/'); //dump($this);
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo('/app/#/');        
        $this->assertResponseStatus(302);
        

        $response = $this->action('GET', 'RunnersController@runners');
        $this->call('GET', '/dashboard');
        $this->assertResponseOk();
        $this->seeJson();
        

        $response = $this->action('GET', 'RunnersController@dashboard');
        $this->call('GET', '/runners');
        $this->assertResponseOk();
        $this->seeJson();
        

        $data = array("timing_point" => 'B', "clock_time" => '1:1:1', "resultOrder" => 1);
        $data = json_encode($data);
        
        $response = $this->action('PUT', 'RunnersController@update');
        $hardcoded_chipCode = '198419941975';
        $resposne = $this->call('PUT', '/runners/'.$hardcoded_chipCode, [], [], [], [],  $data);

    }

    
    public function getRunnersOnTest()
    {
        $this->get('/runners', ['norunners'=> []])
             ->seeJson([
                    'norunners' => [],
                ]);
    }

    public function getRunners4DashboardTest()
    {
        $this->get('/dashboard', ['notable'=>[]])
             ->seeJson([
                    'notable' => [],
                ]);
    }

    public function getEmptyRunnersArray4TestClientTest()
    {
        $this->get('/runners',[])
             ->seeJson([
                    [] => [],
                ]);
    }

    public function getEmptyRunnersArrayTest4DashboardTest()
    {
        $this->call('GET', '/dashboard')->assertResponseOk();
        $this->get('/dashboard', ['empty'=>[]])
             ->seeJson([
                    'empty' => [],
                ]);
    }

}





