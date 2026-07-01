import React from 'react'
import axiosClinet from '../axiosClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Students() {
    const [user, setUser] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const { setNotifications } = useAuth()
    const filteredStudents = user.filter((student) =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        || student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClinet.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUser(data.data)
                console.log('User data fetched:', data);
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching user data.');
                console.error('Error occurred while fetching user data:', err);
            });
    };

    const onDelete = async (student) => {
        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        try {
            await axiosClinet.delete(`/users/${student.id}`)
            setNotifications('User deleted successfully.')
            getUsers()
        } catch (err) {
            setNotifications('Error occurred while deleting user.')
            console.error('Error occurred while deleting user:', err)
        }
    };

    return (
        <div className="p-6">
            <main>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Students</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredStudents ? `${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''} enrolled` : ''}
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-64" />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gra">
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">ID</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Name</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Email</th>
                                    <th className="py-3 px-6 text-right text-xs font-semibold text-navy uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredStudents && filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-6 text-sm text-gray-500">AW{student.id}</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                                                    {student.first_name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {student.first_name} {student.last_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-sm text-gray-600">{student.email}</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onDelete(student)}
                                                    className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents && filteredStudents.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No students found.
                            </div>
                        )}
                    </div>
                )}
            </main> 
        </div>
    )
}
