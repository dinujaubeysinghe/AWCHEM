import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axiosClient'
import { useAuth } from '../../context/AuthContext'
import { BookOpen, Clock } from 'lucide-react'

export default function AdminEditClasses() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { setNotifications } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        location: '',
        day: '',
        start_time: '',
        end_time: '',
        ong_unit: '',
    });

    useEffect(() => {
        axiosClient.get(`/classes/${id}`)
            .then(({ data }) => {
                setFormData({
                    name: data.name,
                    batch: data.batch,
                    location: data.location,
                    day: data.day,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    ong_unit: data.ong_unit,
                });
                setFetching(false);
            })
            .catch((err) => {
                setFetching(false);
                setNotifications('Error occurred while fetching class details.');
                console.error('Error fetching class:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        const payload = {
            ...formData,
            start_time: convertTo24hr(formData.start_time),
            end_time: convertTo24hr(formData.end_time),
        };
        axiosClient.put(`/classes/${id}`, payload)
            .then(() => {
                setLoading(false);
                setNotifications('Class updated successfully.');
                navigate('/admin/classes');
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setNotifications('Error occurred while updating class.');
                }
                console.error('Error updating class:', err);
            });
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy">Edit Class</h1>
                <p className="text-sm text-gray-500 mt-1">Update the details for this class.</p>
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
                            <option value="">Select Day</option>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        {errors.day && <span className="text-xs text-red-500">{errors.day[0]}</span>}
                    </div>

                    {/* Start & End Time */}
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm font-medium text-navy">
                                Start Time <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yelo pointer-events-none" />
                                <input
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-4 py-2 text-sm text-navy border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy cursor-pointer"
                                />
                            </div>
                            {errors.start_time && <span className="text-xs text-red-500">{errors.start_time[0]}</span>}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm font-medium text-navy">
                                End Time <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yelo pointer-events-none" />
                                <input
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleChange}
                                    className="w-full pl-9 pr-4 py-2 text-sm text-navy border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy cursor-pointer"
                                />
                            </div>
                            {errors.end_time && <span className="text-xs text-red-500">{errors.end_time[0]}</span>}
                        </div>
                    </div>

                    {/* Ongoing Unit */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-navy">
                            Ongoing Unit <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="ong_unit"
                            value={formData.ong_unit}
                            onChange={handleChange}
                            placeholder="e.g. Unit 3 - Organic Chemistry"
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        />
                        {errors.ong_unit && <span className="text-xs text-red-500">{errors.ong_unit[0]}</span>}
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
                            {loading ? 'Saving...' : 'Update Class'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}