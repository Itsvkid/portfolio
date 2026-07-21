export const profile = {
  name: "Vinaykumar Venkateshkumar",
  role: "Propulsion / CFD Engineer",
  kicker: "Propulsion / CFD — Cranfield University",
  tagline:
    "CFD and propulsion engineer working on nacelle installation aerodynamics — ANSYS Fluent simulation, parametric CAD, and a validated jet-mixing study.",
  location: "Cranfield, UK",
  workAuth: "Sponsorship required",
  availability: "Available Sep 2026",
  seeking: "Entry-level propulsion / CFD / aircraft design",
  email: "kumarvsvinay@gmail.com",
  phone: "+44 7742 914241",
  linkedin: "https://linkedin.com/in/vinaykumar-venkateshkumar",
  github: "https://github.com/Itsvkid",
  cv: "/Vinaykumar_Venkateshkumar_CV.pdf",
};

export const skills = [
  {
    group: "CFD & Simulation",
    items: [
      "ANSYS Fluent",
      "ANSYS ICEM CFD / Meshing",
      "k-ε / k-ω turbulence modelling",
      "OpenFOAM",
      "Grid-independence studies",
    ],
  },
  {
    group: "CAD & Geometry",
    items: [
      "CATIA V5",
      "ANSYS DesignModeler",
      "pyOCC / OpenCASCADE",
      "Parametric geometry (iCST)",
    ],
  },
  {
    group: "Programming",
    items: ["Python", "MATLAB"],
  },
  {
    group: "Domains",
    items: [
      "Propulsion",
      "Aerodynamics",
      "Jet flow control",
      "Thermodynamics",
      "Aircraft structures",
      "Non-destructive testing",
    ],
  },
];

export const projects = [
  {
    title: "Installation Aerodynamics of Aero-Engine Nacelles",
    context: "Cranfield Individual Research Project",
    period: "Ongoing — expected Sep 2026",
    points: [
      "Investigating installation aerodynamics using a Python-based propulsion-integration tool, applying iCST parametric geometry to model nacelle installation effects.",
      "Developing and benchmarking a pyOCC / OpenCASCADE geometry-generation workflow against commercial CAD output for accuracy and robustness.",
    ],
    tech: ["Python", "iCST", "pyOCC", "OpenCASCADE", "OpenFOAM"],
  },
  {
    title: "Investigation of Controlled Jets for Enhanced Mixing Rates",
    context: "BEng Final Year Project — team of 3",
    period: "Mar 2025",
    stats: [
      { value: "64–76%", label: "Core-length reduction" },
      { value: "M 0.6–1.0", label: "Validated range" },
      { value: "3.4M+", label: "Mesh nodes" },
    ],
    points: [
      "Investigated passive flow-control tab geometries (Delta Tandem Tab, M Delta Tandem Tab) to enhance nozzle jet mixing.",
      "Ran ANSYS Fluent CFD simulations across Mach 0.6–1.0 with grid-independence studies to 3.4M+ nodes, validated against experimental shadowgraph imaging.",
      "Achieved 64–76% potential core-length reduction versus an uncontrolled jet baseline at Mach 0.8, with no significant thrust penalty.",
    ],
    tech: ["ANSYS Fluent", "ANSYS DesignModeler", "ANSYS ICEM CFD"],
  },
];

export const experience = [
  {
    org: "AI Engineering Services Limited (AIESL)",
    sub: "Boeing 737 MRO Base — Air India Express",
    role: "Engineering Intern, Aircraft Maintenance",
    location: "Thiruvananthapuram, India",
    period: "Mar 2025 — Apr 2025",
    points: [
      "Rotational internship across Component Overhaul, Material/Production Planning, and Stores at a 737 base-maintenance facility servicing Air India Express.",
      "Documented wheel/brake overhaul procedures (torque spec 158 lb-ft, tyre pressure 205 ± 5 psi) and Eddy Current Testing (ECT) for non-destructive flaw detection.",
      "Used AMOS and RAMCO systems to track parts issuance, stock levels, and task-card compliance.",
    ],
  },
];

export const education = [
  {
    school: "Cranfield University",
    location: "Cranfield, UK",
    degree: "Thermal Power and Propulsion — Postgraduate Coursework",
    period: "Oct 2025 — Sep 2026",
    current: true,
    modules: [
      "Gas Turbine Performance",
      "Combustion",
      "Turbomachinery Aerodynamics",
      "Propulsion System Design",
    ],
    note: "Installation aerodynamics of aero-engine nacelles (ongoing)",
  },
  {
    school: "KCG College of Technology, Anna University",
    location: "Chennai, India",
    degree: "BEng Aeronautical Engineering — CGPA 7.37/10",
    period: "2021 — 2025",
    modules: [
      "Air Breathing Propulsion",
      "Rocket Propulsion",
      "Aero Engineering Thermodynamics",
      "Aerodynamics I & II",
      "Computational Fluid Dynamics",
      "Aircraft Structures I & II",
      "Finite Element Methods",
      "Wind Tunnel Techniques",
      "Non-Destructive Testing",
      "Aircraft Design",
    ],
  },
];

export const certifications = [
  {
    title: "CATIA V5",
    detail: "CADD Centre Training Services, 80 hrs",
    year: "2024",
  },
  {
    title: "MATLAB Essential Training",
    detail: "LinkedIn Learning",
    year: "2024",
  },
  {
    title: "Machine Learning with Python; Deep Learning with TensorFlow",
    detail: "IBM / Cognitive Class",
    year: "2024",
  },
];
