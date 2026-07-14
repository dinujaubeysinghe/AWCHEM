import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import axiosClient from '../../axiosClient'
import { TrendingUp, Plus, Trash2, Pencil, Save } from 'lucide-react'
import StudentCombobox from '../../../components/admin/StudentCombobox'
export default function AdminResults() {

    const { setNotifications } = useAuth()
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState('')
    const [classQuizzes, setClassQuizzes] = useState([])
    const [enrolledStudents, setEnrolledStudents] = useState([])
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultToEdit, setResultToEdit] = useState(null)
    const [resultToDelete, setResultToDelete] = useState(null)
    const [editMarks, setEditMarks] = useState('')

    const [records, setRecords] = useState([
        { user_id: '', class_quiz_id: '', marks: '' }
    ])

    useEffect(() => {
        getClasses()
    }, [])

    useEffect(() => {
        if (selectedClass) {
            getClassQuizzes()
            getEnrolledStudents()
            getResults()
        }
    }, [selectedClass])

    const getClasses = () => {
        axiosClient.get('/classes')
            .then(({ data }) => {
                setClasses(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching classes.')
                console.error(err)
            })
    }

    const getClassQuizzes = () => {
        axiosClient.get(`/classes/${selectedClass}/quizzes`)
            .then(({ data }) => {
                setClassQuizzes(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                console.error('Error fetching class quizzes:', err)
            })
    }

    const getEnrolledStudents = () => {
        axiosClient.get(`/classes/${selectedClass}`)
            .then(({ data }) => {
                setEnrolledStudents(data.users ?? [])
            })
            .catch((err) => {
                console.error('Error fetching enrolled students:', err)
            })
    }

    const getResults = () => {
        setLoading(true)
        axiosClient.get(`/results?class_id=${selectedClass}`)
            .then(({ data }) => {
                setLoading(false)
                setResults(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching results.')
                console.error('Error fetching results:', err)
            })
    }

    const handleRecordChange = (index, field, value) => {
        const updated = [...records]
        updated[index][field] = value
        setRecords(updated)
    }

    const addRecord = () => {
        setRecords([...records, { user_id: '', class_quiz_id: '', marks: '' }])
    }

    const removeRecord = (index) => {
        setRecords(records.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        setLoading(true)
        const errors = []

        for (const record of records) {
            if (!record.user_id || !record.class_quiz_id || record.marks === '') {
                errors.push('Please fill all fields in every record.')
                break
            }
        }

        if (errors.length > 0) {
            setNotifications(errors[0])
            setLoading(false)
            return
        }

        try {
            for (const record of records) {
                await axiosClient.post('/results', {
                    user_id: record.user_id,
                    class_quiz_id: record.class_quiz_id,
                    marks: record.marks,
                })
            }
            setNotifications('Results saved successfully.')
            setRecords([{ user_id: '', class_quiz_id: '', marks: '' }])
            getResults()
        } catch (err) {
            setNotifications(err.response?.data?.message || 'Error occurred while saving results.')
            console.error(err)
        }

        setLoading(false)
    }

    const handleEditSave = () => {
        axiosClient.put(`/results/${resultToEdit.id}`, { marks: editMarks })
            .then(() => {
                setNotifications('Result updated successfully.')
                setResultToEdit(null)
                setEditMarks('')
                getResults()
            })
            .catch((err) => {
                setNotifications('Error occurred while updating result.')
                console.error(err)
            })
    }

    const handleDelete = () => {
        const result = resultToDelete
        setResultToDelete(null)
        axiosClient.delete(`/results/${result.id}`)
            .then(() => {
                setNotifications('Result deleted successfully.')
                getResults()
            })
            .catch((err) => {
                setNotifications('Error occurred while deleting result.')
                console.error(err)
            })
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-navy">Results</h1>
                <p className="text-sm text-gray-500 mt-1">Manage student quiz results</p>
            </div>

            {/* Class Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                <label className="text-sm font-medium text-navy block mb-2">
                    Select Class <span className="text-red-500">*</span>
                </label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full sm:max-w-sm"
                >
                    <option value="">Select a class...</option>
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name} — {cls.location}</option>
                    ))}
                </select>
            </div>

            {selectedClass && (
                <>
                    {/* Add Results */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <h2 className="text-sm font-bold text-navy flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-yelo" />
                                Add Results
                            </h2>
                            <button
                                onClick={addRecord}
                                className="flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors self-start sm:self-auto"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add Record
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {records.map((record, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-xl">

                                    {/* Student */}
                                    <StudentCombobox
                                        students={enrolledStudents}
                                        value={record.user_id}
                                        onChange={(id) => handleRecordChange(index, 'user_id', id)}
                                    />

                                    {/* Quiz */}
                                    <select
                                        value={record.class_quiz_id}
                                        onChange={(e) => handleRecordChange(index, 'class_quiz_id', e.target.value)}
                                        className="w-full sm:flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    >
                                        <option value="">Select Quiz</option>
                                        {classQuizzes.map((quiz) => (
                                            <option key={quiz.id} value={quiz.id}>
                                                {quiz.title} — {quiz.date}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        {/* Marks */}
                                        <input
                                            type="number"
                                            value={record.marks}
                                            onChange={(e) => handleRecordChange(index, 'marks', e.target.value)}
                                            placeholder="Marks %"
                                            min="0"
                                            max="100"
                                            className="w-full sm:w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                        />

                                        {/* Remove */}
                                        {records.length > 1 && (
                                            <button
                                                onClick={() => removeRecord(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'Saving...' : 'Save Results'}
                            </button>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-yelo" />
                                <h2 className="text-sm font-bold text-navy">Saved Results</h2>
                                <span className="text-xs text-gray-400">({results.length})</span>
                            </div>
                        </div>

                        {results.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-180 w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-3 px-4 sm:px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Student</th>
                                            <th className="py-3 px-4 sm:px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Quiz</th>
                                            <th className="py-3 px-4 sm:px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Date</th>
                                            <th className="py-3 px-4 sm:px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Marks</th>
                                            <th className="py-3 px-4 sm:px-6 text-right text-xs font-semibold text-navy uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {results.map((result) => (
                                            <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                            {result.student_name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{result.student_name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 sm:px-6 text-sm text-gray-600 whitespace-nowrap">{result.quiz_title}</td>
                                                <td className="py-3 px-4 sm:px-6 text-sm text-gray-600 whitespace-nowrap">{result.quiz_date}</td>
                                                <td className="py-3 px-4 sm:px-6">
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${result.marks >= 75 ? 'bg-green-100 text-green-700' :
                                                            result.marks >= 50 ? 'bg-yellow-100 text-yellow-600' :
                                                                'bg-red-100 text-red-600'
                                                        }`}>
                                                        {result.marks}%
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 sm:px-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => { setResultToEdit(result); setEditMarks(result.marks) }}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gray-100 hover:bg-navy hover:text-white rounded-lg transition-colors whitespace-nowrap"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setResultToDelete(result)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors whitespace-nowrap"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400 px-4">
                                <TrendingUp className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                                <p className="text-sm">No results found for this class.</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Edit Modal */}
            {resultToEdit && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Edit Result</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Editing marks for <span className="font-semibold text-navy">{resultToEdit.student_name}</span> — {resultToEdit.quiz_title}
                        </p>
                        <input
                            type="number"
                            value={editMarks}
                            onChange={(e) => setEditMarks(e.target.value)}
                            placeholder="Marks %"
                            min="0"
                            max="100"
                            className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        />
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                            <button
                                onClick={() => { setResultToEdit(null); setEditMarks('') }}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors w-full sm:w-auto"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {resultToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Delete Result</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete the result for{' '}
                            <span className="font-semibold text-navy">{resultToDelete.student_name}</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                            <button
                                onClick={() => setResultToDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors w-full sm:w-auto"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}