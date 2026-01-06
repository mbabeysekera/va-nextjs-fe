export const searchBySku = async (sku: string): Promise<ProductDetails> => {
  const skuAPI = `/api/product/get/sku/${sku}`;
  const res = await fetch(skuAPI, {
    method: "GET",
    cache: "no-store",
  });
  const resStatus = res.ok;
  if (!resStatus) {
    return {} as ProductDetails;
  }
  const productWithItems: ProductDetails = await res.json();
  return productWithItems;
};
