import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from '../navbar/Navbar_Ag';
import '../user/User.css';
import { MdDeleteForever, MdEmail } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert'; // Import

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => { 
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        const fournisseurUsers = response.data.filter(user => user.profil === 'fournisseur');
        setUsers(fournisseurUsers);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  };

  const handleAddClick = () => {
    window.location.href = '/ajouter_utlilisateur_agent';
  };

  const deleteUser = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/api/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      alert('Utilisateur supprimé avec succès');
      fetchUsers();
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de utilisateur:', error);
      alert('Échec de la suppression de utilisateur');
    });
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirmation de suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      buttons: [
        {
          label: 'Oui',
          onClick: () => deleteUser(id)
        },
        {
          label: 'Non',
          onClick: () => {}
        }
      ]
    });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleUserClick = (id) => {
    navigate(`/modifier_utilisateur_agent/${id}`);
  }

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div>
      <Navbar1 />
      <div className='list'>
        <div className="row">
          <div className="col-md-12">
            <div className="card1">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0" style={{ fontFamily: 'Montserrat', marginTop: "0%" }}>
                  gérer les utilisateurs
                </h5>
                <div className="card2">
                  <button className="button_add" onClick={handleAddClick}>
                    <span className="lable">ajouter</span>
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">id</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">nom</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">prénom</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">profil</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">adresse</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">téléphone</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map(user => (
                      <tr key={user.id}>
                        <td className="pl-4">{user.id}</td>
                        <td>
                          <h5 className="font-medium mb-0">{user.name}</h5>
                        </td>
                        <td>
                          <h5 className="font-medium mb-0">{user.secondary_name}</h5>
                        </td>
                        <td>
                          <h5 className="font-medium mb-0">{user.profil}</h5>
                        </td>
                        <td>
                          <h5 className="font-medium mb-0">{user.email}</h5>
                        </td>
                        <td>
                          <h5 className="font-medium mb-0">{user.address}</h5>
                        </td>
                        <td>
                          <h5 className="font-medium mb-0">{user.telephone}</h5>
                        </td>
                        <td>
                          <div className='two_icons'>
                            <div className='one_icon'>
                              <MdDeleteForever onClick={() => confirmDelete(user.id)} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='one_icon'>
                              <RiUserSettingsFill onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='one_icon'>
                              <MdEmail onClick={() => handleContact(user.email)} style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ReactPaginate
                previousLabel={'Précédent'}
                nextLabel={'Suivant'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(users.length / usersPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
