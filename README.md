# Price2Be Frontend

This is the **frontend** for the [Price2Be](https://price2be.feriadesoftware.cl/#/) project, a platform created for the *Feria de Software* that provides intelligent pricing suggestions using market data and ML models.  

The frontend was **bootstrapped with the [Notus React](https://www.creative-tim.com/product/notus-react)** template (React + Tailwind UI kit), and then customized to integrate with the Price2Be backend.

---

## ✨ Features

- Built with **React + Tailwind CSS**  
- Responsive design (desktop, tablet, mobile)  
- Product input forms to query pricing algorithms  
- Display of suggested prices, comparisons, and charts  
- Component-based architecture for easier extension  
- Clean, modern UI based on Notus React  

---

## 🚀 Getting Started

### Prerequisites

- **Node.js LTS** (recommended from [nodejs.org](https://nodejs.org/en/))  
- npm (comes with Node.js)  

### Installation & Local Run


# Clone repository
git clone https://github.com/NachoLZ/frontend2.0.git
cd frontend2.0

# Install dependencies
npm install

# (Linux users) alternatively run:
npm run install:clean

# Build Tailwind CSS (needed when adding new classes)
npm run build:tailwind

# Start development server
npm start

Then open: http://localhost:3000

📂 Project Structure
frontend2.0
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images & styles (Tailwind CSS setup)
│   ├── components/          # Reusable UI components
│   ├── layouts/             # Layouts (Admin, Auth, etc.)
│   ├── views/               # Pages (Landing, Profile, Dashboard, etc.)
│   └── index.js             # App entry point
├── package.json
├── tailwind.config.js       # Tailwind configuration
└── README.md


🔌 Backend Integration

This frontend connects to the Price2Be backend APIs to:

Request price predictions based on product inputs

Retrieve competitor/market data

Show history of past suggestions

(Endpoints and logic are defined in the backend repo.)

📝 Credits

Base template: Notus React
 by Creative Tim

Customizations: Price2Be frontend team

📄 License

This project inherits the MIT License
 from Notus React.
