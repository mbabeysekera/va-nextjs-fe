"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreateNewProductCard = () => {
  const [stage, setStage] = useState("product");
  // const productToBeCreated: ProductDetails = {};
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [itemCode, setItemCode] = useState("");
  const [stock, setStock] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [items, setItems] = useState<ItemDetails[]>([]);

  const itemHandler = (itemCode: number, stock: number, imageURL: string) => {
    const item: ItemDetails = {
      item_code: itemCode,
      in_stock: stock,
      image_url: imageURL,
    };
    setItems((items) => [...items, item]);
    setItemCode("");
    setStock("");
    setImageURL("");
  };

  return (
    <div className="w-full max-w-2xl p-0">
      <form>
        <FieldGroup>
          {stage === "product" && (
            <FieldSet>
              <FieldLegend>Product Details</FieldLegend>
              <FieldDescription>
                All mandatory(*) product details must be added to be able to
                create a new product in the system
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="string">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Product Name"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Brand</FieldLabel>
                  <Input
                    id="brand"
                    placeholder="VA Collection"
                    required
                    onChange={(e) => setBrand(e.target.value)}
                    defaultValue={brand}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Category</FieldLabel>
                  <Input
                    id="category"
                    placeholder="VA Collection"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={category}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Stock Keeping Unit</FieldLabel>
                  <Input
                    id="sku"
                    placeholder="CAT-000001"
                    required
                    onChange={(e) => setSku(e.target.value)}
                    defaultValue={sku}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Description</FieldLabel>
                  <Input
                    id="description"
                    placeholder="Brief description of the product"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Price</FieldLabel>
                  <Input
                    id="price"
                    placeholder="100.00"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    defaultValue={price}
                  />
                </Field>
                <div className="flex flex-row justify-end">
                  <Button type="button" onClick={() => setStage("items")}>
                    Next
                  </Button>
                </div>
              </FieldGroup>
            </FieldSet>
          )}
          {stage === "items" && (
            <FieldSet>
              <FieldLegend>Item Details</FieldLegend>
              <FieldDescription>
                Add each item with all the required details.
              </FieldDescription>
              <Field>
                <FieldLabel htmlFor="string">Item Code</FieldLabel>
                <Input
                  id="item_code"
                  placeholder="XXXX"
                  required
                  onChange={(e) => setItemCode(e.target.value)}
                  value={itemCode}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="string">In Stock</FieldLabel>
                <Input
                  id="in_stock"
                  placeholder="Number of items available"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="string">Upload Image</FieldLabel>
                <Input
                  id="img"
                  placeholder=""
                  required
                  type="file"
                  onChange={(e) => setImageURL(e.target.value)}
                  value={imageURL}
                />
              </Field>
              <Field>
                {items.length > 0 && (
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="text-left">Item Code</th>
                        <th className="text-left">In Stock</th>
                        <th className="text-left">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.item_code}
                          className="border-b-2 border-zinc-300"
                        >
                          <td>{item.item_code}</td>
                          <td>{item.in_stock}</td>
                          <td>{item.image_url}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Field>
              <div className="flex flex-row justify-between">
                <Button type="button" onClick={() => setStage("product")}>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    itemHandler(
                      parseInt(itemCode, 10),
                      parseInt(stock, 10),
                      imageURL
                    )
                  }
                >
                  Add Item
                </Button>
                <Button type="button" onClick={() => setStage("summary")}>
                  Next
                </Button>
              </div>
            </FieldSet>
          )}
          {/* <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field> */}
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateNewProductCard;
