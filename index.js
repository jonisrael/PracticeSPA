// import * as components from "./components";
// is equal to
// import { Header, Nav, Main, Footer } from "./components";
import { Header, Nav, Main, Footer } from "./components";
import * as state from "/store";

import axios from "axios";
import Navigo from "navigo";
import { capitalize } from "lodash";
import "./env";

axios
  .get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  .then(response => console.log(response.data));


const router = new Navigo(window.location.origin);

router.on({
  ":page": params => render(state[capitalize(params.page)]),
  "/": () => render(state.Home)
});

function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  router.updatePageLinks();
}

render(state.Home);

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty("page")
        ? capitalize(params.page) // /? is a different if-else statement
        : "Home";

    if (page === "Blog") {
      state.Blog.posts = [];
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        response.data.forEach(post => {
          state.Blog.posts.push(post);
          done();
        });
      });
    }
  }
});

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  // handle the response from the API
  .then(response => {
    // for each post in the response Array,
    response.data.forEach(post => {
      // add it to state.Blog.posts
      state.Blog.posts.push(post);
    });
  });

axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&q=st.%20louis`
  )
  .then(response => {
    state.Home.weather = {};
    // console.log(response, state.Home.weather);
    state.Home.weather.city = response.data.name;
    state.Home.weather.temp = response.data.main.temp;
    state.Home.weather.feelsLike = response.data.main.feels_like;
    state.Home.weather.humidity = response.data.main.humidity;
    state.Home.weather.description = response.data.weather[0]["description"];
    done();
  })
  .catch(err => console.log(err));

// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});

// array of pictures for gallery
const dogPictures = [
  {
    url:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "sunglass doggo"
  },
  {
    url:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "mlep"
  },
  {
    url:
      "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "good boy with stick"
  },
  {
    url:
      "https://images.unsplash.com/photo-1477936432016-8172ed08637e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "black camo doggo"
  },
  {
    url:
      "https://images.unsplash.com/photo-1567529684892-09290a1b2d05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "happy boi"
  },
  {
    url:
      "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "eski"
  },
  {
    url:
      "https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "doin a confuse"
  },
  {
    url:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "happy little jump boi"
  },
  {
    url:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    title: "runnin with the dogs"
  }
];
// // populating gallery with pictures
// const gallerySection = document.querySelector("#gallery");
// dogPictures.forEach(pic => {
//   let img = document.createElement("img");
//   img.src = pic.url;
//   img.alt = pic.title;
//   gallerySection.appendChild(img);
// });

// // handle form submission
// document.querySelector("form").addEventListener("submit", event => {
//   event.preventDefault();
//   Array.from(event.target.elements).forEach(el => {
//     console.log("Input Type: ", el.type);
//     console.log("Name: ", el.name);
//     console.log("Value: ", el.value);
//   });
// });

// router.hooks({
//   before: (done, params) => {
//     const page = params && params.hasOwnProperty("page") ? capitalize(params.page) : "Home";

//     if (page === "Blog") {
//       state.Blog.posts = [];
//       axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
//         response.data.forEach(post => {
//           state.Blog.posts.push(post);
//           done();
//         });
//       });
//     }

//     if (page === "Home") {
//       axios
//         .get(
//           `https://api.openweathermap.org/data/2.5/weather?appid=fbb30b5d6cf8e164ed522e5082b49064&q=st.%20louis`
//         )
//         .then(response => {
//           state.Home.weather = {};
//           state.Home.weather.city = response.data.name;
//           state.Home.weather.temp = response.data.main.temp;
//           state.Home.weather.feelsLike = response.data.main.feels_like;
//           state.Home.weather.description = response.data.weather[0].main;
//           done();
//         })
//         .catch(err => console.log(err));
//     }
//   }
// });
