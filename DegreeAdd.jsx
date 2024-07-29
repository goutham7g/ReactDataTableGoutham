import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const DegreeAdd = ({ modal, toggle, getDegree, editMode, degreeToEdit }) => {

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter your name'),
        description: yup.string().required('Please Enter description'),
    });

    const { handleSubmit, reset, setValue, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });


    const OnSubmit = async (data) => {
        console.log(data);
        try {
            if (editMode && degreeToEdit) {
                // Edit degree
                await axios.put(`http://192.168.1.2:1818/degree/${degreeToEdit._id}`, data);
            } else {
                // Add new degree
                await axios.post('http://192.168.1.2:1818/degree', data);
            }
            toggle();
            getDegree();
        } catch (error) {
            console.log(error);
            // toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
        }
        reset();
    };

    useEffect(() => {
        if (editMode) {
            setValue('name', degreeToEdit?.name)
            setValue('description', degreeToEdit?.description)

        }
    }, [degreeToEdit])

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
                }}>{editMode ? 'Edit Degree' : 'Create Degree'}</ModalHeader>
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
                        <Button type="submit" color="primary">{editMode ? 'Update' : 'Add'}</Button>{' '}
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

export default DegreeAdd