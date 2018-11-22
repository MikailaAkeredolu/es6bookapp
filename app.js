//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//Ui Constructor
function UI(){}

//Ui prototype creation
UI.prototype.addBookToList = function(book){  //takes book object
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

UI.prototype.showAlert = function(message, className){
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

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get Form Values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    //instantiating a book based on the form values
    const book = new Book(title, author, isbn);

    //instantiate a Ui object
    const ui = new UI();
console.log(ui);
    //Validations
    if(title === '' || author === '' || isbn === ''){
        //Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
    //add book to list
    ui.addBookToList(book);

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
ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});  //use parent for event delegtion



































/*
class Person{
    constructor(firstName, lastName, dob){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = new Date(dob);
    }

    greeting(){
        return `Hello there ${this.firstName} ${this.lastName}`
    }

    calculateAge(){
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    getsMarried(newLastName){
            this.lastName = newLastName;
    }

    //static methods
    static addNumbers(x, y){
        return x + y;
    }
}

const person1 = new Person('mary', 'jane', '11-13-1980');
console.log(person1.greeting());
console.log(person1.calculateAge());
console.log(person1.getsMarried('Thompson'));
console.log(person1);
console.log(Person.addNumbers(1,2));  // calling static method



//Inheritance / SubClasses
class Customer extends Person{
    constructor(firstName, lastName, dob, phone, membership){
        super(firstName, lastName, dob);
        this.phone = phone;
        this.membership = membership;
    }
    static getMembershipCost(){
        return 500;
    }
}

const customer1 = new Customer('John', 'Doe', '11-13-1980','555-555-5555','standard' );
console.log(customer1.greeting());
console.log(Customer.getMembershipCost());

*/