import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Payments from "./Payments";

const Dashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", dueDate: "2024-12-15", status: "Active" },
    { id: 2, name: "Project Beta", dueDate: "2024-12-20", status: "Completed" },
  ]);
  const [newProject, setNewProject] = useState({ name: "", dueDate: "", status: "Active" });

  const addProject = () => {
    if (newProject.name && newProject.dueDate) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ name: "", dueDate: "", status: "Active" });
    }
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Earnings Overview */}
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-lg font-bold mb-4">Earnings Overview</h2>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">$12,345</div>
          <div className="text-sm">Earnings (last 3 months)</div>
        </div>
      </div>

      {/* Projects */}
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-lg font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={() => deleteProject(project.id)} />
          ))}
        </div>

        {/* Add Project Form */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Add New Project</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="border rounded p-2 flex-1"
            />
            <input
              type="date"
              value={newProject.dueDate}
              onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
              className="border rounded p-2 flex-1"
            />
            <button onClick={addProject} className="bg-blue-500 text-white rounded px-4 py-2">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Payments */}
      <Payments />
    </div>
  );
};

export default Dashboard;
