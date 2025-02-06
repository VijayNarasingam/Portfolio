let products = {
    data: [


      {
        id:5,
        productName: "Toy Shop",
        category: "Web_App",
        image: "img/Toy-store.jpg",
        detail: "toy store web site",
        link:"https://vijaynarasingam.github.io/Toy-Store",
      },

      {
        id:4,
        productName: "Bright Money",
        category: "Web_page",
        image: "img/bright_money.jpg",
        detail: "Finance ",
        link:"https://vijaynarasingam.github.io/BrightMoney/",
      },

      {
        id:3,
        productName: "Tic Tac Toe",
        category: "Web_App",
        image: "img/tic tac toe1.jpg",
        detail: "Tic Tac Toe Game",
        link:"https://vijaynarasingam.github.io/Tic-Tac-Toe",
      },

      {
        id:2,
        productName: "Yugan Photography",
        category: "Web_page",
        image: "img/yugan.jpg",
        detail: "Photographer web page",
        link:"https://vijaynarasingam.github.io/yugan_photography/",
      },

      {
        id:1,
        productName: "DreamEscape Travels",
        category: "Web_page",
        image: "img/DreamEscapeTravels.png",
        detail: "Travels web Page",
        link:"https://vijaynarasingam.github.io/DreamEscapeTravels/",
      },

      
    ],
  };


  for (let i of products.data) {
    //Create Card
    let card = document.createElement("div");
    //Card should have category and should stay hidden initially
    card.classList.add("card", i.category, "hide");
    
    let cardLink = document.createElement("a");
    cardLink.setAttribute("href", i.link); 
    // Image div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    // Create anchor tag for the image link
    let imageLink = document.createElement("a");
    imageLink.setAttribute("href", i.link); 
    // Image tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    // Append image to the image link
    imageLink.appendChild(image);
    // Append image link to the image container
    imgContainer.appendChild(imageLink);
    // Append image container to the card link
    cardLink.appendChild(imgContainer);
    card.appendChild(cardLink); 
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //detail
    let detail = document.createElement("h6");
    detail.innerText = i.detail;
    container.appendChild(detail);
  
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
  }
  
