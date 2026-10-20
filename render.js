function render(products) {
  const LittleShop = document.getElementById("ourproducts");

  LittleShop.innerHTML = "";

  products.forEach((element) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div id="productCard">
        <img
          id="productImage"
          src="${element.thumbnail}"
          alt="${element.title}"
        >
        <p>${element.title}</p>
        <p>$ ${element.price}</p>
        
        <p>% ${element.discountPercentage}</p>
<p> ${element.rating} ${"⭐".repeat(Math.round(element.rating))}</p>

        <p id="productDesc">${element.description}</p>
      </div>
    `;

    li.addEventListener("click", () => {
      showProductDetails(element.id);
    });

    LittleShop.append(li);
  });
}

async function showProductDetails(id) {
  const superproducts = document.querySelector(".superproducts");
  const details = document.querySelector(".details");
  const detailPage = document.querySelector("#detailsOfProduct");

  superproducts.style.display = "none";
  details.style.display = "block";

  detailPage.innerHTML = "<p>Loading product...</p>";

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const product = await res.json();

    detailPage.innerHTML = `
      <img
        id="imageDetailProduct"
        src="${product.thumbnail}"
        alt="${product.title}"
      >

      <p id="titleProduct">${product.title}</p>
      <p id="brandProduct">Brand: <mark>${product.brand}</mark></p>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Rating: ${"⭐".repeat(Math.round(product.rating))}</p>
      <p id="stock">
        ${product.stock > 0 ? "In Stock" : "None Left"}
      </p>
      <p>${product.description}</p>
      
      <p>Tags: ${product.tags.join(", ")}</p>


            <button id="BuyButton">Buy This Product</button>
      <p id="addedToCart" style="display: none;">
        Added to cart!
      </p>


            <p style="font-weight: bold; font-size: 25px;">Reviews: </p>

      <div id="reviewSection">
      

      <h1 id="reviewerName">${product.reviews[0].reviewerName}</h1>
      <p>${product.reviews[0].reviewerEmail}</p>      
      <p> ${"⭐".repeat(product.reviews[0].rating)}   </p>            
      <p> ${product.reviews[0].comment}</p>          
      <p> ${product.reviews[0].date}</p>       
    

<div id="line"></div>
      

      <h1 id="reviewerName">${product.reviews[1].reviewerName}</h1>
      <p>${product.reviews[1].reviewerEmail}</p>      
      <p> ${"⭐".repeat(product.reviews[1].rating)}   </p>            
      <p> ${product.reviews[1].comment}</p>          
      <p> ${product.reviews[1].date}</p>       


      <div id="line"></div>

            <h1 id="reviewerName" >${product.reviews[1].reviewerName}</h1>
      <p>${product.reviews[2].reviewerEmail}</p>      
      <p> ${"⭐".repeat(product.reviews[2].rating)}   </p>            
      <p> ${product.reviews[2].comment}</p>          
      <p> ${product.reviews[2].date}</p>    
   
      
      


      </div>

    `;

    const buyBtn = detailPage.querySelector("#BuyButton");
    const ptegCart = detailPage.querySelector("#addedToCart");

    buyBtn.addEventListener("click", () => {
      const alreadyInCart = cart.some((item) => item.id === product.id);

      if (alreadyInCart) {
        ptegCart.textContent = "This product is already in your cart.";
        ptegCart.style.display = "block";
        return;
      }

      product.quantity = 1;
      cart.push(product);
      localStorage.setItem("myCart", JSON.stringify(cart));

      updateCartAmount();
      TotalRender();

      ptegCart.textContent = "Added to cart!";
      ptegCart.style.display = "block";
    });
  } catch (error) {
    console.error(error);

    detailPage.innerHTML = `
      <p>Could not load this product.</p>
      <button id="retryProduct">Try again</button>
    `;

    detailPage.querySelector("#retryProduct").addEventListener("click", () => {
      showProductDetails(id);
    });
  }
}

function Theme() {
  const button = document.getElementById("statusMod");

  const savedTheme = localStorage.getItem("isDarkTheme") === "true";

  if (savedTheme) {
    document.body.classList.add("dark");
    button.textContent = "☀";
  } else {
    button.textContent = "⏾";
  }

  button.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    button.textContent = isDark ? "☀" : "⏾";
    localStorage.setItem("isDarkTheme", isDark);
  });
}

Theme();
