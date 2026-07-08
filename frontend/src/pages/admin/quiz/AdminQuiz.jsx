import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient'
import { BookOpen, MapPin, Clock, Plus, Pencil, Trash2, Book, Calendar } from 'lucide-react'

export default function AdminQuiz() {

    const navigate = useNavigate();
    const { setNotifications } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [quizToDelete, setQuizToDelete] = useState(null);

    const [quizToEdit, setQuizToEdit] = useState(null);
    const [showEditQuiz, setShowEditQuiz] = useState(false);
    const [createQuiz , setCreateQuiz] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateQuiz = () => {
        setLoading(true);
        axiosClient.post('/quizzes', formData)
            .then(({ data }) => {
                setLoading(false);
                setNotifications('Quiz created successfully.');
                setCreateQuiz(false);
                getQuizzes();
            })
            .catch((err) => {
                setLoading(false);
                setNotifications('Error occurred while creating quiz.');
                console.error('Error occurred while creating quiz:', err);
            });
    }

    const handleEditQuiz = () => {
        setLoading(true);
        axiosClient.put(`/quizzes/${quizToEdit.id}`, editFormData)
            .then(({ data }) => {
                setLoading(false);
                setNotifications('Quiz updated successfully.');
                setQuizToEdit(null);
                setShowEditQuiz(false);
                getQuizzes();
            })
            .catch((err) => {
                setLoading(false);
                setNotifications('Error occurred while updating quiz.');
                console.error('Error occurred while updating quiz:', err);
            });
    }

    const OpenEditQuizModal = (quiz) => {
       axiosClient.get(`/quizzes/${id}`)
            .then(({ data }) => {
                setEditFormData({
                    title: data.data.title,
                    description: data.data.description
                });
                setQuizToEdit(quiz);
                setShowEditQuiz(true);
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching quiz details.');
                console.error('Error occurred while fetching quiz details:', err);
            });
    }   

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getQuizzes();
    }, [])

    const getQuizzes = () => {
        setLoading(true);
        axiosClient.get('/quizzes')
            .then(({ data }) => {
                setLoading(false);
                setQuizzes(data.data);
            })
            .catch((err) => {
                setLoading(false);
                setNotifications('Error occurred while fetching quizzes.');
                console.error('Error occurred while fetching quizzes:', err);
            });
    }

    const onDelete = () => {
        const quiz = quizToDelete;
        setQuizToDelete(null);
        axiosClient.delete(`/quizzes/${quiz.id}`)
            .then(() => {
                setNotifications(`${quiz.title} was deleted successfully.`);
                getQuizzes();
            })
            .catch((err) => {
                setNotifications('Error occurred while deleting quiz.');
                console.error('Error occurred while deleting quiz:', err);
            });
    }

    return (
        <div className="p-6 relative">
            <main>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-navy">All Quizzes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} available
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full sm:w-64"
                        />
                        <button
                            onClick={() => setCreateQuiz(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            Add Quiz
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
                        {filteredQuizzes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredQuizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-navy">{quiz.title}</h3>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Card Details */}
                                        <div className="flex flex-col gap-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>{quiz.description}</span>
                                            </div>
                                        </div>

                                        {/* Card Actions */}
                                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    OpenEditQuizModal(quiz)
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    setQuizToDelete(quiz)
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
                                <p className="text-sm">No quizzes found.</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            {quizToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Delete Quiz</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-gray-900">
                                {quizToDelete.title}
                            </span>
                            <span className="font-semibold text-gray-900"> ?</span> This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setQuizToDelete(null)}
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
            {/* Create Quiz Modal */}
            {createQuiz && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Create Quiz</h2>
                        <div className="flex flex-col gap-4 mb-6">
                            <input
                                type="text"
                                name="title"
                                placeholder="Quiz Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full"
                            />
                            <textarea
                                name="description"
                                placeholder="Quiz Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full resize-none"
                                rows={4}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setCreateQuiz(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateQuiz}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy/90 rounded-lg transition-colors">
                                {loading ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Quiz Modal */}
            {showEditQuiz && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Edit Quiz</h2>
                        <div className="flex flex-col gap-4 mb-6">
                            <input
                                type="text"
                                name="title"
                                placeholder="Quiz Title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full"
                            />
                            <textarea
                                name="description"
                                placeholder="Quiz Description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full resize-none"
                                rows={4}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowEditQuiz(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleEditQuiz}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy/90 rounded-lg transition-colors">
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}