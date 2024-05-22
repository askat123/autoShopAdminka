import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface IProduct {
  productName: string;
  image: string;
  price: string;
  marka: string;
}

function Admin() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState<IProduct>({
    productName: "",
    image: "",
    price: "",
    marka: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const base64Image = event.target?.result as string;
        const compressedImage = await compressImage(base64Image);
        setValue({ ...value, image: compressedImage });
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = base64Image;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width / 2;
        canvas.height = image.height / 2;
        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: keyof IProduct
  ) => {
    setValue({ ...value, [fieldName]: e.target.value });
  };

  const handleAddProduct = async () => {
    dispatch({ type: "ADD_PRODUCT", payload: value });
    try {
      await axios.post(
        "https://664459266c6a6565870a0015.mockapi.io/all",
        value
      );
      console.log("Product added successfully");
      setValue({
        productName: "",
        image: "",
        price: "",
        marka: "",
      });
      nav("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        <input
          onChange={(e) => handleInput(e, "productName")}
          style={{ width: "30%", border: "2px solid gray" }}
          placeholder="Product Name"
          value={value.productName}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ width: "30%", border: "2px solid gray" }}
        />
        <input
          onChange={(e) => handleInput(e, "price")}
          style={{ width: "30%", border: "2px solid gray" }}
          placeholder="Price"
          value={value.price}
        />
        <select
          onChange={(e) => handleInput(e, "marka")}
          style={{ width: "30%", border: "2px solid gray" }}
          value={value.marka}
        >
          <option value="">Выберите марку</option>
          <option value="Mazda">Mazda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Opel">Opel</option>
          <option value="Audi">Audi</option>
          <option value="Ford">Ford</option>
          <option value="Toyota">Toyota</option>
          <option value="Nissan">Nissan</option>
        </select>
        <button onClick={handleAddProduct}>Add new product</button>
      </div>
    </div>
  );
}

export default Admin;
