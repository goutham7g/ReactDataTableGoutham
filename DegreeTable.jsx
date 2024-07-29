import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DataTable from 'react-data-table-component';
import DegreeAdd from './DegreeAdd';
import { useQuery } from 'react-query';

const DegreeTable = () => {

    const { data: Degree = [], refetch: getDegree } = useQuery('degrees', async () => {
        const response = await axios.get("http://192.168.1.2:1818/degree");
        return response.data.res;
    });

    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [degreeToEdit, setDegreeToEdit] = useState(null);

    const toggle = () => setModal(!modal);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.1.2:1818/degree/${id}`);
            getDegree();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (degree) => {
        setModalEdit(true);
        setDegreeToEdit(degree);
        toggle();
    };

    const handleAdd = () => {
        setModalEdit(false);
        setDegreeToEdit(null);
        toggle();
    };

    const columns = [
        {
            name: "Degree Name",
            selector: (row) => row?.name,
            sortable: true,
        },
        {
            name: "Degree Description",
            selector: (row) => row?.description,
        },
        {
            name: "Action",
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
            )
        }
    ];

    return (
        <div>
            <div>
                <div className='clearfix'>
                    <div className='d-flex'>
                        <h4>Degree Table</h4>
                        <div className='float-end'>
                            <Button className="ms-3" color="danger" onClick={handleAdd}>
                                Create Degree
                            </Button>
                        </div>
                    </div>
                </div>
                <DataTable
                    title="Degree List"
                    columns={columns}
                    data={Degree}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                />
                <DegreeAdd modal={modal} toggle={toggle} getDegree={getDegree} editMode={modalEdit} degreeToEdit={degreeToEdit} />
            </div >
        </div>
    )
}

export default DegreeTable;



// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Button } from 'reactstrap';
// import { FaUserEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import DataTable from 'react-data-table-component';
// import DegreeAdd from './DegreeAdd';

// const DegreeTable = () => {

//     const [Degree, setDegree] = useState([]);
//     const [modal, setModal] = useState(false);
//     // const [isEdit, setIsEdit] = useState(false);
//     const [modalEdit, setModalEdit] = useState(false);
//     const [degreeToEdit, setDegreeToEdit] = useState(null);

//     const getDegree = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/degree");
//             setDegree(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//         console.log(Degree);
//     };

//     const toggle = () => setModal(!modal);
//     // const toggleEditModal = () => setModalEdit(!modalEdit);

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`http://192.168.1.2:1818/degree/${id}`);
//             getDegree();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleEdit = (degree) => {
//         setModalEdit(true);
//         setDegreeToEdit(degree);
//         toggle();

//     };

//     const handleAdd = () => {
//         setModalEdit(false);
//         setDegreeToEdit(null);
//         toggle();
//     };

//     const columns = [
//         {
//             name: "Degree Name",
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
//                     <Button color='danger' className='ms-2' onClick={() => handleDelete(row?._id)} ><MdDeleteForever /></Button>
//                 </div >
//             )
//         }

//     ];

//     useEffect(() => {
//         getDegree();
//     }, [])

//     return (
//         <div>
//             <div>
//                 <div className='clearfix'>
//                     <div className='d-flex'>
//                         <h4>Degree Table</h4>
//                         <div className='float-end'>
//                             <Button className="ms-3" color="danger" onClick={() => {
//                                 handleAdd()

//                             }}>
//                                 Create Degree
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//                 <DataTable
//                     title="Degree List"
//                     columns={columns}
//                     data={Degree}
//                     pagination
//                     fixedHeader
//                     fixedHeaderScrollHeight="450px"
//                     selectableRows
//                     selectableRowsHighlight
//                     highlightOnHover
//                     subHeader
//                 />
//                 <DegreeAdd modal={modal} toggle={toggle} getDegree={getDegree} editMode={modalEdit} degreeToEdit={degreeToEdit} />
//             </div >
//         </div>
//     )
// }

// export default DegreeTable