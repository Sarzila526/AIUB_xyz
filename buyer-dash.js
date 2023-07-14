document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const productList = document.getElementById("product-list");
  const orderList = document.getElementById("order-list");
  const deleteHistoryButton = document.getElementById("delete-history-button");

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  function searchProducts(searchData) {
    const searchResults = storedProducts.filter(function(product) {
      const description = product.description.toLowerCase();
      const price = product.price.toString();
      const certificateNumber = product.certificateNumber.toLowerCase();

      return (
        description.includes(searchData) ||
        price.includes(searchData) ||
        certificateNumber.includes(searchData)
      );
    });

    renderProductList(searchResults);
  }

  function renderProductList(products) {
    productList.innerHTML = "";

    products.forEach(function(product, index) {
      const listItem = document.createElement("li");

      const imageElement = document.createElement("img");
      imageElement.src = product.imageSrc;
      listItem.appendChild(imageElement);

      const detailsElement = document.createElement("div");
      detailsElement.classList.add("product-details");
      detailsElement.innerHTML = `<p><strong>Price:</strong> $${product.price}</p>
                                  <p><strong>Description:</strong> ${product.description}</p>
                                  <p><strong>Certificate Number:</strong> ${product.certificateNumber}</p>
                                  <p><strong>Artwork Name:</strong> ${product.artworkName}</p>
                                  <p><strong>Verification Status:</strong> ${product.verificationStatus}</p>`;
      listItem.appendChild(detailsElement);

      const orderButton = document.createElement("button");
      orderButton.setAttribute("type", "button");
      orderButton.classList.add("btn-order");
      orderButton.textContent = "Order this";
      orderButton.addEventListener("click", function() {
        const order = {
          productId: index,
          productName: product.description,
          status: "Pending",
          orderDetails: ""
        };
        storedOrders.push(order);
        saveOrdersToLocalStorage(storedOrders);
        alert(`Order placed for ${product.description}`);
      });
      listItem.appendChild(orderButton);

      productList.appendChild(listItem);
    });
  }

  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  function renderOrderList() {
    orderList.innerHTML = "";

    storedOrders.forEach(function(order) {
      const listItem = document.createElement("li");

      const orderInfoElement = document.createElement("div");
      orderInfoElement.classList.add("order-info");
      orderInfoElement.innerHTML = `<p><strong>Product:</strong> ${order.productName}</p>
                                    <p><strong>Status:</strong> ${order.status}</p>
                                    <p><strong>Order Details:</strong> ${order.orderDetails}</p>`;
      listItem.appendChild(orderInfoElement);

      orderList.appendChild(listItem);
    });
  }

  function deleteOrderHistory() {
    storedOrders = [];
    saveOrdersToLocalStorage(storedOrders);
    renderOrderList();
  }

  searchButton.addEventListener("click", function() {
    const searchData = searchInput.value.trim().toLowerCase();
    searchProducts(searchData);
  });

  searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      const searchData = searchInput.value.trim().toLowerCase();
      searchProducts(searchData);
    }
  });

  deleteHistoryButton.addEventListener("click", function() {
    deleteOrderHistory();
    alert("Order history deleted.");
  });

  renderOrderList();
});
