import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message } from "antd";
import { getAllOrders, deleteOrder } from "../../../api/orderRequests";
import "./Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isRender, setIsRender] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isRender]);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      message.success("Buyurtma o'chirildi");
      setIsRender(!isRender); // Re-fetch using context
    } catch (error) {
      message.error("Xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "F.I.Sh",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "To‘plam",
      key: "packageDetails",
      render: (_, record) => {
        const companyName = record.package?.company?.name || "—";
        const price = record.package?.price ? `${record.package.price}$` : "—";
        return `${companyName} - ${price}`;
      },
    },
    {
      title: "Yolovchilar soni",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Buyurtma sanasi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Amallar",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Popconfirm
            title="Rostdan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(record._id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button type="link" className="delete-button">
              O'chirish
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
   <div className="orders-table">
  <h2>Barcha buyurtmalar</h2>
  <div className="table-scroll">
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
    />
  </div>
</div>
  );
};

export default Orders;
