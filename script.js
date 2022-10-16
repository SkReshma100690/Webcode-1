//  Headings at the top of the page
let page_heading = document.getElementById('page_heading_div');
page_heading.innerHTML = "Welcome to the Ice and Fire page";

document.getElementById("loading-message-div").innerHTML = "This page may take some time to get all the API links, please wait patiently";
document.getElementById('book-characters-direction-div').innerHTML = "The characters in a particular book are given in the block right to that book's block";
document.getElementById('serach-instruction-div').innerHTML = "Type the name of the book in the search bar, it will highlight that particular book name in the following list (scroll down to see that book)";
document.getElementById('pagination-instruction-div').innerHTML = "You can go through all the books (only after the data of all books is loaded from the API) by moving among the multiple pages (through the pagination at the bottom of the page)";

let errorMessage_div = document.getElementById('tryCatch_errorMessage_div');
errorMessage_div.style.display='none';

// Search field and search button
let search_and_button = document.getElementById('search_and_button_div');

// Search field
let search_field = document.getElementById('search_bar_input');
search_field.setAttribute('placeholder',"Book's Name");

// Reset button
let reset_button = document.getElementById('reset_button');
reset_button.setAttribute('onclick','unmarkingFun()');

// Search button
let search_button = document.getElementById("search_button_id");
search_button.setAttribute('onclick','markingFun()');

//  Selecting the main div (container) which contains all the pages of the document
let main_div_of_pages = document.getElementById('main-div-containing-pages');
let numOfChildrenOfMainDiv = main_div_of_pages.children.length-1; // Number of children of main div-1

// Setting the display of the pages (other than first page) to none
for(let h=1; h<=numOfChildrenOfMainDiv; h++){
    main_div_of_pages.children[h].style.display='none';
}

// Div of pagination buttons
let div_of_pagination = document.querySelector('#pagination-buttons-div');

// Setting the previous button's display to none (as the first page will be displayed by default)
div_of_pagination.children[0].style.display = 'none';

// Setting the first page button to active (as the first page will be displayed by default)
div_of_pagination.children[1].classList.add('active');

// Number of children of Unordered list of pagination buttons-1
let numOfChildrenOfPaginationDiv = div_of_pagination.children.length-1;

// The URL for supplying into the async function is given below (Ice and Fire API)
let suppliedUrl = "https://www.anapioficeandfire.com/api/books";

var page_number = 0; 
var numOfCharacters = 10; // from each book
var numOfBooksPerPage = 2;
//  Some random colors taken
let some_colors = ['#dddd','#AABC23','lightblue','lightgreen','lightpink','rgba(182, 140, 140, 0.867)','rgba(186, 231, 183, 0.867)','rgba(218, 136, 181, 0.867)','rgba(148, 182, 211, 0.867)','rgba(238, 111, 73, 0.867)'];

