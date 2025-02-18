import type { APIRoute } from "astro";
import { products } from "../../../data/products.ts";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const { slug } = params;
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
};

export const POST: APIRoute = async ({ request, params }) => {
  const body = await request.json();

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
