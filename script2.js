const searchForm = document.querySelector('#search-form');
const movie = document.querySelector("#movies");
const urlPostar= 'https://image.tmdb.org/t/p/w500';
const url404 ='./404.jpg';
function apiSearch(e){
    e.preventDefault();
    const searchText =document.querySelector('.form-control').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=16a3e8d598d0033016546d46a28f19f7&language=ru&query=' + searchText;
    movie.innerHTML = "Загрузка ...";

    fetch(server)
        .then(function(value){
            if(value.status !==200){
                return Promise.reject(new Error('Ошибка'));
            };
            return value.json();
        })
        .then(function(output){
            let inner = '';
            let imgPoster = '';
            output.results.forEach(function(item){
               let nameItem = item.name || item.title;
               let imgPoster = urlPostar + item.poster_path;
               if(item.poster_path===null){
                 imgPoster = url404;
              };
                inner +=`
                    <div class='col-md-4 mb-5 item'>
                    <img src="${imgPoster}" alt="${nameItem}">
                    <h5 class="text-center">${nameItem}</h5>
                    </div>

                `;

            });
            movie.innerHTML =inner;
        })
        .catch(function(reason){
            movie.innerHTML = "Упс что то пошло не так";
        });
    }
searchForm.addEventListener('submit', apiSearch);
