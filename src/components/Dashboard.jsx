import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Payments from "./Payments";

const Dashboard = () => {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('projects')) || [];
  });
  const [newProject, setNewProject] = useState({ 
    name: "", 
    dueDate: "", 
    status: "Active",
    payment: ""
  });
  const [payments, setPayments] = useState(() => {
    return JSON.parse(localStorage.getItem('payments')) || [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setPayments(JSON.parse(localStorage.getItem('payments')) || []);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handlePaymentsUpdate = () => {
      setPayments(JSON.parse(localStorage.getItem('payments')) || []);
    };

    window.addEventListener('paymentsUpdated', handlePaymentsUpdate);
    return () => window.removeEventListener('paymentsUpdated', handlePaymentsUpdate);
  }, []);

  const calculateTotalEarnings = () => {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    return payments
      .filter(payment => payment.status === "Paid")
      .reduce((total, payment) => total + Number(payment.amount), 0)
      .toFixed(2);
  };

  const addProject = () => {
    if (newProject.name && newProject.dueDate) {
      const newProjectWithId = { ...newProject, id: Date.now() };
      
      setProjects(prevProjects => {
        const updatedProjects = [...prevProjects, newProjectWithId];
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        return updatedProjects;
      });

      if (newProject.payment) {
        const newPayment = {
          id: Date.now(),
          amount: Number(newProject.payment),
          status: "Unpaid",
          projectId: newProjectWithId.id,
          projectName: newProject.name
        };

        setPayments(prevPayments => {
          const updatedPayments = [...prevPayments, newPayment];
          localStorage.setItem('payments', JSON.stringify(updatedPayments));
          window.dispatchEvent(new Event('paymentsUpdated'));
          return updatedPayments;
        });
      }

      setNewProject({ 
        name: "", 
        dueDate: "", 
        status: "Active", 
        payment: "" 
      });
    }
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter(project => project.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Earnings Overview */}
      <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Earnings Overview</h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="text-3xl font-bold text-gray-800">${calculateTotalEarnings()}</div>
            <div className="text-sm text-gray-600">Total Paid Earnings</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">
                ${payments.filter(p => p.status === "Paid").reduce((total, p) => total + Number(p.amount), 0).toFixed(2)}
              </span>
              <span className="text-sm ml-2">Paid</span>
            </div>
            <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">
                ${payments.filter(p => p.status === "Unpaid").reduce((total, p) => total + Number(p.amount), 0).toFixed(2)}
              </span>
              <span className="text-sm ml-2">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {projects.length} Total Projects
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
          ))}
        </div>

        {/* Add Project Form */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Project</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Payment Amount"
                value={newProject.payment}
                onChange={(e) => setNewProject({ ...newProject, payment: e.target.value })}
                className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={addProject} 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-6 py-3 min-w-[120px] hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payments */}
      <Payments 
        payments={payments} 
        setPayments={setPayments}
      />
    </div>
  );
};

export default Dashboard;