let webCode_1 = async (suppliedUrl)=>{
    try{
        let datFromUrl = await fetch(suppliedUrl).then(dat=>dat.json());
        
        let random_digit_forTd1 = 0; 
        let random_color_ForTd1 = ''; // background-color for first cell (td) of each row
    for(let i=0;i<datFromUrl.length;i+=numOfBooksPerPage){
        // i indicates the index of book from the data (2 books per page), when i updates then page number updates
        for(let j=0;j<numOfBooksPerPage;j++){
            // j represents the j_th row of page (one book per row)

            // Creating a row
            let table_rows = document.createElement('tr');

            if(random_digit_forTd1<=some_colors.length){
                random_color_ForTd1 = some_colors[random_digit_forTd1];
                random_digit_forTd1 = random_digit_forTd1+1;
            }else{
                random_digit_forTd1 = 0;
                random_color_ForTd1 = some_colors[random_digit_forTd1];
            }

            let reqBookData = datFromUrl[i+j]; // required book data (i+j)
            for(let k=0;k<2;k++){
                // Creating a cell
                var table_cell = document.createElement('td');
                if(k==0){
                    // div contains book name
                    var bookName_div=document.createElement('div');
                    // div contains isbn
                    var isbn_div = document.createElement('div');
                    // div contains number of pages
                    var numOfPages_div = document.createElement('div');
                    // div contains author names
                    var authors_div = document.createElement('div');
                    // div contains publisher's name
                    var publisher_div = document.createElement('div');
                    // div contains date of release
                    var releasedDate_div = document.createElement('div');
                    
                    // adding some class names to the above divs
                    bookName_div.classList.add('bookName-div');
                    isbn_div.classList.add('isbn-div');
                    numOfPages_div.classList.add('numOfPages-div');
                    authors_div.classList.add('authors-div');
                    publisher_div.classList.add('publisher-div');
                    releasedDate_div.classList.add('releasedDate-div');

                    // Adding the innerHTML data
                    bookName_div.innerHTML = "<span>Book Name: </span>" + reqBookData["name"];
                    isbn_div.innerHTML = "<span>isbn: </span>" + reqBookData["isbn"];
                    numOfPages_div.innerHTML = "<span>Number of Pages: </span>" + reqBookData["numberOfPages"];
                    authors_div.innerHTML = "<span>Authors: </span>" + reqBookData["authors"][0];
                    publisher_div.innerHTML = "<span>Publisher: </span>" +  reqBookData["publisher"];
                    releasedDate_div.innerHTML = "<span>Released On: </span>" + reqBookData["released"].slice(0,10);
                    
                    // Appending the above divs to the cell
                    table_cell.append(bookName_div);
                    table_cell.append(isbn_div);
                    table_cell.append(numOfPages_div);
                    table_cell.append(authors_div);
                    table_cell.append(publisher_div);
                    table_cell.append(releasedDate_div);
                    // Setting background color for the cell (k=0 means first cell)
                    table_cell.style.backgroundColor = random_color_ForTd1;

                }else if(k==1){
                    // Taking 10 characters from the required (selected) book
                    let characters = reqBookData['characters'].slice(0,numOfCharacters);
                    // div to display the heading of "Characters In The Book"
                    let character_heading_div = document.createElement('div');
                    character_heading_div.classList.add('character-heading-div');
                    character_heading_div.innerHTML = 'Characters In The Book';
                    // Appending above div to cell
                    table_cell.append(character_heading_div);
                    
                    let random_digit = 0;
                    let random_color = ''; // Random color for the characters
                    for(let i_char=0;i_char<characters.length;i_char++){
                        
                        if(random_digit<some_colors.length){
                            random_color = some_colors[random_digit];
                            random_digit = random_digit+1;
                        }else{
                            random_digit = 0;
                            random_color = some_colors[random_digit];
                        }
                        // Taking ith url from the list of characters (urls of characters)
                        let char_url = characters[i_char];
                        try{
                            // Fetching data of the ith character
                            let character_data = await fetch(char_url).then(dat=>dat.json());
                            
                            let ith_char_div = document.createElement('div');
                            ith_char_div.classList.add('ith-character-div')

                            // div to display character index
                            let ith_char_index_div = document.createElement('div');
                            ith_char_index_div.classList.add('char-index-div')
                            ith_char_index_div.innerHTML = i_char+1;

                            let ith_char_details_div = document.createElement('div');
                            ith_char_details_div .classList.add('character-details-div');

                            // div to display character's name
                            let ith_char_name_div = document.createElement('div');
                            // div to display gender of character
                            let ith_char_gender_div = document.createElement('div');
                            // div to display the name who played the character
                            let ith_char_playedBy_div = document.createElement('div');

                            ith_char_name_div.classList.add('char-name-div');
                            ith_char_gender_div.classList.add('char-gender-div');
                            ith_char_playedBy_div.classList.add('char-playedBy-div');
                            

                            // Because in for some characters details are missing, so using if else condition
                            if(character_data['name']==''){
                                ith_char_name_div.innerHTML = '<span>Character Name: </span>' + '-';
                            }else{
                                ith_char_name_div.innerHTML = '<span>Character Name: </span>' + character_data['name'];
                            }
                            if(character_data['gender']==''){
                                ith_char_gender_div.innerHTML = '<span>Character Gender: </span>' + '-';
                            }else{
                                ith_char_gender_div.innerHTML = '<span>Character Gender: </span>' + character_data['gender'];
                            }

                            if(character_data['playedBy'][0]==''){
                                ith_char_playedBy_div.innerHTML = '<span>Played By: </span>' + '-';
                            }else{
                                ith_char_playedBy_div.innerHTML = '<span>Played By: </span>' + character_data['playedBy'][0];
                            }

                            ith_char_details_div.append(ith_char_name_div);
                            ith_char_details_div.append(ith_char_gender_div);
                            ith_char_details_div.append(ith_char_playedBy_div);

                            // Applying some background color for the characters details div
                            ith_char_details_div.style.backgroundColor = random_color;

                            ith_char_div.append(ith_char_index_div);
                            ith_char_div.append(ith_char_details_div);

                            table_cell.append(ith_char_div);
                        }  
                        catch(err){
                            // Displaying error messages
                            errorMessage_div.style.display='';
                            errorMessage_div.innerHTML = err.message;
                        }
                    }
                }
                // Appending cell to row
                table_rows.append(table_cell);
            }
            for(let y=0;y<=numOfChildrenOfMainDiv;y++){
                if(y==page_number){
                    // Appending the table row formed to the childran of main div
                    main_div_of_pages.children[y].children[0].append(table_rows)
                }
            }
        }
        page_number+=1;    // Updating the page number 
    }    
}
catch(err){
    // Displaying error messages
    errorMessage_div.style.display='';
    errorMessage_div.innerHTML = err.message;
}
}
webCode_1(suppliedUrl)

