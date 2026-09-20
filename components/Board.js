"use client";

import { useState } from "react";

const CATEGORY = "레이아웃";

// 데이터베이스 없이 화면에 보여주기 위한 예시 글입니다. (새로고침하면 처음 상태로 돌아옵니다)
const initialPosts = [
  {
    id: 3,
    category: CATEGORY,
    title: "전단지 3단 접지 레이아웃 정리",
    content: "여백을 넉넉히 주고 제목 위치를 왼쪽 위로 고정하니 훨씬 읽기 편해졌어요.",
    author: "익명",
    date: "2026-09-18",
  },
  {
    id: 2,
    category: CATEGORY,
    title: "포스터 그리드 배치 팁",
    content: "12칸 그리드 위에 이미지와 문구를 맞추면 정돈된 느낌이 납니다.",
    author: "익명",
    date: "2026-09-16",
  },
  {
    id: 1,
    category: CATEGORY,
    title: "레트로 명함 레이아웃 공유해요",
    content: "굵은 테두리와 따뜻한 색 조합으로 옛날 인쇄물 느낌을 냈어요.",
    author: "익명",
    date: "2026-09-14",
  },
];

export default function Board() {
  const [posts, setPosts] = useState(initialPosts);
  const [writing, setWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(),
      category: CATEGORY,
      title: title.trim(),
      content: content.trim(),
      author: "익명",
      date: new Date().toISOString().slice(0, 10),
    };
    setPosts([newPost, ...posts]);
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
              required
            />
          </label>
          <button className="btn" type="submit">
            등록하기
          </button>
        </form>
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

      <footer className="footer">
        ※ 지금은 저장 기능이 없어 새로고침하면 새 글이 사라집니다.
      </footer>
    </main>
  );
}
