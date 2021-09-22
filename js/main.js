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
        let pickGame = document.querySelector('.pickbtn').addEventListener('click', e => this.RandomGameForm(e));
    }
    
    RandomGameForm(e){
        e.preventDefault();
        
        const main = document.querySelector('main'),
        carousel = document.querySelector('.carousel'),
        pickGame = document.querySelector('.pickbtn');

        //disable button so multiple forms cant be added
        pickGame.disabled = true;

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

        cancel.addEventListener('click', e => {
            e.preventDefault();
            modal.remove();
            pickGame.disabled = false;
        })
    }

    SubmitGame(e){
        e.preventDefault();

        let players = document.querySelector('.modalPlayers').value,
        time = document.querySelector('.modalTime').value,
        playerWrap = document.querySelector('.playerWrapper'),
        timeWrap = document.querySelector('.timeWrapper');

        if(players === '' || time === ''){
            this.ValidateInputs(players, time, playerWrap, timeWrap)
        }
        else{
            //ADD GAME
        }
    }

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
        playerError.remove();
        timeError.remove();
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