let prev_but = div_of_pagination.children[0];

let page_1 = div_of_pagination.children[1];
let page_2 = div_of_pagination.children[2];
let page_3 = div_of_pagination.children[3];
let page_4 = div_of_pagination.children[4];
let page_5 = div_of_pagination.children[5];

let next_but = div_of_pagination.children[numOfChildrenOfPaginationDiv];

var previously_checked_pagination_childran = 1;
var previously_checked_main_div_children = 0;

// Adding events for the pagination buttons
page_1.addEventListener('click',function(e){
    pagination_operation(1);
})
page_2.addEventListener('click',function(e){
    pagination_operation(2);
})
page_3.addEventListener('click',function(e){
    pagination_operation(3);
})

page_4.addEventListener('click',function(e){
    pagination_operation(4);
})
page_5.addEventListener('click',function(e){
    pagination_operation(5);
})

prev_but.addEventListener('click',function(e){
    pagination_operation(0);
})
next_but.addEventListener('click',function(e){
    pagination_operation(numOfChildrenOfPaginationDiv);
})

function pagination_operation(pagination_childran){
    if(pagination_childran!=0 && pagination_childran!=numOfChildrenOfPaginationDiv){
        // For the pagination buttons other than previous and next
        div_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
        div_of_pagination.children[pagination_childran].classList.add('active');

        let main_div_childran = pagination_childran-1;
        main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
        main_div_of_pages.children[main_div_childran].style.display='';
        previously_checked_main_div_children = main_div_childran;

        previously_checked_pagination_childran = pagination_childran;
        if(previously_checked_pagination_childran==1){
            div_of_pagination.children[0].style.display = 'none';
        }else{
            div_of_pagination.children[0].style.display = '';
        }
        
        if(previously_checked_pagination_childran==numOfChildrenOfPaginationDiv-1){
            div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='none';
        }else{
            div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='';
        }
    }else if(pagination_childran==0){
        // For the pagination previous button
        if(previously_checked_pagination_childran!=1){
            let required_pagination_childran = previously_checked_pagination_childran-1;
            div_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
            div_of_pagination.children[required_pagination_childran].classList.add('active');
            
            let required_main_div_childran = previously_checked_main_div_children-1;
            main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
            main_div_of_pages.children[required_main_div_childran].style.display='';
            previously_checked_main_div_children = required_main_div_childran;

            previously_checked_pagination_childran = required_pagination_childran;

            if(previously_checked_pagination_childran==1){
                div_of_pagination.children[0].style.display = 'none';
            }else{
                div_of_pagination.children[0].style.display = '';
            }
            
            if(previously_checked_pagination_childran==numOfChildrenOfPaginationDiv-1){
                div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='none';
            }else{
                div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='';
            }
        }

    }else if(pagination_childran==numOfChildrenOfPaginationDiv){
        // For the pagination next button
        if(pagination_childran!=numOfChildrenOfPaginationDiv-1){
            let required_pagination_childran = previously_checked_pagination_childran+1;
            div_of_pagination.children[previously_checked_pagination_childran].classList.remove('active');
            div_of_pagination.children[required_pagination_childran].classList.add('active');

            let required_main_div_childran = previously_checked_main_div_children+1;
            main_div_of_pages.children[previously_checked_main_div_children].style.display='none';
            main_div_of_pages.children[required_main_div_childran].style.display='';
            previously_checked_main_div_children = required_main_div_childran;

            previously_checked_pagination_childran = required_pagination_childran;

            if(previously_checked_pagination_childran==1){
                div_of_pagination.children[0].style.display = 'none';
            }else{
                div_of_pagination.children[0].style.display = '';
            }
            
            if(previously_checked_pagination_childran==numOfChildrenOfPaginationDiv-1){
                div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='none';
            }else{
                div_of_pagination.children[numOfChildrenOfPaginationDiv].style.display='';
            }
        }
    }
}


