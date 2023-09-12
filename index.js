
const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseUrl = "https://newsapi.org/v2";
const apiKey = "XXXXXXXXXXXXXXXXX";

const defaultImage = "/IMGS/Steve.JPG";

// const urlA = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=XXXXXXXXXXXXXXXXXXXX";
// const urlB = "https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=XXXXXXXXXXXXXXXXXXXX";
// const urlCrypto = "https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=XXXXXXXXXXXXXXXXXXXX"
// const urlTech = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=XXXXXXXXXXXXXXXXXXXX";


async function dataRequest(url){
    try {
        const response = await fetch(baseUrl + url + "&apiKey=" + apiKey);
        const json = response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}


function urlRequest(urlA){
    dataRequest(urlA).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${item.urlToImage ? item.urlToImage: defaultImage }" alt="Default news image"/>
                                    </div>
                                    <div class="information">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${item.description ? item.description : "Short description not available from source website, click 'Read Article' to get the full details." }</p>
                                            <p class="time">
                                            <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                            <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                            </p>
                                        </div>
                                    <div class="other">
                                        <div>
                                        
                                        <span class="source">${item.author ? item.author : "WorldNews"}</span>
                                        </div>
                                        <a class="url" target="_blank" href="${item.url}"
                                        >Read Article <i class="bi bi-arrow-right"></i
                                        ></a>
                                    </div>
                                    </div>
                                </div>`;
        })
    })
}

category.addEventListener("click", event => {
    if (event.target.tagName === "SPAN") {
        cards.innerHTML = "";
        urlRequest(event.target.dataset.url);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
    }


});


urlRequest("/top-headlines?country=ng");
