import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as yup from "yup";

const RoleAdd = ({ modal, modalEdit, getRole, toggle, getUpdate }) => {

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter your name'),
        description: yup.string().required('Please Enter description'),
    });

    const { handleSubmit, reset, setValue, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

    const OnSubmit = async (data) => {
        console.log(data);
        try {
            if (modalEdit && getUpdate) {
                // Edit degree
                await axios.put(`http://192.168.1.2:1818/role/${getUpdate?._id}`, data);
            } else {
                // Add new degree
                await axios.post('http://192.168.1.2:1818/role', data);
            }
            toggle();
            getRole();
        } catch (error) {
            console.log(error);
            // toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
        }
        reset();
    };

    useEffect(() => {
        if (modalEdit) {
            setValue('name', getUpdate?.name)
            setValue('description', getUpdate?.description)

        }
    }, [getUpdate])



    return (
        <div>
            <Modal isOpen={modal} toggle={() => {
                toggle()
                reset({
                    name: '',
                    description: ''
                })
            }}>
                <ModalHeader toggle={() => {
                    toggle()
                    reset({
                        name: '',
                        description: ''
                    })
                }}>{modalEdit ? 'Edit Role' : 'Create Role'}</ModalHeader>
                <Form onSubmit={handleSubmit(OnSubmit)}>
                    <ModalBody>
                        <div className='mb-2 mt-3'>
                            <Label className='modal-label'>Name <span className='text-danger'>*</span> </Label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.name && true}
                                        placeholder="Enter your Name"
                                    />
                                )}
                            />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Description<span className='text-danger'>*</span></Label>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.description && true}
                                        placeholder="Enter Your email"
                                    />
                                )}
                            />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">{modalEdit ? 'Update' : 'Add'}</Button>{' '}
                        <Button color="secondary" onClick={() => {
                            toggle()
                            reset({
                                name: '',
                                description: ''
                            })
                        }}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>

        </div>
    )
}

export default RoleAdd