var previous_searched_memory = null; // initialising previous searched memory in the search field
var originalBackColors = null;  // initialising background colors of div (s) containing previous searched memory

//  Calling onclick function (markingFun which will hilight the matches for searched value) for search-button
function markingFun(){   
    let search_input = document.getElementById('search_bar_input');
    if(search_input.value!=''){
        
        let search_value = search_input.value;
        let search_value_lowerCase = search_value.toLowerCase();
       
        let book_names =document.querySelectorAll('.bookName-div'); 
        
        let previous_backgroundColors = [];
        book_names.forEach((bookName)=>{
            
            if(bookName.innerHTML.toLowerCase().includes(search_value_lowerCase)){
                previous_backgroundColors.push(bookName.style.backgroundColor);
                bookName.style.backgroundColor = 'yellow';
                bookName.nextElementSibling.style.backgroundColor = 'yellow';
                bookName.nextElementSibling.nextElementSibling.style.backgroundColor = 'yellow';
                bookName.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor = 'yellow';
            }
        })
        originalBackColors = previous_backgroundColors;
        previous_searched_memory = search_value;

    }   
}

//  Calling onclick function (unmarkingFun which will remove the hilight for the previous searched values)
function unmarkingFun(){ 
    if(previous_searched_memory!=null){

            let prev_search_value_lowerCase = previous_searched_memory.toLowerCase();
            
            let book_names =document.querySelectorAll('.bookName-div'); 
            let original_backcolor_index = 0;
            book_names.forEach((bookName)=>{
                if(bookName.innerHTML.toLowerCase().includes(prev_search_value_lowerCase)){
                    bookName.style.backgroundColor = originalBackColors[original_backcolor_index];
                    bookName.nextElementSibling.style.backgroundColor = originalBackColors[original_backcolor_index];
                    bookName.nextElementSibling.nextElementSibling.style.backgroundColor = originalBackColors[original_backcolor_index];
                    bookName.nextElementSibling.nextElementSibling.nextElementSibling.style.backgroundColor = originalBackColors[original_backcolor_index];
                    
                    original_backcolor_index+=1;
                }
            })
            search_field.value = '';
    }
}
