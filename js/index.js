window.addEventListener("load", function(){
    console.log("page loaded");
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
            throw "Singleton already created!";
        }
    }
}

class Main{
    constructor(){
        let pickGame = document.querySelector('.pickbtn').addEventListener('click', e => this.RandomGameForm(e));
    }
    
    RandomGameForm(e){
        e.preventDefault();
        
        const main = document.querySelector('main');

        //Create Form Form
        let form = document.createElement('form');
        form.classList.add('container', 'col-sm-4', 'col-md-2', 'col-lg-4', 'generateForm');
        form.innerHTML = '<h6 class="text-right">*required</h6><label for="playersInput" class="form-label">*Max Amount of Players</label><input type="number" class="form-control mb-3" id="playersInput"><label for="timeInput" class="form-label">*Time Needed(in minutes)</label><input type="number" class="form-control mb-3" placeholder="(ex: 120)" id="timeInput"><button type="button" class="btn submitBtn btn-primary mb-3">Submit</button><button type="button" class="btn cancelBtn btn-primary mb-3">Cancel</button>';

        //Display Form
        main.prepend(form);

        //Get Buttons
        const submit = document.querySelector('.submitBtn'),
        cancel = document.querySelector('.cancelBtn')

        //Button Options
        submit.addEventListener('click', e => GenerateRandomGame(e));

        cancel.addEventListener('click', e => {
            e.preventDefault();
            form.remove();
        })
    }
}