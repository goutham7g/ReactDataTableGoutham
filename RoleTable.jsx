import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DataTable from 'react-data-table-component';
import RoleAdd from './RoleAdd';
import { useQuery } from 'react-query';

const RoleTable = () => {


    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [getUpdate, setGetUpdate] = useState(null);

    const toggle = () => setModal(!modal);


    const { data: Role = [], refetch: getRole } = useQuery('roles', async () => {
        const response = await axios.get("http://192.168.1.2:1818/role");
        return response.data.res;
    });


    const columns = [
        {
            name: "Role Name",
            selector: (row) => row?.name,
            sortable: true,
        },
        {
            name: "Role Description",
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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://192.168.1.2:1818/role/${id}`);
            getRole();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (role) => {
        setModalEdit(true);
        setGetUpdate(role);
        toggle();
    };

    const handleAdd = () => {
        setModalEdit(false);
        setGetUpdate(null);
        toggle();
    };

    // useEffect(() => {
    //     getRole();
    // }, [])

    return (
        <div>
            <div>
                <div className='clearfix'>
                    <div className='d-flex'>
                        <h4>Role Table</h4>
                        <div className='float-end'>
                            <Button className="ms-3" color="danger" onClick={handleAdd}>
                                Create Role
                            </Button>
                        </div>
                    </div>
                </div>
                <DataTable
                    title="Role List"
                    columns={columns}
                    data={Role}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                />
                <RoleAdd modal={modal} toggle={toggle} getRole={getRole} modalEdit={modalEdit} getUpdate={getUpdate} />
            </div >
        </div>
    )
}

export default RoleTable;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Button } from 'reactstrap';
// import { FaUserEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import DataTable from 'react-data-table-component';
// import RoleAdd from './RoleAdd';

// const RoleTable = () => {

//     const [Role, setRole] = useState([]);
//     const [modal, setModal] = useState(false);
//     const [modalEdit, setModalEdit] = useState(false)
//     const [getUpdate, setGetUpdate] = useState(null)



//     const getRole = async () => {
//         try {
//             const response = await axios.get("http://192.168.1.2:1818/role");
//             setRole(response.data.res);
//         } catch (error) {
//             console.log(error);
//         }
//         console.log(Role);
//     };

//     const toggle = () => setModal(!modal);

//     const columns = [
//         {
//             name: "Role Name",
//             selector: (row) => row?.name,
//             sortable: true,
//         },
//         {
//             name: "Role Description",
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

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.delete(`http://192.168.1.2:1818/role/${id}`);
//             getRole();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleEdit = (Role) => {
//         setModalEdit(true)
//         setGetUpdate(Role)
//         toggle()

//     };

//     const handleAdd = () => {
//         setModalEdit(false)
//         setGetUpdate(null)
//         toggle()
//     };

//     useEffect(() => {
//         getRole();
//     }, [])

//     return (
//         <div>
//             <div>
//                 <div className='clearfix'>
//                     <div className='d-flex'>
//                         <h4>Role Table</h4>
//                         <div className='float-end'>
//                             <Button className="ms-3" color="danger" onClick={() => {
//                                 handleAdd()
//                             }}>
//                                 Create Role
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//                 <DataTable
//                     title="Role List"
//                     columns={columns}
//                     data={Role}
//                     pagination
//                     fixedHeader
//                     fixedHeaderScrollHeight="450px"
//                     selectableRows
//                     selectableRowsHighlight
//                     highlightOnHover
//                     subHeader
//                 />
//                 <RoleAdd modal={modal} toggle={toggle} getRole={getRole} modalEdit={modalEdit} getUpdate={getUpdate} />
//             </div >
//         </div>
//     )
// }

// export default RoleTable