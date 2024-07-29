import React, { useState } from 'react';
import axios from 'axios';
import './SingleTable.css';
import { useQuery } from 'react-query';
import DataTable from 'react-data-table-component';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaUsersViewfinder } from "react-icons/fa6";
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { TbBrandAppgallery } from "react-icons/tb";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const SingleTable = () => {

    const { data: Single = [], refetch: getSingle } = useQuery('singles', async () => {
        const response = await axios.get("https://devapi.getstartbuild.com/auth/materialRequest");
        return response.data.result.rows;
    });

    const { data: SingleGet = [], refetch: getSingleGet } = useQuery('singleget', async () => {
        if (!selectedUser?._id) return [];
        const response = await axios.get(`https://devapi.getstartbuild.com/auth/materialRequest/${selectedUser._id}`);
        return response.data.result.rows;
    });
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();



    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: '#148196',
                color: '#FFF',
                fontSize: '18px',
                fontWeight: 'bold',

            },
        },
        headRow: {
            style: {
                borderBottomWidth: '2px',
                backgroundColor: '#148196',
                color: 'white',
                borderBottomColor: '#ccc',
                borderBottomStyle: 'solid',
                paddingLeft: '20px ',
                paddingRight: '20px ',
            },
        },
        headCells: {
            style: {
                paddingLeft: '20px',
                paddingRight: '20px',
            },
        },
        rows: {
            style: {
                minHeight: '120px',
                paddingLeft: '20px',
                paddingRight: '20px',
            },
        },
        cells: {
            style: {
                paddingLeft: '20px',
                paddingRight: '20px',
            },
        },
        rowStriped: {
            style: {
                backgroundColor: '#032e44', // Alternate row background color
            },
        },
    };


    const toggle = () => setModal(!modal);

    const columns = [
        {
            name: "Project Name",
            selector: (row) => row?.project.name,
            sortable: true
        },
        {
            name: "Site Supervisor",
            selector: (row) =>
                <div className='d-block'>
                    <h6>{row.siteSupervisor.name}</h6>
                    <p>{row.siteSupervisor.email}</p>
                    <p>{row.siteSupervisor.mobile}</p>
                </div>
            ,
        },
        {
            name: "Purchase Manager",
            selector: (row) =>
                <div>
                    <h6>{row.purchaseManager.name}</h6>
                    <p>{row.purchaseManager.email}</p>
                    <p>{row.purchaseManager.mobile}</p>
                </div>
            ,
        },
        {
            name: "Material Count",
            selector: (row) => row?.materials.length,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className='d-flex align-items-center '>
                    {/* View button ----------------------------*/}
                    <Button onClick={() => navigate(`/view/${row?._id}`)} color='success'
                    // onClick={() => {
                    // goToSecondPage();
                    // setSelectedUser(row);
                    // getSingleGet();
                    // toggle();

                    // }}
                    ><FaUsersViewfinder /></Button>
                    <Button color='warning' className='ms-2'
                        onClick={() => {
                            setSelectedUser(row);
                            getSingleGet();
                            toggle();

                        }}
                    ><FaUsersViewfinder /></Button>
                    {/* edit button ----------------------------*/}
                    {/* <Button color='primary' className='ms-2' onClick={() => {
                        // setUserEdit(row)
                        // setModalEdit(true)
                    }
                    }><FaUserEdit /></Button>
                    <Button color='danger' className='ms-2' ><MdDeleteForever /></Button> 
                    */}
                </div >
            )
        }
    ];





    return (
        <div>
            <div className='clearfix'>
                <div className='d-flex'>
                    <h4>Single Get Add</h4>
                    {/* <div className='float-end'>
                        <Button className="ms-3" color="danger" >
                            Create single
                        </Button>
                    </div> */}
                </div>
            </div>
            <DataTable
                // title="Single Get List"
                columns={columns}
                data={Single}
                customStyles={customStyles}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                striped
            />

            {modal && (
                <Modal isOpen={modal} toggle={toggle} size="xl">
                    <ModalHeader className='text-warning' toggle={toggle}>View Project Details</ModalHeader>
                    <ModalBody>
                        {SingleGet && (
                            <div>
                                <div className='p-3'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <h1 className='text-danger'>{selectedUser?.project.name}</h1>
                                    </div>
                                    <div className='d-Block mt-4'>
                                        <div className='d-lg-flex'>
                                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-primary'>
                                                <div>
                                                    <h3 className='d-flex flex-column align-items-center'>Site Location</h3>
                                                    <div className='d-flex ms-5 mt-2'>
                                                        <h5><FaLocationDot /></h5>
                                                        <div className='ms-2'>
                                                            <p>{selectedUser?.project.location.officeName}</p>
                                                            <p>{selectedUser?.project.location.district} - {selectedUser?.project.location.pincode}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: '250px', borderRadius: '10px' }} className='col-lg-3 bg-warning ms-2'>
                                                <div>
                                                    <h3 className='d-flex flex-column align-items-center'>Site Supervisor</h3>
                                                    <div className='d-flex ms-4 mt-2'>

                                                        <div className='ms-2'>
                                                            <div className='d-flex'>
                                                                <h5><MdOutlineSupervisorAccount /></h5>
                                                                <p className='ms-2'>{selectedUser?.siteSupervisor.name}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h5><IoIosMail /></h5>
                                                                <p className='ms-2'>{selectedUser?.siteSupervisor.email}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h5><FaMobileAlt /></h5>
                                                                <p className='ms-2'>{selectedUser?.siteSupervisor.mobile}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-success ms-2'>
                                                <div>
                                                    <h3 className='d-flex flex-column align-items-center'>Purchase Manager</h3>
                                                    <div className='d-fle ms-4 mt-2'>

                                                        <div className='ms-2'>
                                                            <div className='d-flex'>
                                                                <h5><MdOutlineSupervisorAccount /></h5>
                                                                <p className='ms-2'>{selectedUser?.purchaseManager.name}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h5><IoIosMail /></h5>
                                                                <p className='ms-2'>{selectedUser?.purchaseManager.email}</p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <h5><FaMobileAlt /></h5>
                                                                <p className='ms-2'>{selectedUser?.purchaseManager.mobile}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ borderRadius: '10px' }} className='col-lg-3 bg-secondary ms-2'>
                                                <div>
                                                    <h3 className='d-flex flex-column align-items-center'>Work Type</h3>
                                                    <div className='d-flex ms-4 mt-2'>
                                                        {selectedUser?.task ? (
                                                            <div className='ms-2'>
                                                                <div className='d-flex'>
                                                                    <h5><MdConstruction /></h5>
                                                                    <p className='ms-2'>{selectedUser.task.scopeOfWork.name}</p>
                                                                </div>
                                                                <div className='d-flex'>
                                                                    <h5><MdDescription /></h5>
                                                                    <div style={{ width: '100px', height: 'auto' }}>
                                                                        <p className='d-flex ms-2'>Description</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex'>
                                                                    <div className='d-flex'>
                                                                        <h5><BsCalendarDateFill /></h5>
                                                                        <p className='ms-2'>{formatDate(selectedUser.task.startDate)}</p>
                                                                    </div>
                                                                    <div className='d-flex ms-2'>
                                                                        <h5><MdDateRange /></h5>
                                                                        <p className='ms-2'>{formatDate(selectedUser.task.endDate)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <p>No Work details available</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <div className='d-flex flex-column align-items-center'>
                                                <h2>Materials</h2>
                                            </div>
                                            <div className='d-flex flex-wrap'>
                                                {selectedUser?.materials.map(material => (
                                                    <div key={material._id}>
                                                        <div style={{ width: '260px', border: '1px solid black', borderRadius: '10px' }} className='col-3 align-item-center ms-2 mt-3'>
                                                            <div className='d-block'>
                                                                <div className='d-flex flex-column align-items-center'>
                                                                    <h5>{material.materialCategory.name}</h5>
                                                                </div>
                                                                <div className='d-flex'>
                                                                    <div className='text-center'>
                                                                        <img className='round-img' style={{ marginLeft: '30px', border: '1px solid black' }} width={70} height={50} src={material.materialCategory.img_url} alt='material img' />
                                                                    </div>
                                                                    <div className='d-block ms-3'>
                                                                        <div className='d-flex'>
                                                                            <h5><TbBrandAppgallery /></h5>
                                                                            <p className='ms-2'>{material.brand.name}</p>
                                                                        </div>
                                                                        <div className='d-flex'>
                                                                            <h5><MdProductionQuantityLimits /></h5>
                                                                            <p className='ms-2'>{material.quantity} - {material.unit.name}</p>
                                                                        </div>
                                                                        <div className='d-flex'>
                                                                            <h5><MdOutlinePriorityHigh /></h5>
                                                                            <p className='ms-2'>{material.priority}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex flex-column align-items-center'>
                                                                    <div className='d-flex'>
                                                                        <h6>Status : </h6>
                                                                        <p style={{ marginTop: '-2px' }} className='ms-2'>{material.status}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} </ModalBody >
                </Modal >)
            }


        </div >
    )

}

export default SingleTable