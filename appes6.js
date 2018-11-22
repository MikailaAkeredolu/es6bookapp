class Book{

constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

}

//Methods that deal with UI

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create table row element
        const row = document.createElement('tr');
         //Insert Columns
         row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" class="delete">X</a></td>
                         `;
        list.appendChild(row);
    }

    showAlert(message, className){

        //create a div
    const div = document.createElement('div');
    //add class
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));

    //Get Parent
    const container = document.querySelector('.container');

    //Get the form
    const form = document.querySelector('#book-form');


    //Insert a div alert before the form
    container.insertBefore(div, form);

    //time out alert after 3 secs
    setTimeout(function(){
    document.querySelector('.alert').remove();
    }, 3000);

    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
    }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


//Local Storage Class

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
                books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();  //get the book first
        books.forEach(function(book){  //loop through the books
                //put it into the UI by intantiating a ui object
                const ui = new UI;
                ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        //stringify it so you can store in LS
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();  //get the book first
        books.forEach(function(book, index){  //loop through the books and check if isbn matches
             if(book.isbn === isbn){
                 books.splice(index, 1);  //remove one
             }
        });
  //stringify it so you can store in LS
  localStorage.setItem('books', JSON.stringify(books));

    }

}



//DOM load event - when the dom content is loaded call the function Store.displayBooks
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//Event Listener for Adding Books
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get Form Values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    //instantiating a book based on the form values
    const book = new Book(title, author, isbn);

    //instantiate a Ui object
    const ui = new UI();

    //Validations
    if(title === '' || author === '' || isbn === ''){
        //Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
    //add book to list
    ui.addBookToList(book);

    //Add to Local Storage
        Store.addBook(book);
    //Show Success
    ui.showAlert('Book Added!', 'success');

    //clear fields
    ui.clearFields();

    }

    
    e.preventDefault();
});


//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e){
const ui = new UI();
ui.deleteBook(e.target);

//remove book from local storage
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});  //use parent for event delegtion



