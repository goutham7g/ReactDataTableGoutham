import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useQuery } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CourseAdd = ({ modal, modalEdit, getCourse, toggle, getUpdate }) => {
    const formSchema = yup.object().shape({
        degree: yup.string().required('Please Select your Degree'),
        name: yup.string().required('Please Enter your name'),
        description: yup.string().required('Please Enter description'),
    });

    const { data: Degree = [], refetch: getDegree } = useQuery('degree', async () => {
        const response = await axios.get("http://192.168.1.2:1818/degree");
        return response.data.res;
    });

    const { handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    });

    const OnSubmit = async (data) => {
        console.log(data);
        try {
            if (modalEdit && getUpdate) {
                // Edit degree
                await axios.put(`http://192.168.1.2:1818/course/${getUpdate?._id}`, data);
            } else {
                // Add new degree
                await axios.post('http://192.168.1.2:1818/course', data);
            }
            toggle();
            getCourse();
        } catch (error) {
            console.log(error);
        }
        reset();
    };

    useEffect(() => {
        console.log(modalEdit);
        if (modalEdit) {
            setValue('degree', getUpdate?.degree?._id)
            setValue('name', getUpdate?.name)
            setValue('description', getUpdate?.description)
        }
    }, [getUpdate]);

    return (
        <div>
            <Modal isOpen={modal} toggle={() => {
                toggle()
                reset({
                    degree: '',
                    name: '',
                    description: ''
                })
            }}>
                <ModalHeader toggle={() => {
                    toggle()
                    reset({
                        degree: '',
                        name: '',
                        description: ''
                    })
                }}>{modalEdit ? 'Edit Course' : 'Create Course'}</ModalHeader>
                <Form onSubmit={handleSubmit(OnSubmit)}>
                    <ModalBody>
                        <div className='mb-2'>
                            <Label className='modal-label'>Degree Name<span className='text-danger'>*</span></Label>
                            <Controller
                                name="degree"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select className="form-select form-select-sm" {...field}>
                                        <option value="">--Select a Degree--</option>
                                        {Degree?.map((degree) => (
                                            <option key={degree?._id} value={degree?._id}>{degree?.name}</option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.degree && <FormFeedback>{errors.degree.message}</FormFeedback>}
                        </div>
                        <div className='mb-2 mt-3'>
                            <Label className='modal-label'>Course Name <span className='text-danger'>*</span> </Label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.name && true}
                                        placeholder="Enter Course Name"
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
                                        placeholder="Enter Your Description"
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
                                degree: '',
                                name: '',
                                description: ''
                            })
                        }}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default CourseAdd;




// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form';
// import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import * as yup from "yup";

// const CourseAdd = ({ modal, modalEdit, getCourse, toggle, getUpdate }) => {

//     const formSchema = yup.object().shape({
//         degree: yup.string().required('Please Select your Degree'),
//         name: yup.string().required('Please Enter your name'),
//         description: yup.string().required('Please Enter description'),
//     });

//     const [Degree, setDegree] = useState([]);

//     const getDegree = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/degree");
//             setDegree(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getDegree();

//     }, [])

//     const { handleSubmit, reset, setValue, control, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(formSchema) });

//     const OnSubmit = async (data) => {
//         console.log(data);
//         try {
//             if (modalEdit && getUpdate) {
//                 // Edit degree
//                 await axios.put(`http://192.168.1.2:1818/course/${getUpdate?._id}`, data);
//             } else {
//                 // Add new degree
//                 await axios.post('http://192.168.1.2:1818/course', data);
//             }
//             toggle();
//             getCourse();
//         } catch (error) {
//             console.log(error);
//             // toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
//         }
//         reset();
//     };

//     useEffect(() => {
//         console.log(modalEdit);
//         if (modalEdit) {
//             setValue('degree', getUpdate?.degree?._id)
//             setValue('name', getUpdate?.name)
//             setValue('description', getUpdate?.description)

//         }
//     }, [getUpdate])

//     return (
//         <div>
//             <Modal isOpen={modal} toggle={() => {
//                 toggle()
//                 reset({
//                     degree: '',
//                     name: '',
//                     description: ''
//                 })
//             }}>
//                 <ModalHeader toggle={() => {
//                     toggle()
//                     reset({
//                         degree: '',
//                         name: '',
//                         description: ''
//                     })
//                 }}>{modalEdit ? 'Edit Course' : 'Create Course'}</ModalHeader>
//                 <Form onSubmit={handleSubmit(OnSubmit)}>
//                     <ModalBody>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Degree Name<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="degree"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <select className="form-select form-select-sm" {...field}>
//                                         <option value="">--Select a Degree--</option>
//                                         {Degree?.map((degree) => (
//                                             <option key={degree?._id} value={degree?._id}>{degree?.name}</option>
//                                         ))}
//                                     </select>
//                                 )}
//                             />
//                             {errors.degree && <FormFeedback>{errors.degree.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2 mt-3'>
//                             <Label className='modal-label'>Course Name <span className='text-danger'>*</span> </Label>
//                             <Controller
//                                 name="name"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="text"
//                                         {...field}
//                                         invalid={errors.name && true}
//                                         placeholder="Enter Course Name"
//                                     />
//                                 )}
//                             />
//                             {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Description<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="description"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="text"
//                                         {...field}
//                                         invalid={errors.description && true}
//                                         placeholder="Enter Your Description"
//                                     />
//                                 )}
//                             />
//                             {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
//                         </div>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button type="submit" color="primary">{modalEdit ? 'Update' : 'Add'}</Button>{' '}
//                         <Button color="secondary" onClick={() => {
//                             toggle()
//                             reset({
//                                 degree: '',
//                                 name: '',
//                                 description: ''
//                             })
//                         }}>Cancel</Button>
//                     </ModalFooter>
//                 </Form>
//             </Modal>
//         </div>
//     )
// }

// export default CourseAdd