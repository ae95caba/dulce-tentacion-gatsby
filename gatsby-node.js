const crypto = require("crypto");

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

  try {
    // Await for results
    const products = await fetchProducts();

    // Map into these results and create nodes
    products.forEach((product) => {
      // Create your node object
      const productNode = {
        // Required fields
        id: `${product._id}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Product`, // name of the graphQL query
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with GraphQL
        name: product.name,
        price: product.price,
        _id: product._id,
        imgUrl: product.imgUrl,
        outOfStock: product.outOfStock,
        flavours: product.flavours,
        // etc...
      };

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(productNode))
        .digest(`hex`);
      // Add it to userNode
      productNode.internal.contentDigest = contentDigest;

      // Create node with the Gatsby createNode() API
      createNode(productNode);
    });
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }

  return;
};
