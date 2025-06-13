const users = [
  {
    id: 1,
    name: "Farmacéutico Juan",
    role: "pharmacist",
    avatar: "F"
  },
  // Los roles de personal (medical_viewer, pharmacist_viewer, admin) se crean dinámicamente en PasswordPage
  // para evitar que se guarden en localStorage si no se usan.
];

export default users;