import React from "react";

const ProjectCard = ({ project, onDelete }) => {
  const handleDelete = () => {
    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Filter out the project being deleted
    const updatedProjects = existingProjects.filter(p => p.id !== project.id);
    
    // Update localStorage with filtered projects
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Call the onDelete prop to update parent component state
    onDelete(project.id);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-800">{project.name}</h4>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-600">Due: {project.dueDate}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${project.status === "Active" 
              ? "bg-blue-100 text-blue-700" 
              : "bg-green-100 text-green-700"
            }`}>
            {project.status}
          </span>
          {project.payment && (
            <p className="text-sm font-medium text-gray-700">
              Payment: ${project.payment}
            </p>
          )}
        </div>
        <button 
          onClick={handleDelete} 
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
