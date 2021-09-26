window.addEventListener("load", function(){
    console.log("library page loaded");
    //instantiate singleton
    let library = Library.getInstance();
});

class Library{
    constructor(){
        let mylibrary = new MyLibrary();
    }

    static getInstance(){
        if(!Library._instance){
            Library._instance = new Library();
            return Library._instance;
        }
        else{
            throw "Singleton already created in librar!";
        }
    }
}

class MyLibrary{
    constructor(){
        this.LoadInGames();
        let addGame = document.querySelector('.addBtn').addEventListener('click', e => this.AddGameModal(e));
        let selectGame = document.querySelectorAll('.selectBtn');
        for(let i=0; i<selectGame.length; i++){
            selectGame[i].addEventListener('click', e => this.DisplayGameModal(e));
        }
        // console.log(gamesArray[0].title);
    }


    AddGameModal(e){
        e.preventDefault();

        const main = document.querySelector('main');

        let modal = document.createElement('div');
        modal.className = 'modalGame';
        modal.setAttribute('id', 'modalWindow');
        modal.innerHTML = '<div class="modalContent"><form class="container col-sm-10 col-md-8 col-lg-6 generateForm" id="newgame" method="POST"><h6 class="text-right">*required</h6><!--<label for="img" class="form-label">Select image:</label><input type="file" class="mb-3 modalImg" id="img" name="img">--><div class="titleWrapper"><label for="titleInput" class="form-label titleLabel">*Title</label><input type="text" class="form-control mb-3 modalTitle" id="titleInput"></div><div class="playerWrapper"><label for="playersInput" class="form-label">*Max Amount of Players</label><input type="number" class="form-control mb-3 modalPlayers" id="playersInput"></div><div class="timeWrapper"><label for="timeInput" class="form-label">*Time Needed(in minutes)</label><input type="number" class="form-control mb-3 modalTime" placeholder="(ex: 120)" id="timeInput"></div><label for="descInput" class="form-label">Description</label><textarea class="form-control mb-3 modalDesc" id="descInput"></textarea><button type="button" class="btn submitBtn btn-primary mb-3 mr-3">Submit</button><button type="button" class="btn cancelBtn btn-primary mb-3">Cancel</button></form></div>';

        //display modal
        main.prepend(modal);

        //get buttons
        const submit = document.querySelector('.submitBtn'),
        cancel = document.querySelector('.cancelBtn');

        //button options
        cancel.addEventListener('click', e => {
            e.preventDefault();
            modal.remove();
        })

        submit.addEventListener('click', e => this.AddGame(e))
    }

// ====Add a New Game================================================
    AddGame(e){
        e.preventDefault();

        const page = document.querySelector('.row-cols-auto'),
        modal = document.querySelector('.modalGame');

        let image = document.querySelector('.modalImg').value,
        title = document.querySelector('.modalTitle').value,
        players = document.querySelector('.modalPlayers').value,
        time = document.querySelector('.modalTime').value,
        desc = document.querySelector('.modalDesc').value,
        titleWrap = document.querySelector('.titleWrapper'),
        playerWrap = document.querySelector('.playerWrapper'),
        timeWrap = document.querySelector('.timeWrapper');

        if(title === '' || players === '' || time === ''){
            this.ValidateInputs(title, players, time, titleWrap, playerWrap, timeWrap)
        }
        else{

            modal.remove();

            let game = new Game();
            game.title = title;
            game.players = players;
            game.time = time;
            game.desc = desc;
            game.index = gamesArray.length+1;

            gamesArray.push(game);

            this.LoadInGames();
        }
    }

// ====Validate New Game's Inputs================================================
    ValidateInputs(title, players, time, titleWrapper, playerWrapper, timeWrapper){
        //create labels and add attributes as needed
        let titleError = document.createElement('label'), 
        playerError = document.createElement('label'),
        timeError = document.createElement('label'), 
        inputs = document.querySelectorAll('input');

        titleError.setAttribute('for', 'titleInput');
        titleError.setAttribute('role', 'alert');
        titleError.className = 'textError';

        playerError.setAttribute('for', 'playersInput');
        playerError.setAttribute('role', 'alert');
        playerError.className = 'textError';
        
        timeError.setAttribute('for', 'timeInput');
        timeError.setAttribute('role', 'alert');
        timeError.className = 'textError';

        //add in error in order to select later.
        titleWrapper.appendChild(playerError);
        playerWrapper.appendChild(playerError);
        timeWrapper.appendChild(timeError);
        inputs[1].classList.add('error');
        inputs[2].classList.add('error');
        inputs[3].classList.add('error');

        //delete to remove any duplicates
        const removeThis = document.querySelectorAll('.textError');
        for(let i=0; i < removeThis.length; i++){
            removeThis[i].remove()
        }
        inputs[1].classList.remove('error');
        inputs[2].classList.remove('error');
        inputs[3].classList.remove('error');

        //now check for error!
        if(title === ''){
            titleError.innerHTML = 'Please enter in a title';
            titleWrapper.appendChild(titleError);
            inputs[1].classList.add('error');
        }

        if(players === ''){
            playerError.innerHTML = 'Please enter in a number';
            playerWrapper.appendChild(playerError);
            inputs[2].classList.add('error');
        }

        if(time === ''){
            timeError.innerHTML = 'Please enter in a number';
            timeWrapper.appendChild(timeError);
            inputs[3].classList.add('error');
        }
    }


// ====Display Chosen Game================================================
    DisplayGameModal(e){
        e.preventDefault();
        let target = e.target.id-1;

        const main = document.querySelector('main');

        let modal = document.createElement('div');
        modal.className = 'modalGame';
        modal.setAttribute('id', 'modalWindow');
        modal.innerHTML = `
        <article class="modalContent container">
        <div class="card-body d-flex flex-column">
            <button type="button" class="text-center btn closeBtn btn-primary mb-2">Close</button>
            <button type="button" class="text-center btn deleteBtn btn-primary mb-2">Delete Game</button>
            <h2 class="card-title text-center">${gamesArray[target].title}</h2>
            <dl class= "flex-row card-subtitle mb-1 pb-1 text-center"> 
                <dt>Time: </dt>
                <dd>${gamesArray[target].time}</dd>
                <dt>Players:</dt>
                <dd>${gamesArray[target].players}</dd>
            </dl>
            <p class="card-text overflow-auto text-center">${gamesArray[target].desc}</p>
            <!--<img src="images/${gamesArray[target].title}.jpg" alt="${gamesArray[target].title} Game Box Art" class="card-img-bottom"/>-->
            </div>
        </article
        `;

        main.prepend(modal);

        //BUTTON - Close
        document.querySelector('.closeBtn').addEventListener('click', e =>{
            e.preventDefault();
            modal.remove();
        })

        //BUTTON - Delete Game
        document.querySelector('.deleteBtn').addEventListener('click', e =>{
            e.preventDefault();
            modal.remove();
            let games = document.querySelectorAll('.game');

            games[target].remove()
            gamesArray.splice(target, 1);
            console.log(gamesArray);
            this.LoadInGames();
        })

    }


// ====Load Games onto Page================================================
    LoadInGames(){
        let container = document.querySelector('.row');

        //IF GAMES DONT EXIST WITHIN HTML
        if(document.querySelector('.game') === null){
            for(let i=0; i < gamesArray.length; i++){
                let newGame = document.createElement('article');
                newGame.classList.add('game', 'col-sm-12', 'col-md-6', 'col-lg-4', 'card', 'container', 'gx-3', 'mt-3');
                newGame.innerHTML = `<!--<img src="images/${gamesArray[i].title}.jpg" alt="${gamesArray[i].title} Game Box Art" class="card-img-top"/>-->
                <div class="card-body">
                    <h2 class="card-title">${gamesArray[i].title}</h2>
                        <dl class= "card-subtitle mb-1 pb-1"> 
                            <dt class="float-left">Time: </dt>
                            <dd>${gamesArray[i].time}</dd>
                            <dt class="float-left">Players:</dt>
                            <dd>${gamesArray[i].players}</dd>
                        </dl>
                    <p class="card-text overflow-hidden">${gamesArray[i].desc}</p>
                    <button type="button" class="selectBtn" id="${gamesArray[i].index}"></button>
                </div>`;
                container.appendChild(newGame);
            }
        }
        // IF GAMES ALREADY EXIST INSIDE HTML
        else{
            let games = document.querySelectorAll('.game');
            for(let i=0; i < games.length; i++){
                games[i].remove();
            }
            for(let i=0; i < gamesArray.length; i++){
                let newGame = document.createElement('article');
                newGame.classList.add('game', 'col-sm-12', 'col-md-4', 'col-lg-3', 'card', 'container', 'gx-3', 'mt-3');
                newGame.innerHTML = `<!--<img src="images/${gamesArray[i].title}.jpg" alt="${gamesArray[i].title} Game Box Art" class="card-img-top">-->
                <div class="card-body">
                    <h2 class="card-title">${gamesArray[i].title}</h2>
                        <dl class= "card-subtitle mb-1 pb-1"> 
                            <dt class="float-left">Time: </dt>
                            <dd>${gamesArray[i].time}</dd>
                            <dt class="float-left">Players:</dt>
                            <dd>${gamesArray[i].players}</dd>
                        </dl>
                    <p class="card-text overflow-hidden">${gamesArray[i].desc}</p>
                    <button type="button" class="selectBtn" id="${gamesArray[i].index}"></button>
                </div>`;
                container.appendChild(newGame);
            }
        }
    }
}