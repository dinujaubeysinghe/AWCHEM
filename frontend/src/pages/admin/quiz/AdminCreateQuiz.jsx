import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'
import { useAuth } from '../../../context/AuthContext'
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function AdminCreateQuiz() {

    const navigate = useNavigate();
    const { setNotifications } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient.post('/quizzes', formData)
            .then(() => {
                setLoading(false);
                setNotifications('Quiz added successfully.');
                navigate('/admin/quizzes');
            })
            .catch((err) => {
                setLoading(false);
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setNotifications('Error occurred while adding quiz.');
                }
                console.error('Error occurred while adding quiz:', err);
            });
    };

    return (
        <div className="p-6">
            <button
                onClick={() => navigate('/admin/quizzes')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Quizzes
            </button>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy">Add Quiz</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new quiz.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-navy">Quiz Details</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-navy">
                            Quiz Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Challenging Quiz"
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        />
                        {errors.title && <span className="text-xs text-red-500">{errors.title[0]}</span>}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-navy">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell about the quiz..."
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                            rows="4"
                        />
                        {errors.description && <span className="text-xs text-red-500">{errors.description[0]}</span>}
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/quizzes')}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Add Quiz'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}