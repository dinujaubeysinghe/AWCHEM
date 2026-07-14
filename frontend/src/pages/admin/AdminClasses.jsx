import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    const [errors, setErrors] = useState({});
    const [createClass, setCreateClass] = useState(false);
    const [editClass, setEditClass] = useState(false);
    const [showEditClass, setShowEditClass] = useState(false);

    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        batch: '',
        location: '',
        day: '',
        start_date: '',
        start_time: '',
        end_time: '',
        ong_unit: ''
    });

    const initialFormData = {
        name: '',
        batch: '',
        location: '',
        day: '',
        start_date: '',
        start_time: '',
        end_time: '',
        ong_unit: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const convertTo24hr = (time) => {
        if (!time) return '';
        if (!time.includes('AM') && !time.includes('PM')) return time;
        const [hourMin, period] = time.split(' ');
        let [hours, minutes] = hourMin.split(':');
        hours = parseInt(hours);
        if (period === 'AM' && hours === 12) hours = 0;
        if (period === 'PM' && hours !== 12) hours += 12;
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient.post('/classes', formData)
            .then(() => {
                setLoading(false);
                setNotifications('Class added successfully.');
                setCreateClass(false);
                setFormData(initialFormData);
                setErrors({});
                getClasses();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setNotifications('Error occurred while adding class.');
                }
                console.error('Error occurred while adding class:', err);
            });
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...editFormData,
            start_time: convertTo24hr(editFormData.start_time),
            end_time: convertTo24hr(editFormData.end_time)
        };
        axiosClient.put(`/classes/${editFormData.id}`, payload)
            .then(() => {
                setLoading(false);
                setNotifications('Class updated successfully.');
                setEditClass(false);
                setShowEditClass(false);
                getClasses();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setNotifications('Error occurred while updating class.');
                }
                console.error('Error occurred while updating class:', err);
            });
    }

    // Fetch a single class's details and open the edit modal pre-filled
    const openEditModal = (cls) => {
        axiosClient.get(`/classes/${cls.id}`)
            .then(({ data }) => {
                setEditFormData({
                    id: data.id,
                    name: data.name,
                    batch: data.batch,
                    location: data.location,
                    day: data.day,
                    start_date: data.start_date,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    ong_unit: data.ong_unit
                });
                setEditClass(true);
                setShowEditClass(true);
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching class details.');
                console.error('Error occurred while fetching class details:', err);
            });
    };

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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-navy">All Classes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredClasses.length} class{filteredClasses.length !== 1 ? 'es' : ''} available
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full xs:w-56 sm:w-64"
                        />
                        <button
                            onClick={() => setCreateClass(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors whitespace-nowrap">
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
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => navigate(`/admin/classes/${cls.id}`)}
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
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    openEditModal(cls);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    setClassToDelete(cls)
                                                }}
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
            {/* Create Class Modal */}
            {createClass && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-lg font-bold text-navy mb-2">Add Class</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Fill in the details to create a new class.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Class Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Chemistry Advanced"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name[0]}</span>}
                            </div>

                            {/* Batch */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Batch <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    placeholder="e.g. 2024/25"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.batch && <span className="text-xs text-red-500">{errors.batch[0]}</span>}
                            </div>
                            {/* Location */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Room 101"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.location && <span className="text-xs text-red-500">{errors.location[0]}</span>}
                            </div>
                            {/* Day */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Day <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="">Select a day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                {errors.day && <span className="text-xs text-red-500">{errors.day[0]}</span>}
                            </div>
                            {/* Start Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.start_date && <span className="text-xs text-red-500">{errors.start_date[0]}</span>}
                            </div>
                            {/* Ong Unit */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Ongoing Unit <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="ong_unit"
                                    value={formData.ong_unit}
                                    onChange={handleChange}
                                    placeholder="e.g. Unit 1"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.ong_unit && <span className="text-xs text-red-500">{errors.ong_unit[0]}</span>}
                            </div>
                            {/* Start Time & End Time*/}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-navy">
                                        Start Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.start_time && <span className="text-xs text-red-500">{errors.start_time[0]}</span>}
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-navy">
                                        End Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.end_time && <span className="text-xs text-red-500">{errors.end_time[0]}</span>}
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setCreateClass(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Add Class'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Edit Class Modal */}
            {showEditClass && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-lg font-bold text-navy mb-2">Edit Class</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Update the details of the class.
                        </p>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                            {/* Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Class Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                    placeholder="e.g. Chemistry Advanced"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name[0]}</span>}
                            </div>

                            {/* Batch */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Batch <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="batch"
                                    value={editFormData.batch}
                                    onChange={handleEditChange}
                                    placeholder="e.g. 2024/25"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.batch && <span className="text-xs text-red-500">{errors.batch[0]}</span>}
                            </div>
                            {/* Location */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editFormData.location}
                                    onChange={handleEditChange}
                                    placeholder="e.g. Room 101"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.location && <span className="text-xs text-red-500">{errors.location[0]}</span>}
                            </div>
                            {/* Day */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Day <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="day"
                                    value={editFormData.day}
                                    onChange={handleEditChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="">Select a day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                {errors.day && <span className="text-xs text-red-500">{errors.day[0]}</span>}
                            </div>
                            {/* Start Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={editFormData.start_date}
                                    onChange={handleEditChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.start_date && <span className="text-xs text-red-500">{errors.start_date[0]}</span>}
                            </div>
                            {/* Ong Unit */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Ongoing Unit <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="ong_unit"
                                    value={editFormData.ong_unit}
                                    onChange={handleEditChange}
                                    placeholder="e.g. Unit 1"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.ong_unit && <span className="text-xs text-red-500">{errors.ong_unit[0]}</span>}
                            </div>
                            {/* Start Time & End Time*/}
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-navy">
                                        Start Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={editFormData.start_time}
                                        onChange={handleEditChange}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.start_time && <span className="text-xs text-red-500">{errors.start_time[0]}</span>}
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-navy">
                                        End Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={editFormData.end_time}
                                        onChange={handleEditChange}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.end_time && <span className="text-xs text-red-500">{errors.end_time[0]}</span>}
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowEditClass(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Update Class'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    )
}