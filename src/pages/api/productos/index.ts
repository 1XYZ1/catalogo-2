import type { APIRoute } from "astro";
import { products } from "../../../data/products.ts";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  console.log(slug);

  if (slug) {
    const product = products.find((product) => product.slug === slug);

    if (!product) {
      return new Response(JSON.stringify(`Producto: ${slug} no encontrado`), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else {
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
