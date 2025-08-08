import React from "react";
import { Table, Popconfirm, Button, Spin, Rate, message, Tooltip } from "antd";
import { useInfoContext } from "../../../context/InfoContext";
import { deleteComment } from "../../../api/commentRequests";
import "./CommentDashboard.scss";

const CommentDashboard = () => {
  const { comments, loading, setIsRender, isRender } = useInfoContext();

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      message.success("Fikr o'chirildi");
      setIsRender(!isRender); // refresh data
    } catch (error) {
      message.error("Xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "F.I.Sh",
      dataIndex: "fullName",
      key: "fullName",
      render: (name) => <span className="user-name">{name}</span>,
    },

    {
      title: "Fikr",
      dataIndex: "comment",
      key: "comment",
      render: (text) => {
        const shortText = text.length > 80 ? text.slice(0, 80) + "..." : text;
        return (
          <Tooltip title={text}>
            <span className="comment-text">{shortText}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "Bahosi",
      dataIndex: "stars",
      key: "stars",
      render: (stars) =>
        stars > 0 ? <Rate disabled defaultValue={stars} /> : "—",
    },
    {
      title: "Qo‘shilgan sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleString("uz-UZ", { hour12: false }),
    },
    {
      title: "Amallar",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Rostdan ham o‘chirmoqchimisiz?"
          onConfirm={() => handleDelete(record._id)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button danger type="primary">
            O‘chirish
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="comments-dashboard">
      <h2 className="page-title">Barcha Fikrlar</h2>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <div className="table-scroll">
          <Table
            columns={columns}
            dataSource={comments}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
            className="comments-table"
          />
        </div>
      )}
    </div>
  );
};

export default CommentDashboard;
