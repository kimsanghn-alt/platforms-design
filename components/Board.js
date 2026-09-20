"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const CATEGORY = "레이아웃";

function toPost(row) {
  return { ...row, date: row.created_at.slice(0, 10) };
}

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [writing, setWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError("글을 불러오지 못했어요.");
        else setPosts(data.map(toPost));
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const { data, error } = await supabase
      .from("posts")
      .insert({ category: CATEGORY, title: title.trim(), content: content.trim(), author: "익명" })
      .select()
      .single();

    if (error) {
      setError("글을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setError("");
    setPosts([toPost(data), ...posts]);
    setTitle("");
    setContent("");
    setWriting(false);
  }

  return (
    <main className="wrap">
      <header className="header">
        <h1>홍보물 맛집</h1>
        <p>홍보 제작물 디자인을 나누는 곳</p>
      </header>

      <div className="toolbar">
        <span className="count">총 {posts.length}개의 글</span>
        <button className="btn" onClick={() => setWriting(!writing)}>
          {writing ? "닫기" : "✏️ 글쓰기"}
        </button>
      </div>

      {writing && (
        <form className="card form" onSubmit={handleSubmit}>
          <label>
            카테고리
            <input value={CATEGORY} disabled />
          </label>
          <label>
            작성자
            <input value="익명" disabled />
          </label>
          <label>
            제목
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              maxLength={60}
              required
            />
          </label>
          <label>
            내용
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={5}
              maxLength={2000}
              required
            />
          </label>
          <button className="btn" type="submit">
            등록하기
          </button>
        </form>
      )}

      {error && <p className="notice">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="notice">아직 글이 없어요. 첫 글을 남겨 보세요!</p>
      )}

      <ul className="list">
        {posts.map((post) => (
          <li key={post.id} className="card">
            <span className="tag">{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="meta">
              {post.author} · {post.date}
            </div>
          </li>
        ))}
      </ul>

    </main>
  );
}
