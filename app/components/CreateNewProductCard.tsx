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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct } from "@/lib/core/product/productAction";
import {
  searchByItemCode,
  searchBySku,
} from "@/lib/core/product/productValidators";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const CreateNewProductCard = () => {
  const [stage, setStage] = useState("product");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<ProductCategory>("NONE");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "checking" | "valid" | "invalid"
  >("idle");

  const [itemCode, setItemCode] = useState("");
  const [stock, setStock] = useState("");
  const [fileKey, setFileKey] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imageMap, setImages] = useState<Map<number, File>>(new Map());
  const [items, setItems] = useState<ItemDetails[]>([]);

  const itemHandler = (itemCode: number, stock: number, image: File) => {
    if (validationStatus !== "valid") {
      toast.error("Validate item code before add.");
      return;
    }
    const item: ItemDetails = {
      item_code: itemCode,
      in_stock: stock,
      image_url: image.name,
    };
    setImages((prev) => {
      if (prev.has(itemCode)) {
        toast.error("Item code already exists");
        return prev;
      }
      const next = new Map(prev);
      next.set(itemCode, image);
      return next;
    });
    setItems((items) => [...items, item]);
    setItemCode("");
    setStock("");
    setFileKey((k) => k + 1);
    setValidationStatus("idle");
  };

  const onNextClickHandler = (stage: string) => {
    if (stage === "items") {
      if (
        title === "" ||
        brand === "" ||
        category === "NONE" ||
        sku === "" ||
        description === "" ||
        price === "" ||
        validationStatus !== "valid"
      ) {
        toast.error("All product fields are required");
        return;
      }
    }
    if (stage === "summary") {
      if (items.length === 0) {
        toast.error("Add at least one item to proceed");
        return;
      }
    }
    setValidationStatus("idle");
    setStage(stage);
  };

  const onStateReset = () => {
    setTitle("");
    setBrand("");
    setCategory("NONE");
    setSku("");
    setDescription("");
    setPrice("");
    setItems([]);
    setImages(new Map());
    setStage("product");
    setValidationStatus("idle");
  };

  const onCancelHandler = () => {
    onStateReset();
  };

  const onValidationCheck = async (type: string) => {
    setValidationStatus("checking");
    let validatedProductBySku: ProductDetails = {} as ProductDetails;
    if (type === "sku") {
      validatedProductBySku = await searchBySku(
        `${category.substring(0, 3)}-${sku}`
      );
    }
    if (type === "itemCode") {
      for (const item of items) {
        if (item.item_code === parseInt(itemCode)) {
          setValidationStatus("invalid");
          return;
        }
      }
      validatedProductBySku = await searchByItemCode(parseInt(itemCode, 10));
    }
    setValidationStatus(
      validatedProductBySku.product?.id ? "invalid" : "valid"
    );
  };

  const onSubmitHandler = async () => {
    const productWithItems: Product & { items: ItemDetails[] } = {
      title,
      brand,
      category,
      sku: `${category.substring(0, 3)}-${sku}`,
      description,
      price: parseFloat(price),
      items: items,
    };
    const status = await createProduct(productWithItems, imageMap);
    if (status) {
      toast.success("Product created successfully");
    } else {
      toast.error("Failed to create product");
    }
    onStateReset();
  };

  return (
    <div className="w-full max-w-2xl p-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
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
                    value={title}
                    maxLength={24}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Brand</FieldLabel>
                  <Input
                    id="brand"
                    placeholder="VA Collection"
                    required
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                    maxLength={24}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Category</FieldLabel>
                  <Select
                    defaultValue={category}
                    onValueChange={(e) => setCategory(e as ProductCategory)}
                  >
                    <SelectTrigger id="cat">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EARRING">EARRING</SelectItem>
                      <SelectItem value="RING">RING</SelectItem>
                      <SelectItem value="NECKLACE">NECKLACE</SelectItem>
                      <SelectItem value="BRACELET">BRACELET</SelectItem>
                      <SelectItem value="PENDANT">PENDANT</SelectItem>
                      <SelectItem value="SETS">SETS</SelectItem>
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <div className="flex flex-row items-center">
                    <FieldLabel htmlFor="string">
                      Stock Keeping Unit (SKU)
                    </FieldLabel>
                    <p
                      className={cn(
                        "ml-2 text-sm font-semibold transition-opacity",
                        validationStatus === "valid"
                          ? "text-green-500 opacity-100"
                          : validationStatus === "invalid"
                          ? "text-red-500 opacity-100"
                          : "opacity-0"
                      )}
                    >
                      {validationStatus === "valid"
                        ? "SKU is available!"
                        : "SKU is already in use!"}
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id="sku"
                      placeholder="XXXXX"
                      required
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) {
                          setSku(val);
                        }
                        setValidationStatus("idle");
                      }}
                      value={sku}
                      maxLength={12}
                    />
                    <Button
                      disabled={!sku || validationStatus === "checking"}
                      variant={"outline"}
                      onClick={() => onValidationCheck("sku")}
                      type="button"
                    >
                      Check
                    </Button>
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Description</FieldLabel>
                  <Input
                    id="description"
                    placeholder="Brief description of the product"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    maxLength={64}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="string">Price</FieldLabel>
                  <Input
                    inputMode="decimal"
                    pattern="^\d*\.?\d*$"
                    id="price"
                    placeholder="100.00"
                    required
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(val)) {
                        setPrice(e.target.value);
                      }
                    }}
                    value={price}
                  />
                </Field>
                <div className="flex flex-row justify-end">
                  <Button
                    type="button"
                    onClick={() => onNextClickHandler("items")}
                  >
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
                <div className="flex flex-row items-center">
                  <FieldLabel htmlFor="string">Item Code</FieldLabel>
                  <p
                    className={cn(
                      "ml-2 text-sm font-semibold transition-opacity",
                      validationStatus === "valid"
                        ? "text-green-500 opacity-100"
                        : validationStatus === "invalid"
                        ? "text-red-500 opacity-100"
                        : "opacity-0"
                    )}
                  >
                    {validationStatus === "valid"
                      ? "Item Code is available!"
                      : "Item Code is already in use!"}
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <Input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="item_code"
                    placeholder="XXXX"
                    required
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setItemCode(e.target.value);
                      }
                      setValidationStatus("idle");
                    }}
                    value={itemCode}
                    maxLength={10}
                  />
                  <Button
                    disabled={!itemCode || validationStatus === "checking"}
                    variant={"outline"}
                    onClick={() => onValidationCheck("itemCode")}
                    type="button"
                  >
                    Check
                  </Button>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="string">In Stock</FieldLabel>
                <Input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="in_stock"
                  placeholder="Number of items available"
                  required
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setStock(val);
                    }
                  }}
                  value={stock}
                  maxLength={6}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="string">Upload Image</FieldLabel>
                <Input
                  key={fileKey}
                  id="img"
                  placeholder=""
                  required
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                      return;
                    }
                    setImage(file);
                  }}
                />
              </Field>
              <Field>
                {items.length > 0 && (
                  <ItemTable
                    headers={["Item Code", "In Stock", "Image"]}
                    items={items}
                  />
                )}
              </Field>
              <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setValidationStatus("idle");
                    setStage("product");
                  }}
                >
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (!itemCode || !stock || !image) {
                        toast.error("All item fields are required");
                        return;
                      }
                      itemHandler(
                        parseInt(itemCode, 10),
                        parseInt(stock, 10),
                        image as File
                      );
                    }}
                  >
                    Add Item
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onNextClickHandler("summary")}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </FieldSet>
          )}
          {stage === "summary" && (
            <div>
              <p>Product Create Summary</p>
              <FieldSeparator className="my-2" />
              <div className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm">
                  <span className="col-span-1 font-medium text-zinc-600">
                    Title
                  </span>
                  <span className="col-span-2 text-zinc-900">{title}</span>

                  <span className="col-span-1 font-medium text-zinc-600">
                    Brand
                  </span>
                  <span className="col-span-2 text-zinc-900">{brand}</span>

                  <span className="col-span-1 font-medium text-zinc-600">
                    Category
                  </span>
                  <span className="col-span-2 text-zinc-900">{category}</span>

                  <span className="col-span-1 font-medium text-zinc-600">
                    Stock Keeping Unit
                  </span>
                  <span className="col-span-2 font-mono text-zinc-900">
                    {`${category.substring(0, 3)}-${sku}`}
                  </span>

                  <span className="col-span-1 font-medium text-zinc-600">
                    Description
                  </span>
                  <span className="col-span-2 text-zinc-900">
                    {description}
                  </span>

                  <span className="col-span-1 font-medium text-zinc-600">
                    Price
                  </span>
                  <span className="col-span-2 text-zinc-900">{price}</span>
                </div>
              </div>
              <FieldSeparator className="my-2" />
              {items.length > 0 && (
                <ItemTable
                  headers={["Item Code", "In Stock", "Image"]}
                  items={items}
                />
              )}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStage("items")}
                >
                  Back
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onCancelHandler}
                  >
                    Cancel
                  </Button>

                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </div>
          )}
        </FieldGroup>
      </form>
    </div>
  );
};

interface ItemTableProps {
  headers: Array<string>;
  items: Array<ItemDetails>;
}

const ItemTable = ({ headers, items }: ItemTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-medium text-zinc-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.item_code}
              className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-zinc-900">
                {item.item_code}
              </td>
              <td className="px-4 py-3 text-zinc-700">{item.in_stock}</td>
              <td className="px-4 py-3 text-zinc-500 truncate max-w-50">
                {item.image_url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateNewProductCard;
