import React, { useEffect, useState } from "react";
import ListItemComponent from "./ListItemComponent";
import axios from "axios";
import { useRef } from "react";

function ListingComponent() {
  const URL = "http://localhost:3001/product";
  const inputFileRef = useRef();

  const initialProductState = {
    name: "",
    image: "",
    quantity: "",
    price: "",
    imageName: "",
  };

  const fetchProduct = () => {
    axios
      .get(URL)
      .then((response) => {
        if (response.status == 200 && response.data) {
          setfetchedData(response.data.data);
        }
      })
      .catch(function (error) {
        setfetchedData([]);
      });
  };

  const deleteProduct = (id) => {
    axios({
      method: "DELETE",
      url: URL,
      data: { id: id },
    })
      .then(function (response) {
        fetchProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [product, setProduct] = useState(initialProductState);
  const [fetchedData, setfetchedData] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("price", product.price);
    axios({ 
      method: "POST",
      url: URL,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then(function (response) {
        setProduct(initialProductState);
        inputFileRef.current.value = ""
        fetchProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="p-5 flex gap-4 items-start">
          <input
            value={product.name}
            type="text"
            className="outline-1 outline-gray-900 border-gray-700 border rounded p-2"
            placeholder="Product Name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <input
            value={product.quantity}
            type="number"
            className="outline-1 outline-gray-900 border-gray-700 border rounded p-2"
            placeholder="Quantity"
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            required
            min="0"
          />
          <input
            value={product.price}
            type="number"
            className="outline-1 outline-gray-900 border-gray-700 border rounded p-2"
            placeholder="Price"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
            min="0"
          />
          <div className="flex ml-4 flex-col gap-2">
            <span>Product Image</span>
            <input
              type="file"
              name="image"
              id="imageFile"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files[0] })
              }
              required
              ref={inputFileRef}
            />
          </div>
          <button
            type="submit"
            className="rounded bg-gray-800 text-white font-bold px-4 py-2 hover:bg-gray-500 "
          >
            Add Item
          </button>
        </div>
      </form>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item, index) => (
                <ListItemComponent
                  item={item}
                  deleteProduct={(id) => deleteProduct(id)}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListingComponent;
