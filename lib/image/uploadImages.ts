"use server";

export const uploadImagesToCDN = async (file: File): Promise<string> => {
  const cdnApi = `${process.env.CDN_URL}?key=${process.env.CDN_KEY}`;
  console.log(cdnApi);
  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }

  const cdnFormData = new FormData();
  cdnFormData.append("image", file);

  const res = await fetch(cdnApi, {
    method: "POST",
    body: cdnFormData,
  });

  if (!res.ok) {
    return "";
  }

  const imgBBResponse: ImgBBMetadata = await res.json();

  return imgBBResponse.data.image?.url ?? "";
};
