//kedua, kita masuk sini, untuk mengeluarkan score yang ada di localstorage
        //membuat localstorage agar mengeluarkan value
        //karena score sdh di covert ke dalam json, kita convert lagi menjadi object agar bisa diakses
        //json parse adalah method yang digunakan untuk mengubah string JSON menjadi objek JavaScript
        console.log(JSON.parse(localStorage.getItem('score')));
        let score = JSON.parse(localStorage.getItem('score'));

    //keempat, karena sudah dihapus, maka akan eror jika mau dipakai
        //nah, kita harus buat kondisi yang mana jika storage null, maka akan menjadi default( 0 semua)
        //jadi angka bisa masuk, jika null tidak bisa
        if (score === null) { //!score
            score = {
                win : 0,
                lose : 0,
                draw : 0
            }
        }
    //panggil update score agar bisa diakses di dalam dom
        updateScoreElement();

        //membuat diluar fungsi agar bisa diakses yang lain
        const image = {
            Batu :  '<img src="img/rock.png" alt="Batu" width="100px" height="100px">',
            Kertas :  '<img src="img/kertas.png" alt="Kertas" width="100px" height="100px">',
            Gunting :  '<img src="img/scirssor.png" alt="Gunting" width="100px" height="100px">'
        };
        function computerChoice() {
             //randomNumber adalah variabel yang menyimpan nilai random dari 0-1
            let randomNumber = Math.random();
            let computerChoice = '';
            let computerChoiceImage = '';

            if (randomNumber < 1/3) { //antara 0 - 0,33
                computerChoice ='Batu';
                computerChoiceImage = image.Batu;
            } else if (randomNumber < 2/3) { //antara 0,33 - 0,66
                computerChoice = 'Kertas';
                computerChoiceImage = image.Kertas;
            } else { //antara 0,66 - 1
                computerChoice = 'Gunting';
                computerChoiceImage = image.Gunting;
            }
            return {
                choice : computerChoice,
                choiceImage : computerChoiceImage
            };
            
        }

        function result(pilihan) {//pilihan adalah parameter yang diambil dari func
            
            const computerMove = computerChoice(); //menyimpan value yang direturn
            const computerMoveChoice = computerMove.choice; //menyimpan value yang direturn
            const computerMoveImage = computerMove.choiceImage; //menyimpan value yang direturn
            let pilihanImage = '';

            let result = '';
            if (computerMoveChoice === pilihan) {
                result = 'Seri Boss!!';
                pilihanImage = computerMoveImage;
            } else if (computerMoveChoice === 'Batu') {
                if (pilihan === 'Kertas') {
                    pilihanImage = image.Kertas;
                    result = 'Kamu Menang';
                } else {
                    pilihanImage = image.Gunting;
                    result = 'Kamu Kalah';
                }
            } else if (computerMoveChoice === 'Gunting') {
                if (pilihan === 'Kertas') {
                    pilihanImage = image.Kertas;
                    result = 'Kamu Kalah';
                } else {
                    pilihanImage = image.Batu;
                    result = 'Kamu Menang';
                }
            } else {
                if (pilihan === 'Batu') {
                    pilihanImage = image.Batu;
                    result = 'Kamu Kalah';
                } else {
                    pilihanImage = image.Gunting;
                    result = 'Kamu Menang';
                }
            }

            document.querySelector('.js-result')
            .innerHTML = result;

            document.querySelector('.js-move')
            .innerHTML = `Computer memilih ${computerMoveChoice} dan kamu memilih ${pilihan}`;
            
            document.querySelector('.js-move-img')
            .innerHTML = `you ${pilihanImage}${computerMoveImage} Computer`;
            //check update
            if (result === 'Kamu Menang') {
                score.win += 1 ; 
            }else if (result === 'Kamu Kalah') {
                score.lose += 1;
            }else {
                score.draw += 1;
            }

        //pamggil update score element agar bisa diakses di dalam dom
            updateScoreElement();

            //jadi Pertama setelah update score, kita 
            //membuat localstorage agar data dari history tidak ke hapus jika direfresh
            //localstorage hanya bisa string, jadi kita convert score object ke json string
            localStorage.setItem('score',JSON.stringify(score));

        //jadi setelah kita bikin js result dan move, alert ini tidak perlu lagi, bebas sih
            // alert(`Computer memilih ${computerMove}. ${result}
            // \nWins: ${score.win}, Losses: ${score.lose}, Draw ${score.draw}`);
        }
        

        function updateScoreElement() {
            //selanjutnya dalam dom kita ingin mengeluarkan score yang ada di localstorage
            //jadi kita ambil score yang ada di localstorage, dan kita convert ke dalam json string
            document.querySelector('.js-score')
            .innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Draw ${score.draw}`;
        }