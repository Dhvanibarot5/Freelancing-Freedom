import React from "react";

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="p-4 bg-gray-50 shadow rounded flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{project.name}</h4>
        <p className="text-sm text-gray-500">Due: {project.dueDate}</p>
        <p className={`text-sm mt-1 ${project.status === "Active" ? "text-blue-500" : "text-green-500"}`}>{project.status}</p>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">
        Delete
      </button>
    </div>
  );
};

export default ProjectCard;
