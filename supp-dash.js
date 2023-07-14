document.addEventListener("DOMContentLoaded", function() {
  const productForm = document.getElementById("product-form");
  const productList = document.getElementById("product-list");
  const orderList = document.getElementById("order-list");
  const btnDeleteAll = document.getElementById("btn-delete-all");

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  function saveProductsToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  function renderProductList() {
    productList.innerHTML = "";

    storedProducts.forEach(function(product, index) {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      const imageElement = document.createElement("img");
      imageElement.src = product.imageSrc;
      listItem.appendChild(imageElement);

      const detailsElement = document.createElement("div");
      detailsElement.classList.add("product-details");
      detailsElement.innerHTML = `<p><strong>Price:</strong> $${product.price}</p>
                                  <p><strong>Description:</strong> ${product.description}</p>
                                  <p><strong>Artwork Name:</strong> ${product.artworkName}</p>
                                  <p><strong>Verification Status:</strong> ${product.verificationStatus || "Unverified"}</p>
                                  <p><strong>Certificate Number:</strong> ${product.certificateNumber || "None"}</p>`;
      listItem.appendChild(detailsElement);

      const checkOrderButton = document.createElement("button");
      checkOrderButton.setAttribute("type", "button");
      checkOrderButton.classList.add("btn-check-order");
      checkOrderButton.textContent = "Check Order";
      listItem.appendChild(checkOrderButton);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("btn-delete");
      deleteButton.textContent = "Delete";
      listItem.appendChild(deleteButton);

      productList.appendChild(listItem);
    });
  }

  function renderOrderList() {
    orderList.innerHTML = "";

    storedOrders.forEach(function(order, index) {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      const orderInfoElement = document.createElement("div");
      orderInfoElement.classList.add("order-info");
      orderInfoElement.innerHTML = `<p><strong>Product:</strong> ${order.productName}</p>
                                    <p><strong>Status:</strong> ${order.status}</p>`;
      listItem.appendChild(orderInfoElement);

      if (order.status === "Pending") {
        const receiveOrderButton = document.createElement("button");
        receiveOrderButton.setAttribute("type", "button");
        receiveOrderButton.classList.add("btn-receive-order");
        receiveOrderButton.textContent = "Receive Order";
        listItem.appendChild(receiveOrderButton);
      }

      orderList.appendChild(listItem);
    });
  }

  renderProductList();
  renderOrderList();

  productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const productImage = document.getElementById("product-image").files[0];
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value;
    const artworkName = document.getElementById("artwork-name").value;

    const reader = new FileReader();

    reader.onload = function(event) {
      const imageSrc = event.target.result;

      const newProduct = {
        imageSrc: imageSrc,
        price: productPrice,
        description: productDescription,
        artworkName: artworkName,
        verificationStatus: "Unverified",
        certificateNumber: "None"
      };

      storedProducts.push(newProduct);
      saveProductsToLocalStorage(storedProducts);
      renderProductList();
      productForm.reset();
    };

    reader.readAsDataURL(productImage);
  });

  productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-check-order")) {
      const listItem = event.target.closest("li");
      const index = parseInt(listItem.getAttribute("data-index"));
      const product = storedProducts[index];

      const order = storedOrders.find(order => order.productId === index);

      if (order) {
        alert(`Yes, buyer ordered this!`);
      } else {
        alert(`No order for this product`);
      }
    } else if (event.target.classList.contains("btn-delete")) {
      const listItem = event.target.closest("li");
      const index = parseInt(listItem.getAttribute("data-index"));

      storedProducts.splice(index, 1);
      saveProductsToLocalStorage(storedProducts);

      renderProductList();
    }
  });

  orderList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-receive-order")) {
      const listItem = event.target.closest("li");
      const index = parseInt(listItem.getAttribute("data-index"));
      const order = storedOrders[index];

      order.status = "Received";
      saveOrdersToLocalStorage(storedOrders);
      renderOrderList();
    }
  });

  btnDeleteAll.addEventListener("click", function() {
    storedProducts.length = 0;
    storedOrders.length = 0;

    saveProductsToLocalStorage(storedProducts);
    saveOrdersToLocalStorage(storedOrders);

    renderProductList();
    renderOrderList();
  });
});
