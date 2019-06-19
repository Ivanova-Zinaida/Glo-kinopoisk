const searchForm = document.querySelector('#search-form');
const movie = document.querySelector("#movies");
function apiSearch(e){
    e.preventDefault();
    const searchText =document.querySelector('.form-control').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=16a3e8d598d0033016546d46a28f19f7&language=ru&query=' + searchText;
    requestApi('GET', server);
}
searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url){
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;
        if(request.status !== 200){
            console.log('error:' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            inner = inner +'<div class="col-12 col-md-4 col-xl-3">'+ nameItem +'</div>';
        });
        movie.innerHTML =inner;
        console.log(output);
    });
}