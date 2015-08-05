<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
                font-size: 14pt;
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
                width: 750px;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
               <!--  <div class="title">Laravel 5</div>
                <div clas="quote">{{ Inspiring::quote() }}</div> -->
                SPORTS EVENT TIMING ... =[ Demo context ]=
                <br><hr><br>
                By default, twenty (20) runners are registered for this competition demo, their information (name, surname, etc.) was automatically created using fzaninotto/faker library,
                you can use links on navbar for getting access to: <br><br>
               
                    <li><i>Dashboard:</i> UI, displays in real-time & table form the runners who have entered the finisth corridor.</li>
                    <li><i>Test Client:</i> UI where you can see a behaviour-simulation of all of those twenty (20) runners, TIMER starts automatically.</li>
                    <li><i>API:</i> A small set of available resource implemented on the backend which receives the timing information in real-time.</li>
                    <li><i>=[ Demo context ]=</i> ... this text.</li>        
                <br><hr>
                Interested on more or less runners?, sure, just either edit RunnersTableSeeder.php or seed database twice and you're ready to go, no more changes.
                <hr><br>
                Click <a href="http://localhost:8000/app/#/">here</a> to begin ...
            </div>
        </div>
    </body>
</html>
