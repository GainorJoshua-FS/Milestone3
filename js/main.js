window.addEventListener("load", function(){
    console.log("main page loaded");
    //instantiate singleton
    let boardDebut = BoadDebut.getInstance();
});

class BoadDebut{
    constructor(){
        let main = new Main();
    }

    static getInstance(){
        if(!BoadDebut._instance){
            BoadDebut._instance = new BoadDebut();
            return BoadDebut._instance;
        }
        else{
            throw "Singleton already created in main!";
        }
    }
}

class Main{
    constructor(){
        this.FillCarousel();
        let pickGame = document.querySelector('.pickbtn').addEventListener('click', e => this.RandomGameForm(e));
    }
    
    RandomGameForm(e){
        e.preventDefault();

        //Re-add all games for the filter
        // this.FillCarousel();
        
        const main = document.querySelector('main'),
        carousel = document.querySelector('.carousel'),
        pickGame = document.querySelector('.pickbtn');

        //Create Form Form
        let modal = document.createElement('div');
        modal.className = 'modalGame';
        modal.setAttribute('id', 'modalWindow');
        modal.innerHTML = '<div class="modalContent"><form class="container col-sm-10 col-md-8 col-lg-6 generateForm" id="newgame" method="POST"><div class="playerWrapper"><label for="playersInput" class="form-label">Number of Players</label><input type="number" class="form-control mb-3 modalPlayers" id="playersInput"></div><div class="timeWrapper"><label for="timeInput" class="form-label">Time Needed(in minutes)</label><input type="number" class="form-control mb-3 modalTime" placeholder="(ex: 120 = 120 minutes)" id="timeInput"></div><button type="button" class="btn submitBtn btn-primary mb-3 mr-3">Submit</button><button type="button" class="btn cancelBtn btn-primary mb-3">Cancel</button></form></div>';

        //Display Form
        main.prepend(modal);

        //Get Buttons
        const submit = document.querySelector('.submitBtn'),
        cancel = document.querySelector('.cancelBtn')

        //Button Options
        submit.addEventListener('click', e => this.SubmitGame(e));

        //Cancel Button
        cancel.addEventListener('click', e => {
            e.preventDefault();
            modal.remove();
        })
    }

// ====Display Chosen Random Game================================================
    SubmitGame(e){
        e.preventDefault();

        let players = document.querySelector('.modalPlayers').value,
        time = document.querySelector('.modalTime').value,
        playerWrap = document.querySelector('.playerWrapper'),
        timeWrap = document.querySelector('.timeWrapper'),
        modal = document.querySelector('.modalGame');
        // games = document.querySelectorAll('.carouselgame');

        if(players === '' || time === ''){
            this.ValidateInputs(players, time, playerWrap, timeWrap)
        }
        else{
            //GET GAME
            modal.remove();

            // for(let i=0; i < gamesArray.length; i++){
            //     console.log(i);
            //     console.log(games[i]);
            //     if(gamesArray[i].time > time || gamesArray[i].players > players){
            //         gamesArray.splice(i, 1);
            //         games[i].remove;
            //     }
            // }

            // this.FillCarousel();

            // $('.carousel').carousel({
            //     interval: 100,
            //     keyboard: false,
            //     pause: false,
            //     wrap: true,
            // })
        }
    }

// ====Fill Carousel with Games================================================
    FillCarousel(){
        const carousel = document.querySelector('.carousel-inner'),
        indicatorList = document.querySelector('.carousel-indicators');

        //IF GAMES ARE NOT IN CAROUSEL
        if(document.querySelector('.carouselgame') === null){
            for(let i=0; i < gamesArray.length; i++){
                //Create elements
                let carouselGame = document.createElement('article');

                //Add attributes to elements
                carouselGame.classList.add('carousel-item','carouselgame', 'text-center');

                //Add Inner Html
                carouselGame.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${gamesArray[i].title}</h2>
                    <dl class= "card-subtitle mb-1 pb-1">
                        <dt>Time: </dt>
                        <dd>${gamesArray[i].time}</dd>
                        <dt>Players:</dt>
                        <dd>${gamesArray[i].players}</dd>
                    </dl>
                    <p class="card-tex">${gamesArray[i].desc}</p>
                </div>`;

                //Append to HTML
                carousel.append(carouselGame);
            }
        }
        //IF GAMES ARE ALREADY IN CAROUSEL
        else{
            //Clear all games so no duplicates
            let games = document.querySelectorAll('.carouselgame');
            for(let i=0; i < games.length; i++){
                games[i].remove();
            }

            //Add games back in
            for(let i=0; i < gamesArray.length; i++){

                //Create elements
                let carouselGame = document.createElement('article');

                //Add Atributes
                carouselGame.classList.add('carousel-item', 'carouselgame', 'text-center');

                //Add inner HTML
                carouselGame.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${gamesArray[i].title}</h2>
                    <dl class= "card-subtitle mb-1 pb-1">
                        <dt>Time: </dt>
                        <dd>${gamesArray[i].time}</dd>
                        <dt>Players:</dt>
                        <dd>${gamesArray[i].players}</dd>
                    </dl>
                    <p class="card-tex">${gamesArray[i].desc}</p>
                </div>`;

                //Append to HTML
                carousel.append(carouselGame);
            }
        }
    }

// ====Validate Filter================================================
    ValidateInputs(players, time, playerWrapper, timeWrapper){
        //create labels and add attributes as needed
        let playerError = document.createElement('label'),
        timeError = document.createElement('label'),
        inputs = document.querySelectorAll('input');

        playerError.setAttribute('for', 'playersInput');
        playerError.setAttribute('role', 'alert');
        playerError.className = 'textError';
        
        timeError.setAttribute('for', 'timeInput');
        timeError.setAttribute('role', 'alert');
        timeError.className = 'textError';

        //add in error in order to select later.
        playerWrapper.appendChild(playerError);
        timeWrapper.appendChild(timeError);
        inputs[1].classList.add('error');
        inputs[0].classList.add('error');

        //delete to remove any duplicates
        const removeThis = document.querySelectorAll('.textError');
        for(let i=0; i < removeThis.length; i++){
            removeThis[i].remove()
        }
        inputs[1].classList.remove('error');
        inputs[0].classList.remove('error');

        //now check for errors
        if(players === ''){
            playerError.innerHTML = 'Please enter in a number';
            playerWrapper.appendChild(playerError);
            inputs[0].classList.add('error');
        }

        if(time === ''){
            timeError.innerHTML = 'Please enter in a number';
            timeWrapper.appendChild(timeError);
            inputs[1].classList.add('error');
        }
    }
}