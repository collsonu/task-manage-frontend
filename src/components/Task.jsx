import React, { useEffect, useState } from 'react';
import { getApiCall, postApiCall } from '../services/api.js';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [tagsFilter, setTagsFilter] = useState('');
    const [titleSearch, setTitleSearch] = useState('');

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            const response = await postApiCall("tasks/delete-task", { _id: id });
            if (response.errors) {
                console.error('Error deleting task:', response.errors[0]);
                return;
            }
            alert(response.message);
            window.location.reload();
        }
    };

    const handleEdit = (data) => {
        localStorage.setItem("task", JSON.stringify(data));
    };
    const fetchTasks = async (page) => {
        try {
            const response = await getApiCall("tasks/list-task", {
                page,
                status: statusFilter,
                priority: priorityFilter,
                tags: tagsFilter,
                key: titleSearch
            });
            setTasks(response.items);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage, statusFilter, titleSearch, priorityFilter, tagsFilter]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleStatusFilterChange = (e) => {

        setStatusFilter(e.target.value);
    };
    const handleTagsFilterChange = (e) => {

        setTagsFilter(e.target.value);
    };
    const handlePriorityFilterChange = (e) => {

        setPriorityFilter(e.target.value);
    };

    const handleTitleSearchChange = (e) => {
        setTitleSearch(e.target.value);
    };



    return (
        <>
            <div>
                <Link
                    to="/task-create"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Create Task
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    title="Select Status"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="progress">In Progress</option>
                </select>
                <select
                    value={tagsFilter}
                    onChange={handleTagsFilterChange}
                    title="Select Status"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="others">Others</option>
                </select>
                <select
                    value={priorityFilter}
                    onChange={handlePriorityFilterChange}
                    title="Select Status"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={titleSearch}
                    onChange={handleTitleSearchChange}
                    className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>



            <div className="overflow-x-auto">
                <table className="table-auto w-full">

                    <thead>

                        <tr>
                            <th className="px-4 py-2 md:px-6 md:py-3">Title</th>
                            <th className="px-4 py-2 md:px-6 md:py-3">Description</th>
                            <th className="px-4 py-2 md:px-6 md:py-3">Due Date</th>
                            <th className="px-4 py-2 md:px-6 md:py-3">Priority</th>
                            <th className="px-4 py-2 md:px-6 md:py-3">Status</th>
                            {/* <th className="px-4 py-2 md:px-6 md:py-3">Assigned To</th> */}
                            <th className="px-4 py-2 md:px-6 md:py-3">Tags</th>
                            <th className="px-4 py-2 md:px-6 md:py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks?.map(task => (
                            <tr key={task._id} className="border-b border-gray-200">
                                <td className="px-4 py-2 md:px-6 md:py-3">{task.title}</td>
                                <td className="px-4 py-2 md:px-6 md:py-3">{task.description}</td>
                                <td className="px-4 py-2 md:px-6 md:py-3">{moment(task.dueDate).format("MMM Do YY")}</td>
                                <td className="px-4 py-2 md:px-6 md:py-3">{task.priority}</td>
                                <td className="px-4 py-2 md:px-6 md:py-3">{task.status}</td>
                                {/* <td className="px-4 py-2 md:px-6 md:py-3">{task.assignedTo}</td> */}
                                <td className="px-4 py-2 md:px-6 md:py-3">{task.tags}</td>
                                <td className="px-4 py-2 md:px-6 md:py-3">
                                    <Link to={`/task-edit`} className="text-blue-500 hover:underline" onClick={() => handleEdit(task)}>Edit</Link>
                                    <span className="text-gray-500 mx-2">|</span>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <button className="inline-block px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <p>Page {currentPage} of {totalPages}</p>
                <button className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    );
};

export default Task;

