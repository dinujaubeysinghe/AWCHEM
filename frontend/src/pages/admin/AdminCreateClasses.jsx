import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axiosClient'
import { useAuth } from '../../context/AuthContext'
import { BookOpen } from 'lucide-react'

export default function AdminCreateClasses() {

    const navigate = useNavigate();
    const { setNotifications } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        location: '',
        day: '',
        start_time: '',
        end_time: '',
        ong_unit: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient.post('/classes', formData)
            .then(() => {
                setLoading(false);
                setNotifications('Class added successfully.');
                navigate('/admin/classes');
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
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy">Add Class</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new class.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-navy">Class Details</span>
                </div>

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
                            placeholder="e.g. Aluthgama"
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
                            <option value="">Select Day</option>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        {errors.day && <span className="text-xs text-red-500">{errors.day[0]}</span>}
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

                    {/* Start & End Time */}
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
                            onClick={() => navigate('/admin/classes')}
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
    )
}