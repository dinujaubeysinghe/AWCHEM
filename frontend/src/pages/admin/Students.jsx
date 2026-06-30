import React from 'react'
import axiosClinet from '../axiosClient'
import { useEffect, useState } from 'react'

export default function Students() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClinet.get('/users')
            .then(({ data }) => {
                setUser(data)
                setLoading(false)
                console.log('User data fetched:', data);
            })
            .catch((err) => {
                setLoading(false)
                console.error('Error occurred while fetching user data:', err);
            });
    };

    return (
        <div>
            <main>
                <h1 className="text-2xl font-bold mb-4">Students</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">First Name</th>
                                <th className="py-2 px-4 border-b">Last Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.map((student) => (
                                <tr key={student.id}>
                                    <td className="py-2 px-4 border-b">{student.id}</td>
                                    <td className="py-2 px-4 border-b">{student.firstName}</td>
                                    <td className="py-2 px-4 border-b">{student.lastName}</td>
                                    <td className="py-2 px-4 border-b">{student.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    )
}
