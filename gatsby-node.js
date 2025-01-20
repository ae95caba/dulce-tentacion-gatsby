const crypto = require("crypto");
require("dotenv").config();

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const fetchProducts = async () => {
    const apiUrl = process.env.GATSBY_API_URL;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${apiUrl}/products`, requestOptions);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    return data;
  };

  const fetchApiRouteContent = async (apiRoute) => {
    const apiUrl = process.env.GATSBY_API_URL;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${apiUrl}/${apiRoute}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed for apiRoute: ${apiRoute}`);
    }

    const data = await response.json();

    return data;
  };

  try {
    // Fetch all products
    const products = await fetchProducts();

    // Extract unique apiRoute values
    const uniqueApiRoutes = [
      ...new Set(
        products
          .map((p) => {
            console.log("apiRoute value (raw):", p.apiRoute);
            return p.apiRoute;
          })
          .filter(Boolean)
      ),
    ];

    // Map products to Gatsby nodes
    products.forEach((product) => {
      const productNode = {
        id: `${product._id}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Product`,
        },
        children: [],
        name: product.name,
        description: product.description,
        price: product.price,
        _id: product._id,
        imgUrl: product.imgUrl,
        outOfStock: product.outOfStock,
        flavours: product.flavours,
        apiRoute: product.apiRoute,
      };

      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(productNode))
        .digest(`hex`);

      productNode.internal.contentDigest = contentDigest;

      createNode(productNode);
    });

    // Fetch and create nodes for each unique apiRoute
    for (const apiRoute of uniqueApiRoutes) {
      const fetchContent = await fetchApiRouteContent(apiRoute);

      const menuNode = {
        id: `menu-${apiRoute}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Menu`,
        },
        children: [],
        apiRoute,
        fetchContent,
      };

      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(menuNode))
        .digest(`hex`);

      menuNode.internal.contentDigest = contentDigest;

      createNode(menuNode);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return;
};
