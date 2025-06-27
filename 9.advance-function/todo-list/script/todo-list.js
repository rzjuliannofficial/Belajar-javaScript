const myArrayTodolist = []; 
//jadi setelah kita menambahkan data, maka myArrayTodolist akan berisi data yang kita masukkan DARI TAMPILKAN INPUT

function praktikum1(){
    
    const inputElement = document.querySelector('.js-name');
    const name = inputElement.value; // mengambil value dari inputan
    // console.log(name); // menampilkan value di console
    const dateInputElement = document.querySelector('.js-duedate');
    const duedate = dateInputElement.value; // mengambil value dari inputan tanggal
    

    if (name !== '' || duedate !== '') { // jika nama atau tanggal kosong
        myArrayTodolist.push({
            name: name, // menambahkan nama ke dalam array
            duedate: duedate // menambahkan tanggal ke dalam array
        });
    }
    console.log(myArrayTodolist);
    
    inputElement.value = ''; // mengosongkan input setelah menambah todo  
    dateInputElement.value = ''; // mengosongkan input setelah menambah todo  
    TampilkanInput(); // memanggil fungsi TampilkanInput untuk menampilkan data
    
}

// TampilkanInput(); // memanggil fungsi TampilkanInput untuk menampilkan data awal


function hundleAddButton1(event){ //ini menghandle jika kita menekan enter, akan memanggil fungsi praktikum1
    if (event.key === 'Enter'){
        praktikum1();
    }
}


function TampilkanInput() {
    let todoListHTML = ''; // inisialisasi variabel untuk menyimpan HTML
    
    myArrayTodolist.forEach(function(dataObject, index) {
        const {name, duedate} = dataObject; // destructuring untuk mengambil nama dan tanggal dari array
        const html = 
        `
        <div>${name}</div> 
        <div>${duedate}</div>
        <button onclick="
        myArrayTodolist.splice(${index}, 1);  // menghapus data dari array
        TampilkanInput();  // memanggil fungsi TampilkanInput untuk menampilkan data setelah dihapus
        " class="delete-button">Delete</button>
        `;
        todoListHTML += html;
    });

//jadi foreach lbeih mudah di baca dan di pahami

    // for (let i = 0; i < myArrayTodolist.length; i++) {
    //     const dataObject = myArrayTodolist[i];
    //     const {name, duedate} = dataObject;
    //     // const name = dataObject.name; // mengambil nama dari array
    //     // const duedate = dataObject.duedate; // mengambil tanggal dari array
    //     const html = 
    //     `
    //     <div>${name}</div> 
    //     <div>${duedate}</div>
    //     <button onclick="
    //     myArrayTodolist.splice(${i}, 1);  // menghapus data dari array
    //     TampilkanInput();  // memanggil fungsi TampilkanInput untuk menampilkan data setelah dihapus
    //     " class="delete-button">Delete</button>
    //     `;
    //     todoListHTML += html; // menambahkan data ke dalam todoListHTML
    //     //document.querySelector('.js-tampilkan1').innerHTML += data; 
    // }
    // console.log(todoListHTML);
    document.querySelector('.js-tampilkan-input').innerHTML = todoListHTML; // menampilkan data di dalam elemen dengan class js-tampilkan1
}