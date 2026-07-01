import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import axiosClient from '../axiosClient'
import { BookOpen, MapPin, Clock, Plus, Pencil, Trash2, Book, Calendar } from 'lucide-react'

export default function AdminClasses() {

    const navigate = useNavigate();
    const { setNotifications } = useAuth();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [classToDelete, setClassToDelete] = useState(null);

    const filteredClasses = classes.filter((cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getClasses();
    }, [])

    const getClasses = () => {
        setLoading(true);
        axiosClient.get('/classes')
            .then(({ data }) => {
                setLoading(false);
                setClasses(data.data);
            })
            .catch((err) => {
                setLoading(false);
                setNotifications('Error occurred while fetching classes.');
                console.error('Error occurred while fetching classes:', err);
            });
    }

    const onDelete = () => {
        const cls = classToDelete;
        setClassToDelete(null);
        axiosClient.delete(`/classes/${cls.id}`)
            .then(() => {
                setNotifications(`${cls.name} was deleted successfully.`);
                getClasses();
            })
            .catch((err) => {
                setNotifications('Error occurred while deleting class.');
                console.error('Error occurred while deleting class:', err);
            });
    }

    return (
        <div className="p-6 relative">
            <main>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-navy">All Classes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredClasses.length} class{filteredClasses.length !== 1 ? 'es' : ''} available
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-64"
                        />
                        <button 
                            onClick={() => navigate('/admin/classes/create')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors">
                            <Plus className="w-4 h-4" />
                            Add Class
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Cards Grid */}
                        {filteredClasses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredClasses.map((cls) => (
                                    <div
                                        key={cls.id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-navy">{cls.name}</h3>
                                                    <span className="text-xs text-white bg-yelo px-2 py-0.5 rounded-full">
                                                        {cls.batch}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">#{cls.id}</span>
                                        </div>

                                        {/* Card Details */}
                                        <div className="flex flex-col gap-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 text-yelo shrink-0" />
                                                <span>{cls.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 text-yelo shrink-0" />
                                                <span>{cls.day}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 text-yelo shrink-0" />
                                                <span>{cls.start_time} — {cls.end_time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Book className="w-4 h-4 text-yelo shrink-0" />
                                                <span>Ongoing Unit : {cls.ong_unit}</span>
                                            </div>
                                        </div>

                                        {/* Card Actions */}
                                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                                            <button 
                                            onClick={() => navigate(`/admin/classes/edit/${cls.id}`)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setClassToDelete(cls)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 text-gray-400">
                                <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                                <p className="text-sm">No classes found.</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            {classToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Delete Class</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-gray-900">
                                {classToDelete.name}
                            </span>
                            ? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setClassToDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={onDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}