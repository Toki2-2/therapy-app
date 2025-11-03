import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClientPage() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    regularity: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch('http://localhost:5000/api/clients');
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:5000/api/clients/${editingId}`
      : 'http://localhost:5000/api/clients';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      fetchClients();
      setFormData({ name: '', email: '', phone: '', regularity: '' });
      setEditingId(null);
    }
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingId(client.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this client?')) {
      await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: 'DELETE'
      });
      fetchClients();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Client Management</h1>
      <Link to="/"><button>Back to Home</button></Link>

      <h2>{editingId ? 'Edit' : 'Add'} Client</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email"
          required
        />
        <input
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          placeholder="Phone"
        />
        <select
          value={formData.regularity}
          onChange={(e) => setFormData({...formData, regularity: e.target.value})}
          required
        >
          <option value="">Select Regularity</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
      </form>

      <h2>Clients List</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Regularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.regularity}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientPage;