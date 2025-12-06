import React, { useState } from "react";

export default function ItemRegist() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white p-6 sm:p-8 w-full ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">상품 등록</h2>

      {/* 상품명 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품명
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="상품명을 입력하세요"
        />
      </div>

      {/* 카테고리 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          카테고리
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="FOOD">식품</option>
          <option value="ELECTRONIC">전자제품</option>
          <option value="CLOTHES">의류</option>
          <option value="BEAUTY">뷰티</option>
        </select>
      </div>

      {/* 가격 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          가격
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="가격을 입력하세요"
        />
      </div>

      {/* 재고 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          재고 수량
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="재고 수량을 입력하세요"
        />
      </div>

      {/* 상태 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상태
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">판매중</option>
          <option value="OUT">품절</option>
          <option value="DISABLED">비활성</option>
        </select>
      </div>

      {/* 설명 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품 설명
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-32 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="상품에 대한 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품 이미지
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 
                     hover:file:bg-indigo-100 cursor-pointer"
        />
      </div>

      {/* 버튼 */}
      <div className="mt-8 text-right">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
          상품 등록하기
        </button>
      </div>
    </div>
  );
}
