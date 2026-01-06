export const createProduct = async (
  product: ProductWithItems,
  images: File[]
): Promise<boolean> => {
  let imageCount = 0;
  for (const file of images) {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        return false;
      }
      const data: { url: string } = await res.json();
      product.items[imageCount].image_url = data.url;
      imageCount++;
    } else {
      return false;
    }
  }
  const res = await fetch("/api/product/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    return false;
  }

  return true;
};
