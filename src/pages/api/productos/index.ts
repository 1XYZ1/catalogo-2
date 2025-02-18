import type { APIRoute } from "astro";
import { products } from "@/data/products";

export const GET: APIRoute = async ({ request, params }) => {
  try {
    let productsList = [];

    try {
      // Intentamos importar los productos dinámicamente si la importación estática falla
      if (!products || !Array.isArray(products)) {
        const { products: dynamicProducts } = await import("@/data/products");
        productsList = dynamicProducts;
      } else {
        productsList = products;
      }

      if (!Array.isArray(productsList)) {
        throw new Error("Products array is not valid");
      }
    } catch (importError) {
      console.error("Error importing products:", importError);
      throw new Error("Unable to load products data");
    }

    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    console.log("Searching for slug:", slug);
    console.log("Products available:", productsList.length);

    if (slug) {
      const product = productsList.find((product) => product.slug === slug);

      if (!product) {
        return new Response(
          JSON.stringify({
            error: `Producto: ${slug} no encontrado`,
            status: 404,
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(JSON.stringify(productsList), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in /api/productos:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
        status: 500,
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
