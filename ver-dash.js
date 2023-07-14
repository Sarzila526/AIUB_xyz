document.addEventListener("DOMContentLoaded", function() {
    const certificateSearchInput = document.getElementById("certificate-search-input");
    const certificateSearchButton = document.getElementById("certificate-search-button");
    const certificateSearchResult = document.getElementById("certificate-search-result");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const productList = document.getElementById("product-list");
    const displayProductsButton = document.getElementById("display-products-button");
  
    const storedCertificates = JSON.parse(localStorage.getItem("certificates")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  
    certificateSearchButton.addEventListener("click", function() {
      const certificateNumber = certificateSearchInput.value.trim();
      if (storedCertificates.includes(certificateNumber)) {
        certificateSearchResult.textContent = "Valid Certificate Number";
      } else {
        certificateSearchResult.textContent = "Not a Valid Certificate Number";
      }
    });
  
    searchButton.addEventListener("click", function() {
      const searchQuery = searchInput.value.trim().toLowerCase();
  
      const searchResults = storedProducts.filter(function(product) {
        const description = product.description.toLowerCase();
        const price = product.price.toString();
        const certificateNumber = product.certificateNumber.toLowerCase();
  
        return (
          description.includes(searchQuery) ||
          price.includes(searchQuery) ||
          certificateNumber.includes(searchQuery)
        );
      });
      renderProductList(searchResults);
    });
  
    function renderProductList(products) {
      productList.innerHTML = "";
  
      products.forEach(function(product) {
        const listItem = document.createElement("li");
  
        const imageElement = document.createElement("img");
        imageElement.src = product.imageSrc;
  
        const priceElement = document.createElement("p");
        priceElement.innerHTML = `<strong>Price:</strong> ${product.price}`;
        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = `<strong>Description:</strong> ${product.description}`;
        const certificateElement = document.createElement("p");
        certificateElement.innerHTML = `<strong>Certificate Number:</strong> ${product.certificateNumber}`;
  
        const verifyButton = document.createElement("button");
        verifyButton.setAttribute("type", "button");
        verifyButton.classList.add("btn-verify");
        verifyButton.textContent = "Verify";
        verifyButton.addEventListener("click", function() {
          const uniqueCertificateNumber = prompt("Enter a unique certificate number:");
  
          if (uniqueCertificateNumber !== "" && !storedCertificates.includes(uniqueCertificateNumber)) {
            product.verificationStatus = "Verified";
            product.certificateNumber = uniqueCertificateNumber;

            saveProductsToLocalStorage(storedProducts);
            storedCertificates.push(uniqueCertificateNumber);
            saveCertificatesToLocalStorage(storedCertificates);
  
            renderProductList(products);
          } else {
            alert("Please enter a unique certificate number.");
          }
        });
  
        const verificationStatusElement = document.createElement("p");
        verificationStatusElement.innerHTML = `<strong>Verification Status:</strong> ${product.verificationStatus || "Unverified"}`;
  
        listItem.appendChild(imageElement);
        listItem.appendChild(priceElement);
        listItem.appendChild(descriptionElement);
        listItem.appendChild(certificateElement);
        listItem.appendChild(verifyButton);
        listItem.appendChild(verificationStatusElement);
  
        productList.appendChild(listItem);
      });
    }
  
    function saveProductsToLocalStorage(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  
    renderProductList(storedProducts);
  });
  