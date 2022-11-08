import React from "react";

function ListItemComponent({ item, deleteProduct }) {
  const IMAGE_URL = "http://localhost:3001/images/";

  return (
    <>
      <tr className="">
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={`${IMAGE_URL}${item.image}`}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap"></p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{new Date(item.createdAt).toDateString()}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.quantity}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
          <p className="text-gray-900 whitespace-no-wrap">{item.price}</p>
        </td>
        <td className="px-5 py-8 border-b border-gray-200 bg-white text-sm  flex gap-2">
          <span
            className="cursor-pointer bg-red-600  rounded-full relative inline-block px-3 py-1 font-semibold text-white leading-tight"
            onClick={() => deleteProduct(item._id)}
          >
            Delete
          </span>
          <span className="cursor-pointer bg-yellow-600  rounded-full relative inline-block px-3 py-1 font-semibold text-white leading-tight">
            Update
          </span>
        </td>
      </tr>
    </>
  );
}

export default ListItemComponent;
