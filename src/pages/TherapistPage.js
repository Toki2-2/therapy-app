import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TherapistPage() {
  const [therapists, setTherapists] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    location: '',
    years_practice: '',
    availability: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch therapists
  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    const response = await fetch('http://localhost:5000/api/therapists');
    const data = await response.json();
    setTherapists(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:5000/api/therapists/${editingId}`
      : 'http://localhost:5000/api/therapists';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      fetchTherapists();
      setFormData({
        title: '',
        name: '',
        email: '',
        location: '',
        years_practice: '',
        availability: ''
      });
      setEditingId(null);
    }
  };

  const handleEdit = (therapist) => {
    setFormData(therapist);
    setEditingId(therapist.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this therapist?')) {
      await fetch(`http://localhost:5000/api/therapists/${id}`, {
        method: 'DELETE'
      });
      fetchTherapists();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Therapist Management</h1>
      <Link to="/"><button>Back to Home</button></Link>

      <h2>{editingId ? 'Edit' : 'Add'} Therapist</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Title"
        />
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
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          placeholder="Location"
        />
        <input
          value={formData.years_practice}
          onChange={(e) => setFormData({...formData, years_practice: e.target.value})}
          placeholder="Years of Practice"
        />
        <select
          value={formData.availability}
          onChange={(e) => setFormData({...formData, availability: e.target.value})}
          required
        >
          <option value="">Select Availability</option>
          <option value="TAKING CLIENTS">Taking Clients</option>
          <option value="NOT TAKING CLIENTS">Not Taking Clients</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button onClick={() => setEditingId(null)}>Cancel</button>}
      </form>

      <h2>Therapists List</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years Practice</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map(therapist => (
            <tr key={therapist.id}>
              <td>{therapist.id}</td>
              <td>{therapist.title}</td>
              <td>{therapist.name}</td>
              <td>{therapist.email}</td>
              <td>{therapist.location}</td>
              <td>{therapist.years_practice}</td>
              <td>{therapist.availability}</td>
              <td>
                <button onClick={() => handleEdit(therapist)}>Edit</button>
                <button onClick={() => handleDelete(therapist.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TherapistPage;