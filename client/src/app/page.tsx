'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { Table, Button, Space, Card, Typography, Tag, message, Popconfirm, Modal, Form, Input, InputNumber } from 'antd';
import { ReloadOutlined, PlusOutlined, DeleteOutlined, EditOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

export default function Home() {
  const { productsQuery, deleteMutation, createMutation, updateMutation } = useProducts();
  
  // Quản lý trạng thái Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // Mở Modal để Thêm mới
  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Mở Modal để Chỉnh sửa
  const showEditModal = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product); // Đổ dữ liệu cũ vào form
    setIsModalOpen(true);
  };

  // Xử lý khi nhấn OK trong Form
  const handleFormFinish = async (values: any) => {
    try {
      if (editingProduct) {
        // Cập nhật
        await updateMutation.mutateAsync({ id: editingProduct.id, product: values });
        message.success('Cập nhật sản phẩm thành công!');
      } else {
        // Thêm mới
        await createMutation.mutateAsync(values);
        message.success('Thêm sản phẩm mới thành công!');
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error('Thao tác thất bại, vui lòng thử lại.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      message.success('Đã xóa sản phẩm thành công!');
    } catch (error) {
      message.error('Xóa sản phẩm thất bại.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 70 },
    { 
      title: 'Tên sản phẩm', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text: string) => <Text strong>{text}</Text> 
    },
    { 
      title: 'Danh mục', 
      dataIndex: 'category', 
      key: 'category', 
      render: (cat: string) => <Tag color="blue">{cat || 'N/A'}</Tag> 
    },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price', 
      render: (price: number) => <Text type="success">{price?.toLocaleString()} VNĐ</Text> 
    },
    { title: 'Tồn kho', dataIndex: 'stockQuantity', key: 'stockQuantity' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => showEditModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger type="link">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <Card className="shadow-lg border-0 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2} className="m-0 flex items-center gap-2">
              <ThunderboltOutlined className="text-amber-500" /> Quản lý Sản phẩm (Redis)
            </Title>
            <Text type="secondary">Next.js + .NET Core + Redis Caching</Text>
          </div>
          <Space>
            <Button onClick={() => productsQuery.refetch()} icon={<ReloadOutlined />} loading={productsQuery.isFetching}>
              Làm mới
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
              Thêm mới
            </Button>
          </Space>
        </div>

        <Table 
          dataSource={productsQuery.data} 
          columns={columns} 
          rowKey="id" 
          loading={productsQuery.isLoading} 
          className="bg-white rounded-md"
        />
      </Card>

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleFormFinish} className="mt-4">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input placeholder="Ví dụ: iPhone 15 Pro" />
          </Form.Item>
          
          <Form.Item name="category" label="Danh mục">
            <Input placeholder="Ví dụ: Mobile, Laptop..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
              <InputNumber className="w-full" min={0} formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Form.Item>

            <Form.Item name="stockQuantity" label="Số lượng tồn" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
              <InputNumber className="w-full" min={0} />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} placeholder="Mô tả chi tiết sản phẩm..." />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
