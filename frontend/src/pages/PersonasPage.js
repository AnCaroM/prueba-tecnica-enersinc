import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Card, Popconfirm, notification, Tooltip } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonas, deletePersona } from '../redux/personasSlice';
import PersonaForm from '../components/PersonaForm';

import logoEnersinc from '../assets/logo.jpg';

const TIPO_DOC_MAP = {
    'CC': 'Cédula de Ciudadanía',
    'TI': 'Tarjeta de Identidad',
    'CE': 'Cédula de Extranjería',
    'PAS': 'Pasaporte',
};

const PersonasPage = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.personas);

    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPersona, setEditingPersona] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPersonas());
        }
        setLoading(status === 'loading');
    }, [status, dispatch]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deletePersona(id)).unwrap();
            notification.success({ message: 'Persona eliminada' });
        } catch (error) {
            notification.error({ message: 'Error al eliminar' });
        }
    };

    const openCreateModal = () => {
        setEditingPersona(null);
        setIsModalVisible(true);
    };

    const openEditModal = (persona) => {
        setEditingPersona(persona);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingPersona(null);
    };

    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'tipo_documento',
            key: 'tipo_documento',
            width: 120,
            render: (text) => TIPO_DOC_MAP[text] || text,
        },
        {
            title: 'Documento',
            dataIndex: 'documento',
            key: 'documento',
            width: 120,
        },
        {
            title: 'Nombres',
            dataIndex: 'nombres',
            key: 'nombres',
            width: 120,
            sorter: (a, b) => a.nombres.localeCompare(b.nombres),
        },
        {
            title: 'Apellidos',
            dataIndex: 'apellidos',
            key: 'apellidos',
            width: 120,
            sorter: (a, b) => a.apellidos.localeCompare(b.apellidos),
        },
        {
            title: 'Hobbie',
            dataIndex: 'hobbie',
            key: 'hobbie',
            width: 100,
        },
        {
            title: 'Acciones',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => openEditModal(record)} />
                    </Tooltip>
                    <Popconfirm title="¿Eliminar?" onConfirm={() => handleDelete(record.id)} okText="Sí" cancelText="No">
                        <Button danger shape="circle" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>

            {/*NAVBAR*/}
            <div style={{
                background: '#ffffff',
                padding: '20px 20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
            }}>
                <img
                    src={logoEnersinc}
                    alt="Enersinc Logo"
                    style={{ height: '40px', display: 'block' }}
                />
            </div>

            {/*CONTENIDO PRINCIPAL (Tabla)*/}
            <div style={{ padding: '0 20px', maxWidth: 1200, margin: '0 auto' }}>
                <Card
                    title="Directorio de Personas"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={openCreateModal}
                            style={{ background: '#1890ff', borderColor: '#1890ff' }}
                        >
                            Nueva Persona
                        </Button>
                    }
                >
                    <div style={{ marginBottom: 16, textAlign: 'right' }}>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => dispatch(fetchPersonas())}
                        >
                            Recargar Lista
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 600 }}
                    />

                    <PersonaForm
                        visible={isModalVisible}
                        onCancel={closeModal}
                        currentPersona={editingPersona}
                    />
                </Card>
            </div>
        </div>
    );
};

export default PersonasPage;