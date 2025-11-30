import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addPersona, updatePersona } from '../redux/personasSlice';

const { Option } = Select;

const PersonaForm = ({ visible, onCancel, currentPersona }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (visible) {
            if (currentPersona) {
                form.setFieldsValue(currentPersona);
            } else {
                form.resetFields();
            }
        }
    }, [visible, currentPersona, form]);

    const onFinish = async (values) => {
        try {
            if (currentPersona) {
                await dispatch(updatePersona({ id: currentPersona.id, ...values })).unwrap();
                notification.success({ message: 'Persona actualizada correctamente' });
            } else {
                await dispatch(addPersona(values)).unwrap();
                notification.success({ message: 'Persona creada correctamente' });
            }
            onCancel();
            form.resetFields();
        } catch (error) {
            notification.error({
                message: 'Error al guardar',
                description: 'Verifica los datos e inténtalo de nuevo.'
            });
        }
    };

    return (
        <Modal
            title={currentPersona ? "Editar Persona" : "Agregar Nueva Persona"}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="tipo_documento"
                    label="Tipo de Documento"
                    rules={[{ required: true, message: 'Selecciona un tipo' }]}
                >
                    <Select placeholder="Selecciona una opción">
                        <Option value="CC">Cédula de Ciudadanía</Option>
                        <Option value="TI">Tarjeta de Identidad</Option>
                        <Option value="CE">Cédula de Extranjería</Option>
                        <Option value="PAS">Pasaporte</Option>
                    </Select>
                </Form.Item>

                {/* --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE --- */}
                <Form.Item
                    name="documento"
                    label="Número de Documento"
                    dependencies={['tipo_documento']} // 1. Vigila el campo anterior
                    hasFeedback // Muestra un check verde si está bien
                    rules={[
                        { required: true, message: 'Ingresa el documento' },
                        // 2. Regla dinámica
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) return Promise.resolve();

                                const tipo = getFieldValue('tipo_documento');

                                // Si NO es Pasaporte (PAS) y el valor NO son solo números...
                                if (tipo !== 'PAS' && !/^[0-9]+$/.test(value)) {
                                    return Promise.reject(new Error('Para este documento solo se permiten números'));
                                }

                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Ej: 123456789" />
                </Form.Item>
                {/* -------------------------------------- */}

                <Form.Item
                    name="nombres"
                    label="Nombres"
                    rules={[{ required: true, message: 'Ingresa los nombres' }]}
                >
                    <Input placeholder="Ej: Pepito" />
                </Form.Item>

                <Form.Item
                    name="apellidos"
                    label="Apellidos"
                    rules={[{ required: true, message: 'Ingresa los apellidos' }]}
                >
                    <Input placeholder="Ej: Pérez" />
                </Form.Item>

                <Form.Item
                    name="hobbie"
                    label="Hobbie"
                    rules={[{ required: true, message: 'Ingresa un hobbie' }]}
                >
                    <Input.TextArea rows={2} placeholder="Ej: Programar en Python" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        {currentPersona ? "Actualizar" : "Guardar"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PersonaForm;