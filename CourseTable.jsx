import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import CourseAdd from './CourseAdd';
import axios from 'axios';
import { useQuery, queryCache } from 'react-query';

const CourseTable = () => {
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [getUpdate, setGetUpdate] = useState(null);

    const toggle = () => setModal(!modal);

    const fetchCourses = async () => {
        const response = await axios.get('http://192.168.1.2:1818/course');
        return response.data.res;
    };

    const { data: course, refetch } = useQuery('courses', fetchCourses);

    const handleEdit = (course) => {
        setModalEdit(true);
        setGetUpdate(course);
        toggle();
    };

    const handleAdd = () => {
        setModalEdit(false);
        setGetUpdate(null);
        toggle();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.1.2:1818/Course/${id}`);
            refetch(); // Refetch courses after deletion
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: 'Degree Name',
            selector: (row) => row?.degree.name,
            sortable: true,
        },
        {
            name: 'Course Name',
            selector: (row) => row?.name,
            sortable: true,
        },
        {
            name: 'Degree Description',
            selector: (row) => row?.description,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className='d-flex align-items-center '>
                    {/* edit button ----------------------------*/}
                    <Button color='primary' onClick={() => handleEdit(row)}>
                        <FaUserEdit />
                    </Button>
                    {/* delete button-------------------------- */}
                    <Button color='danger' className='ms-2' onClick={() => handleDelete(row?._id)}>
                        <MdDeleteForever />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div>
                <div className='clearfix'>
                    <div className='d-flex'>
                        <h4>Course Table</h4>
                        <div className='float-end'>
                            <Button className='ms-3' color='danger' onClick={handleAdd}>
                                Create Course
                            </Button>
                        </div>
                    </div>
                </div>
                <DataTable
                    title='Course List'
                    columns={columns}
                    data={course}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='450px'
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                />
                <CourseAdd modal={modal} toggle={toggle} getCourse={refetch} modalEdit={modalEdit} getUpdate={getUpdate} />
            </div>
        </div>
    );
};

export default CourseTable;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component';
// import { Button } from 'reactstrap';
// import { FaUserEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import CourseAdd from './CourseAdd';

// const CourseTable = () => {

//     const [course, setCourse] = useState([]);
//     const [modal, setModal] = useState(false);
//     const [modalEdit, setModalEdit] = useState(false);
//     const [getUpdate, setGetUpdate] = useState(null);

//     const toggle = () => setModal(!modal);


//     const getCourse = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/course");
//             setCourse(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//         console.log(course);
//     };

//     const handleEdit = (course) => {
//         setModalEdit(true);
//         setGetUpdate(course);
//         toggle();

//     };

//     const handleAdd = () => {
//         setModalEdit(false);
//         setGetUpdate(null);
//         toggle();
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`http://192.168.1.2:1818/Course/${id}`);
//             getCourse();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getCourse();
//     }, [])

//     const columns = [
//         {
//             name: "Degree Name",
//             selector: (row) => row?.degree.name,
//             sortable: true,
//         },
//         {
//             name: "Course Name",
//             selector: (row) => row?.name,
//             sortable: true,
//         },
//         {
//             name: "Degree Description",
//             selector: (row) => row?.description,
//         },
//         {
//             name: "Action",
//             cell: (row) => (
//                 <div className='d-flex align-items-center '>
//                     {/* edit button ----------------------------*/}
//                     <Button color='primary' onClick={() => {
//                         handleEdit(row)
//                     }
//                     }><FaUserEdit /></Button>
//                     {/* delete button-------------------------- */}
//                     <Button color='danger' className='ms-2' onClick={() => { handleDelete(row?._id) }} ><MdDeleteForever /></Button>
//                 </div >
//             )
//         }

//     ];

//     return (
//         <div>
//             <div>
//                 <div className='clearfix'>
//                     <div className='d-flex'>
//                         <h4>Course Table</h4>
//                         <div className='float-end'>
//                             <Button className="ms-3" color="danger" onClick={() => {
//                                 handleAdd()

//                             }}>
//                                 Create Course
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//                 <DataTable
//                     title="Course List"
//                     columns={columns}
//                     data={course}
//                     pagination
//                     fixedHeader
//                     fixedHeaderScrollHeight="450px"
//                     selectableRows
//                     selectableRowsHighlight
//                     highlightOnHover
//                     subHeader
//                 />
//                 <CourseAdd modal={modal} toggle={toggle} getCourse={getCourse} modalEdit={modalEdit} getUpdate={getUpdate} />
//             </div >
//         </div>
//     )
// }

// export default CourseTable