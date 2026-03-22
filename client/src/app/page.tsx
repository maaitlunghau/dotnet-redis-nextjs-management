'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { Table, Button, Space, Card, Typography, Tag, message, Popconfirm } from 'antd';
import { ReloadOutlined, PlusOutlined, DeleteOutlined, EditOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';

const { Title, Text } = Typography;

export default function Home() {
  const { productsQuery, deleteMutation } = useProducts();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    productsQuery.refetch();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      message.success('Đã xóa sản phẩm thành công!');
    } catch (error) {
      message.error('Xóa sản phẩm thất bại.');
    }
  };

  // Cấu hình cột cho Table Ant Design
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag color="blue">{cat || 'N/A'}</Tag>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Text type="success">{price.toLocaleString('vi-VN')} {price <= 1000 ? '$' : 'VNĐ'}</Text>
      ),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link">Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
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
              <ThunderboltOutlined className="text-amber-500" />
              Quản lý Sản phẩm (Redis Cache)
            </Title>
            <Text type="secondary">Thực hành Next.js + .NET Core + MySQL + Redis</Text>
          </div>
          <Space>
            <Button 
                onClick={handleRefresh} 
                icon={<ReloadOutlined />} 
                loading={productsQuery.isFetching}
            >
              Làm mới (Check Cache)
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </Space>
        </div>

        {/* Thông tin về trạng thái Cache */}
        <div className="mb-4 bg-white p-4 rounded-lg border flex gap-4 items-center">
            <Tag color={productsQuery.isFetching ? 'processing' : 'success'}>
                Trạng thái API: {productsQuery.isFetching ? 'Đang gọi...' : 'Sẵn sàng'}
            </Tag>
            <Text italic type="secondary">
                Mẹo: Hãy quan sát Network Tab (F12) để xem tốc độ của Redis (Lần đầu chậm, các lần sau cực nhanh).
            </Text>
        </div>

        <Table 
          dataSource={productsQuery.data} 
          columns={columns} 
          rowKey="id" 
          loading={productsQuery.isLoading}
          pagination={{ pageSize: 5 }}
          className="bg-white rounded-md shadow-sm"
        />
      </Card>
      
      {/* Devtools Hint */}
      <div className="mt-8 text-center">
        <Text disabled>Mở TanStack Query Devtools (góc dưới trái) để xem trạng thái Cache tại Frontend</Text>
      </div>
    </main>
  );
}
