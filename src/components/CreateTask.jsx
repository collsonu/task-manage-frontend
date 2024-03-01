import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Select } from './index.js'
import { useForm } from 'react-hook-form'
import { postApiCall } from '../services/api.js';

function CreateTask() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const createtask = async (data) => {
        const response = await postApiCall("tasks/create-task", data)
        if (response.errors) {
            setError(response.errors[0])
            return;
        }
        alert(response.message);
        navigate("/task");
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(createtask)}>
                    <div className='space-y-5'>
                        <Input
                            label="Title: "
                            placeholder="Title"
                            {...register("title", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Description: "
                            placeholder="Description"
                            type="text"
                            {...register("description", {
                                required: true,

                            })}
                        />
                        <Input
                            label="Due Date: "
                            type="date"
                            placeholder="Due date"
                            {...register("dueDate", {
                                required: true,
                            })}
                        />
                        <Select
                            options={['high', 'medium', 'low']}
                            label="Priority: "
                            className="mb-4"
                            {...register("priority", { required: true })}
                        />

                        <Select
                            options={['work', 'personal', 'others']}
                            label="Tags: "
                            className="mb-4"
                            {...register("tags", { required: true })}
                        />
                       
                        {/* <Input
                            label="Due Date: "
                            type="date"
                            placeholder="Due date"
                            {...register("dueDate", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Due Date: "
                            type="date"
                            placeholder="Due date"
                            {...register("dueDate", {
                                required: true,
                            })}
                        /> */}
                        <Button type="submit" className="w-full">
                            Create Task
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}


export default CreateTask;