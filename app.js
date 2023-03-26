let page = 1;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=a822825e66d3f673a7e669e7d9075ee1&language=es-MX&${page}`;
const app = document.getElementById("app");
const myChart = document.getElementById("myChart").getContext("2d");

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(url);
    console.log(respuesta);
    if (respuesta.status === 200) {
      const data = await respuesta.json();
      let peliculas = ``;
      data.results.forEach((pelicula) => {
        peliculas += `
                            <div class="card">
                                <img class="card-img-top poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                                <div class="card-body">
                                    <h5 class="card-title titulo">${pelicula.title}</h5>
                                    <button id="info" class="btn btn-primary info" data-id="${peliculas.id}">Más info</button>
                                </div>
                                </div>
                            `;
      });
      document.getElementById("app").innerHTML = peliculas;
      let popular = [];
      let pelis = [];
      data.results.forEach((pelicula) => {
        pelis.push(pelicula.title);
        return pelis;
      });
      data.results.forEach((pelicula) => {
        popular.push(pelicula.popularity);
        return popular;
      });
      const grafica = new Chart(myChart, {
        type: 'pie',
        data: pelis,
        data: {
          datasets: [{
              data: popular,
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: pelis,
      }
    });
      myChart.innerHTML = grafica;
      console.log(pelis);
      console.log(popular);
    }
  } catch (error) {
    console.log(error);
  }
}
cargarPeliculas();
