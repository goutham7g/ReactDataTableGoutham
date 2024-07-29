import React, { useEffect } from 'react';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { useQuery } from 'react-query';

const UserAdd = ({ modal, toggle, getUser }) => {
    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter your name'),
        age: yup.string().required('Please Enter your age'),
        email: yup.string().email().required('Please Enter your Email'),
        mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Please Enter your mobile number'),
        role: yup.string().required('Please Select your degree'),
        qualification: yup.object().shape({
            degree: yup.string().required('Please Select your degree'),
            course: yup.string().required('Please Select your course'),
        })
    })

    const { handleSubmit, reset, watch, control, formState: { errors } } = useForm({
        mode: 'onChange', resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            age: "",
            email: "",
            mobile: "",
            role: "",
            qualification: {
                degree: "",
                course: ""
            }
        }
    });

    // React Query hooks for fetching data
    const { data: Degree, isLoading: isDegreeLoading, error: degreeError } = useQuery('degrees', async () => {
        const response = await axios.get("http://192.168.1.2:1818/degree");
        return response.data.res;
    });

    const { data: Role, isLoading: isRoleLoading, error: roleError } = useQuery('roles', async () => {
        const response = await axios.get("http://192.168.1.2:1818/role");
        return response.data.res;
    });

    const { data: Course, isLoading: isCourseLoading, error: courseError } = useQuery(['courses', watch('qualification.degree')], async () => {
        if (watch('qualification.degree')) {
            const response = await axios.get(`http://192.168.1.2:1818/course/?degree=${watch('qualification.degree')}`);
            return response.data.res;
        }
        return [];
    });

    const OnSubmit = async (data) => {
        try {
            await axios.post('http://192.168.1.2:1818/user', data);
            toggle();
            getUser();
        } catch (error) {
            console.log(error);
            // toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
        }
        reset();
    };

    // useEffect(() => {
    //     // Fetch degree and role data on component mount
    //     Degree && setDegree(Degree);
    //     Role && setRole(Role);
    // }, [Degree, Role]);

    // Watch for changes in degree selection and update course list accordingly
    // const watchDegree = watch("qualification.degree");
    // useEffect(() => {
    //     if (Course) {
    //         setCourse(Course);
    //     }
    // }, [Course]);

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create User</ModalHeader>
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
                            <Label className='modal-label'>Email<span className='text-danger'>*</span></Label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        {...field}
                                        invalid={errors.email && true}
                                        placeholder="Enter Your email"
                                    />
                                )}
                            />
                            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Age<span className='text-danger'>*</span></Label>
                            <Controller
                                name="age"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.age && true}
                                        placeholder="Enter Your age"
                                    />
                                )}
                            />
                            {errors.age && <FormFeedback>{errors.age.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Mobile Number<span className='text-danger'>*</span></Label>
                            <Controller
                                name="mobile"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        {...field}
                                        invalid={errors.mobile && true}
                                        placeholder="Enter Your mobile number"
                                    />
                                )}
                            />
                            {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Role<span className='text-danger'>*</span></Label>
                            <Controller
                                name="role"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select className="form-select form-select-sm" {...field}>
                                        <option value="">--Select a Role--</option>
                                        {Role?.map((role) => (
                                            <option key={role._id} value={role._id}>{role.name}</option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Degree<span className='text-danger'>*</span></Label>
                            <Controller
                                name="qualification.degree"
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
                            {errors.qualification?.degree && <FormFeedback>{errors.qualification.degree.message}</FormFeedback>}
                        </div>
                        <div className='mb-2'>
                            <Label className='modal-label'>Course<span className='text-danger'>*</span></Label>
                            <Controller
                                name="qualification.course"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select className="form-select form-select-sm" {...field}>
                                        <option value="">--Select a Course--</option>
                                        {Course?.map((course) => (
                                            <option key={course._id} value={course._id}>{course?.name}</option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.qualification?.course && <FormFeedback>{errors.qualification.course.message}</FormFeedback>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Add</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div >
    )
}

export default UserAdd;





// import React, { useEffect, useState } from 'react';
// import * as yup from "yup";
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import axios from 'axios';

// const UserAdd = ({ modal, toggle, getUser }) => {
//     const formSchema = yup.object().shape({
//         name: yup.string().required('Please Enter your name'),
//         age: yup.string().required('Please Enter your age'),
//         email: yup.string().email().required('Please Enter your Email'),
//         mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Please Enter your mobile number'),
//         role: yup.string().required('Please Select your degree'),
//         qualification: yup.object().shape({
//             degree: yup.string().required('Please Select your degree'),
//             course: yup.string().required('Please Select your course'),
//         })
//     })

//     const [Degree, setDegree] = useState([]);
//     const [Role, setRole] = useState([]);
//     const [Course, setCourse] = useState([]);

//     const { handleSubmit, reset, watch, control, formState: { errors } } = useForm({
//         mode: 'onChange', resolver: yupResolver(formSchema),
//         defaultValues: {
//             name: "",
//             age: "",
//             email: "",
//             mobile: "",
//             role: "",
//             qualification: { // Initialize qualification as an empty object
//                 degree: "",
//                 course: ""
//             }
//         }
//     });

//     const getDegree = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/degree");
//             setDegree(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getRole = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/role");
//             setRole(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getCourse = async (id) => {
//         try {
//             const response = await axios.get(`http://192.168.1.2:1818/course/?degree=${id}`);
//             setCourse(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     const OnSubmit = async (data) => {
//         console.log(data);
//         try {
//             const response = await axios.post('http://192.168.1.2:1818/user', data);
//             toggle();
//             getUser();
//         } catch (error) {
//             console.log(error);
//             // toast.error(error?.response?.data?.msg?.message || error?.response?.data?.msg);
//         }
//         reset();
//     };

//     const watchDegree = watch("qualification.degree")
//     console.log(watchDegree);
//     useEffect(() => {
//         getCourse(watchDegree)
//     }, [watchDegree])

//     useEffect(() => {
//         getDegree();
//         getRole();

//     }, [])




//     return (
//         <div>
//             <Modal isOpen={modal} toggle={toggle}>
//                 <ModalHeader toggle={toggle}>Create User</ModalHeader>
//                 <Form onSubmit={handleSubmit(OnSubmit)}>
//                     <ModalBody>
//                         <div className='mb-2 mt-3'>
//                             <Label className='modal-label'>Name <span className='text-danger'>*</span> </Label>
//                             <Controller
//                                 name="name"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="text"
//                                         {...field}
//                                         invalid={errors.name && true}
//                                         placeholder="Enter your Name"
//                                     />
//                                 )}
//                             />
//                             {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Email<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="email"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="email"
//                                         {...field}
//                                         invalid={errors.email && true}
//                                         placeholder="Enter Your email"
//                                     />
//                                 )}
//                             />
//                             {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Age<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="age"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="text"
//                                         {...field}
//                                         invalid={errors.age && true}
//                                         placeholder="Enter Your age"
//                                     />
//                                 )}
//                             />
//                             {errors.age && <FormFeedback>{errors.age.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Mobile Number<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="mobile"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <Input
//                                         type="text"
//                                         {...field}
//                                         invalid={errors.mobile && true}
//                                         placeholder="Enter Your mobile number"
//                                     />
//                                 )}
//                             />
//                             {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Role<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="role"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <select className="form-select form-select-sm" {...field}>
//                                         <option value="">--Select a Role--</option>
//                                         {Role.map((role) => (
//                                             <option key={role._id} value={role._id}>{role.name}</option>
//                                         ))}
//                                     </select>
//                                 )}
//                             />
//                             {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Degree<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="qualification.degree"
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
//                             {errors.qualification?.degree && <FormFeedback>{errors.qualification.degree.message}</FormFeedback>}
//                         </div>
//                         <div className='mb-2'>
//                             <Label className='modal-label'>Course<span className='text-danger'>*</span></Label>
//                             <Controller
//                                 name="qualification.course"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ field }) => (
//                                     <select className="form-select form-select-sm" {...field}>
//                                         <option value="">--Select a Course--</option>
//                                         {Course.map((course) => (
//                                             <option key={course._id} value={course._id}>{course.name}</option>
//                                         ))}
//                                     </select>
//                                 )}
//                             />
//                             {errors.qualification?.course && <FormFeedback>{errors.qualification.course.message}</FormFeedback>}
//                         </div>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button type="submit" color="primary">Add</Button>{' '}
//                         <Button color="secondary" onClick={toggle}>Cancel</Button>
//                     </ModalFooter>
//                 </Form>
//             </Modal>
//         </div >
//     )
// }

// export default UserAdd