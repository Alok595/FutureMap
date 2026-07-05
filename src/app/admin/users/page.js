'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaGoogle, FaEnvelope } from 'react-icons/fa';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/get-users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/admin/delete-user?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setUsers(users.filter(user => user._id !== id));
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        const res = await fetch(`/api/admin/update-user-role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, role: newRole }),
        });
        if (res.ok) {
          setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to update user role');
        }
      } catch (error) {
        console.error('Error updating role:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#1a1a1a]">Registered Users</h2>
          <p className="text-[#666] mt-1">Manage all users registered on FutureMap.</p>
        </div>
      </div>

      <div className="bg-white border border-[#e5e0d8] rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf9f6] border-b border-[#e5e0d8] text-xs uppercase tracking-widest text-[#666]">
                <th className="p-4 font-bold">User</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Login Method</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#999]">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-[#e5e0d8] hover:bg-[#faf9f6] transition-colors">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e5e0d8]">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">
                              {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#1a1a1a]">{user.name || 'Unknown User'}</div>
                          <div className="text-xs text-[#999]">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <a href={`mailto:${user.email}`} className="text-[#666] hover:text-[#c5a059] transition-colors">
                        {user.email}
                      </a>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        {user.provider === 'google' ? (
                          <><FaGoogle className="text-red-500" /> <span className="text-sm">Google</span></>
                        ) : (
                          <><FaEnvelope className="text-[#666]" /> <span className="text-sm">Email/Password</span></>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${user.role === 'admin' ? 'bg-[#1a1a1a] text-[#c5a059]' : 'bg-[#e5e0d8] text-[#666]'}`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className={`${user.role === 'admin' ? 'text-orange-500 hover:text-orange-700' : 'text-[#c5a059] hover:text-[#a07c3e]'} transition-colors font-bold text-xs uppercase`}
                          title="Change Role"
                        >
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete User"
                          >
                            <FaTrash size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
