'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title_input: string;
  content: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    console.log(data); // Log the response
    setPosts(data);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !titleInput.trim()) return;

    const postData = {
      title_input: titleInput,
      content: input,
    };

    if (editingId !== null) {
      await fetch(`/api/posts/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      });
      setEditingId(null);
    } else {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setInput('');
    setTitleInput('');
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setInput(post.content);
    setTitleInput(post.title);
    setEditingId(post.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Enter post title"
          className="border px-4 py-2 w-full mb-2"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter post content"
          className="border px-4 py-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update Post' : 'Add Post'}
        </button>
      </form>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <span className="block font-semibold me-2">{post.title}</span>
              <span>{post.content}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
