import React, { useState, useMemo, useCallback } from "react";
import { Rate, message } from "antd";
import { useInfoContext } from "../../context/InfoContext";
import { createComment } from "../../api/commentRequests";
import "./Comment.scss";

const Comments = () => {
  const { comments, isRender, setIsRender } = useInfoContext();
  const [form, setForm] = useState({ fullName: "", comment: "", stars: 0 });
  const [expanded, setExpanded] = useState({});

  const toggleExpand = useCallback((id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedName = form.fullName.trim();
      const trimmedComment = form.comment.trim();

      if (
        trimmedName.length < 3 ||
        trimmedName.length > 50 ||
        trimmedComment.length < 10 ||
        trimmedComment.length > 1000
      ) {
        return message.warning(
          "Iltimos, to‘g‘ri ism (3–50 belgi) va izoh (10–1000 belgi) kiriting."
        );
      }

      try {
        const formData = new FormData();
        formData.append("fullName", trimmedName);
        formData.append("comment", trimmedComment);
        formData.append("stars", form.stars);

        await createComment(formData);
        message.success("Fikringiz yuborildi!");

        setForm({ fullName: "", comment: "", stars: 0 });
        setIsRender(!isRender);
      } catch (err) {
        message.error("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
      }
    },
    [form, isRender, setIsRender]
  );

  // Memoize the comments rendering to prevent re-render if unrelated state changes
  const renderedComments = useMemo(() => {
    return comments?.map((c) => {
      const isLong = c.comment.length > 250;
      const isExpanded = expanded[c._id];
      const shownText = isExpanded ? c.comment : c.comment.slice(0, 250);

      return (
        <div className="comment-card" key={c._id}>
          <div className="top">
            <h4>{c.fullName}</h4>
            <Rate disabled value={c.stars} />
          </div>

          <p>
            {shownText}
            {isLong && (
              <span
                className="see-more"
                onClick={() => toggleExpand(c._id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') toggleExpand(c._id); }}
              >
                {isExpanded ? "Yopish" : "Ko‘proq ko‘rish"}
              </span>
            )}
          </p>

          <small>
            {new Date(c.createdAt).toLocaleDateString("uz-UZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        </div>
      );
    });
  }, [comments, expanded, toggleExpand]);

  return (
    <div className="comments-page">
      <h1>Fikr va Mulohazalar</h1>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Ismingiz"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
        <textarea
          placeholder="Fikringiz..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          minLength={10}
          maxLength={1000}
          required
        />
        <Rate
          allowHalf
          value={form.stars}
          onChange={(val) => setForm({ ...form, stars: val })}
        />
        <button type="submit">Yuborish</button>
      </form>

      <div className="comments-list">{renderedComments}</div>
    </div>
  );
};

export default React.memo(Comments);