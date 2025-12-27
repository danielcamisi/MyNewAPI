const projects = require("../models/projectSchema");
const mongoose = require("mongoose");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const {
      projectname,
      url,
      desc,
      technology,
      secondTechnology,
      thirdTechnology,
      projectType
    } = req.body;

    if (!projectname) {
      return res.status(422).json({ msg: "O nome do projeto é obrigatório!" });
    }
    if (!desc) {
      return res
        .status(422)
        .json({ msg: "A descrição do projeto é obrigatória!" });
    }
    if (!url) {
      return res.status(422).json({ msg: "A URL do projeto é obrigatória!" });
    }
    if (!projectType) {
      return res.status(422).json({ msg: "O tipo do projeto é obrigatório!" });
    }

    // Preparar dados do projeto
    const projectData = {
      projectname,
      desc,
      url,
      technology,
      secondTechnology,
      thirdTechnology,
      projectType
    };

    // Adicionar imagem se foi enviada
    if (req.file) {
      projectData.img = `/uploads/${req.file.filename}`;
    }

    const newProject = new projects(projectData);
    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
      technology: technology,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await projects.find();
    res.status(200).json(allProjects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: error.message });
  }
}; // <-- FALTAVA ESTE FECHAMENTO!

// Delete project by name
exports.deleteProjectByName = async (req, res) => {
  try {
    const { projectname } = req.params;
    
    if (!projectname) {
      return res.status(400).json({ 
        success: false, 
        msg: "Nome do projeto é obrigatório!" 
      });
    }
    
    const decodedProjectName = decodeURIComponent(projectname);
    
    const deletedProject = await projects.findOneAndDelete({ 
      projectname: decodedProjectName 
    });
    
    if (!deletedProject) {
      return res.status(404).json({ 
        success: false, 
        msg: `Projeto "${decodedProjectName}" não encontrado!` 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      msg: `Projeto deletado com sucesso!`,
      data: {
        id: deletedProject._id,
        projectname: deletedProject.projectname
      }
    });
    
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Erro interno do servidor",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};