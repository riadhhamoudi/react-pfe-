import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from '../navbar/Navbar_Ag';
import '../user/User.css';
import { MdDeleteForever } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate()
  useEffect(() => { 
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        // Filter to keep only users where 'profil' is 'fournisseur'
        const fournisseurUsers = response.data.filter(user => user.profil === 'fournisseur');
        setUsers(fournisseurUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  

  const handleAddClick = () => {
    window.location.href = '/Adduser'; 
  };

  const deleteUser = (id) => {
    // Ajouter plus de détails au message de confirmation si nécessaire
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/api/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        alert('Utilisateur supprimé avec succès');
        fetchUsers(); // Recharger la liste des utilisateurs après la suppression
      })
      .catch(error => { 
        console.error('Erreur lors de la suppression de lutilisateur:', error);
        alert('Échec de la suppression de lutilisateur');
      });
    }
  };
  
  const handlclick = (id) => {
    navigate(`/Edituser_Ag/${id}`);
  }

  return ( 
    <div>
      <Navbar1/>
      <div className='list'>
        <div className="row">
          <div className="col-md-12">
            <div className="card1">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0" style={{ fontFamily: 'Montserrat', marginTop:"0%" }}>
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
                    {users.map(user => (
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
                        <h5 className="font-medium mb-0">{user.adress}</h5>
                         
                        </td>
                        <td>
                        <h5 className="font-medium mb-0">{user.telephone}</h5>
                          
                        </td>
                 
   
                        <td>
                          <div className='two_icons'>
                            <div className='one_icon'>
                              <MdDeleteForever onClick={() => deleteUser(user.id)} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='one_icon'>
                            <RiUserSettingsFill onClick={() => handlclick(user.id)} style={{ cursor: 'pointer' }} />

                            </div>
                          </div>
                        </td>
                      </tr> 
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

