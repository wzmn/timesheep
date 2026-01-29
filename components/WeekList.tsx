'use client'

import { getWorkingDatesOfWeek } from "@/lib/time"
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Dropdown from "@/components/Dropdown";
import Modal, { ModalHandle } from "@/components/Modal";
import { useRef, useState, FC, FormEvent } from "react";

// 1. Define Props Interface
interface WeekProps {
  week: string; // The slug representing the week
}

export default function Week({ week: slug }: WeekProps) {
  // 2. Fetch working dates (Assuming result is an array of Date objects)
  const result: Date[] = getWorkingDatesOfWeek(parseInt(slug), 2026);

  // Formatting dates for the list view
  const days = result.map(date => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  });

  // 3. State Management with explicit types
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const createModalRef = useRef<ModalHandle>(null);

  // 4. Handlers
  const openCreateModal = (selectedDate: Date) => {
    setDate(selectedDate);
    createModalRef.current?.open();
  };

  const createTask = (e: FormEvent) => {
    e.preventDefault();
    // Logic to save the task to MongoDB would go here
    console.log({ title, description, project, duration, date });
    createModalRef.current?.close();
  };

  // Helper to format Date object to YYYY-MM-DD for the input field
  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">This week's timesheet</h1>
      </div>
      
      <h2 className="text-slate-500 text-sm mb-4">
        {result[0].toDateString()} - {result[result.length - 1].toDateString()}
      </h2>

      <div className="flex flex-col">
        {days.map((formattedDay, index) => {
          const rawDate = result[index];
          
          return (
            <div key={index} className="flex w-full mb-6">
              <div className="w-36 text-xl font-semibold text-slate-700">{formattedDay}</div>
              
              <div className="flex flex-col w-full gap-3">
                {/* Mocked Entry - You would eventually map over actual tasks here */}
                <div className="flex justify-between p-3 border border-slate-200 rounded-md bg-white shadow-sm transition-hover hover:border-blue-300">
                  <div className="font-medium text-slate-800">Homepage Development</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">4 hrs</span>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Project Name
                    </span>

                    <Dropdown>
                      <Dropdown.Trigger>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <BsThreeDots className="text-slate-500" />
                        </button>
                      </Dropdown.Trigger>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => console.log("edit")}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log("delete")}>
                          <span className="text-red-500">Delete</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                {/* Add Task Trigger */}
                <button 
                  onClick={() => openCreateModal(rawDate)} 
                  className="flex items-center gap-2 justify-center p-2 border-2 border-dotted text-slate-500 cursor-pointer border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-md font-medium hover:text-blue-800 transition-all"
                >
                  <FaPlus className="text-xs" /> Add New Task
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Entry Modal */}
      <Modal ref={createModalRef}>
        <Modal.Window title="Add New Entry">
          <form id="task-form" onSubmit={createTask} className="flex flex-col gap-4 py-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="task-project" className="font-semibold text-sm text-slate-700">Project</label>
              <input
                id="task-project"
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Project name"
                className="p-2 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="task-title" className="font-semibold text-sm text-slate-700">Type of Work</label>
              <input
                id="task-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="p-2 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="task-desc" className="font-semibold text-sm text-slate-700">Task Description</label>
              <textarea
                id="task-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details (optional)"
                className="p-2 rounded border border-slate-300 min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-duration" className="font-semibold text-sm text-slate-700">Hours</label>
                <input
                  id="task-duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2.5"
                  className="p-2 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-date" className="font-semibold text-sm text-slate-700">Date</label>
                <input
                  id="task-date"
                  type="date"
                  value={formatDateForInput(date)}
                  readOnly
                  className="p-2 rounded border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
                />
              </div>
            </div>
          </form>

          <div className='flex items-center justify-end border-t border-slate-200 pt-6 mt-4 gap-3'>
            <button 
              type="button" 
              onClick={() => createModalRef.current?.close()} 
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
            >
              Cancel
            </button>
            <Modal.Action variant="primary" onClick={() => document.getElementById('task-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}>
              Add Entry
            </Modal.Action>
          </div>
        </Modal.Window>
      </Modal>
    </>
  );
}