"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || '';

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("female");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Load product data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/perfume/${id}`);
      const data = await res.json();
      setName(data.name);
      setBrand(data.brand);
      setCategory(data.category);
      setPrice(Number(data.price));
      setStock(Number(data.stock));
      setDescription(data.description || "");
      setImageUrl(data.image_url);
      setImagePreview(data.image_url);
    };
    if (id) fetchProduct();
  }, [id]);

  // 🖼️ Image select → preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // ✅ Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    formData.append('description', description);
    formData.append('imageUrl', imageUrl); // existing URL

    // Agar nayi image select ki hai
    if (fileInputRef.current?.files?.[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    const res = await fetch(`http://localhost:3000/api/admin/edit-product/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      toast.success('Product updated successfully');
      router.push('/admin-role/products');
    } else {
      const err = await res.json();
      toast.error(`Error: ${err.error || 'Failed to update product'}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="block w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Stock"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}