import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, params }) => {
  const product = {
    name: "Polera",
    price: 100,
    description: "Polera de algodon",
    image: "https://via.placeholder.com/150",
    category: "ropa",
    stock: 10,
    isActive: true,
    createdAt: new Date(),
  };
  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
