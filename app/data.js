export const profile = {
  name: "Vinaykumar Venkateshkumar",
  role: "Propulsion / CFD Engineer",
  tagline:
    "Propulsion and CFD engineering graduate with hands-on ANSYS Fluent simulation experience from a validated jet-mixing study, and ongoing parametric CAD work on a nacelle-installation research project.",
  location: "Cranfield, United Kingdom",
  workAuth: "Work authorization: sponsorship required",
  seeking:
    "Seeking an entry-level propulsion, CFD, or aircraft design role.",
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
    group: "CAD",
    items: [
      "CATIA V5 (Proficient)",
      "ANSYS DesignModeler",
      "pyOCC / OpenCASCADE",
      "Parametric geometry (iCST)",
    ],
  },
  {
    group: "Programming & Analysis",
    items: ["Python", "MATLAB"],
  },
  {
    group: "Engineering Domains",
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
    tags: ["Propulsion Integration", "Parametric CAD", "Python"],
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
    tags: ["CFD", "Jet Aerodynamics", "Experimental Validation"],
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
    sub: "Boeing 737 MRO Base",
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
    modules: [
      "Gas Turbine Performance",
      "Combustion",
      "Turbomachinery Aerodynamics",
      "Propulsion System Design",
    ],
    note: "Research project (ongoing): Installation aerodynamics of aero-engine nacelles",
  },
  {
    school: "KCG College of Technology, Anna University",
    location: "Chennai, India",
    degree: "BEng — Aeronautical Engineering · CGPA 7.37/10",
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
    title: "IELTS Academic — Overall Band 6.5",
    detail:
      "Listening 7.0, Reading 6.5, Writing 6.5, Speaking 5.5; UKVI B2",
    year: "Jan 2025",
  },
  {
    title: "CATIA V5 (Proficient)",
    detail: "CADD Centre Training Services — 80 hrs",
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
