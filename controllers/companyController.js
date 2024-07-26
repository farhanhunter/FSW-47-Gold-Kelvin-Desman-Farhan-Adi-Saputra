const { Company } = require("../models");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { company_id: req.params.id },
    });
    if (updated) {
      const updatedCompany = await Company.findByPk(req.params.id);
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: { company_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
