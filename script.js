const apikey=
'3756b3dfd913470eaf3c7f0713f4c2eb'
const blogContainer =document.getElementById
("blog-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")



async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apikey}`
        const responce= await fetch(apiUrl)
        const data = await responce.json()
        return data.articles;

    }catch(error){
        console.error("Error Fetching random news",error)
        return []

    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim()
    if (query !== ""){
        try{
            const articles = await fetchNewsQuery
            (query)
            displayBlogs(articles)

        }catch(error){
            console.log("Error Fetching news by query",error)

        }
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=50&apikey=${apikey}`
        const responce= await fetch(apiUrl)
        const data = await responce.json()
        return data.articles;

    }catch(error){
        console.error("Error Fetching random news",error)
        return []

    }

}


function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard =document.createElement
        ("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt= article.title;
        const title = document.createElement("h2");
        const truncatedTitle =
            article.title.length> 30
              ? article.title.slice(0,30) +"....":
              article.title;
        title.textContent = truncatedTitle;
        const desription = document.createElement("p");
        desription.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desription);
        blogCard.addEventListener("click",()=>{
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);

    })

}
(async () =>{
    try{
       const articles= await fetchRandomNews()
       displayBlogs(articles);

    }catch (error){
        console.error("Error Fetching random news",error);

    }
})();


