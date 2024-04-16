import React, { useEffect, useState } from 'react';
import { useCrud } from './contextApi/contextapi';
import { Link } from 'react-router-dom';
import { Modal, Button, Pagination } from 'react-bootstrap'; 

const Read = () => {
  const { data, setLocalStorage, handleDelete, getData } = useCrud();
  const [selectedRow, setSelectedRow] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const rowsPerPage = 10; 

  useEffect(() => {
    getData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between my-3'>
        <h2>Read Operation</h2>
        <Link to="/">
          <button className="btn btn-sm btn-primary">Create</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope='col'>Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((value) => (
            <tr key={value.key} onClick={() => handleRowClick(value)}>
              <td>{value.id}</td>
              <td>{value.name}</td>
              <td>{value.email}</td>
              <td>{value.role}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setLocalStorage(value.id, value.name, value.email);
                    }}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete(value.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(Math.ceil(data.length / rowsPerPage)).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={pageNumber + 1 === currentPage}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
        />
      </Pagination>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Email:</strong> {selectedRow.email}</p>
              <p><strong>Role:</strong> {selectedRow.role}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Read;
