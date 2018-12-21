import React from 'react';
import './NoMatch.css'

// esto deberia renderear en una pantalla sin el sidebar ni header
const NoMatch = () => (

<body class="bg-purple">
  <div class="stars">
    <div class="central-body">
        <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"></img>
        <a href="/" class="btn-go-home" target="_blank">Ir a Inicio</a>
    </div>
    <div class="objects">
        <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"></img>
        <div class="earth-moon">
            <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"></img>
            <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"></img>
        </div>
        <div class="box_astronaut">
            <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"></img>
        </div>
    </div>
    <div class="glowing_stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
    </div>
  </div>
</body>






);

export default NoMatch;