import React, { useState } from "react";
import TradesSection from "./sections/TradesSection";
import InfrastructureSection from "./sections/InfrastructureSection";
import ITSection from "./sections/ITSection";

const DashboardLayout = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  const provinces = [
    { id: "kigali", name: "Kigali City" },
    { id: "eastern", name: "Eastern Province" },
    { id: "western", name: "Western Province" },
    { id: "northern", name: "Northern Province" },
    { id: "southern", name: "Southern Province" },
  ];
  
  const districtsByProvince = {
    kigali: ["Nyarugenge", "Gasabo", "Kicukiro"],
    eastern: ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
    western: ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"],
    northern: ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
    southern: ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  };
  const schoolsByDistrict = {
    Nyarugenge: [
        "GS CYAHAFI", "Kigali Leading Technical School", "TVET KANYINYA",
        
    ],
    Gasabo: [
        "APAER Remera", "ETO Gasabo", "CFJ Jabana", "GS Kacyiru II",
       
    ],
    Kicukiro: [
        "Lycee de Kigali", "IPRC Kicukiro", "Groupe Scolaire Kicukiro",
        
    ],
    Nyanza: [
        "Ecole des Sciences de Nyanza", "Groupe Scolaire Notre Dame de Lourdes",
       
    ],
    Gisagara: [
        "Groupe Scolaire Save", "G.S. Kigembe", "G.S. Mugombwa",
    
    ],
    Huye: [
        "Ecole Secondaire de Karubanda", "Groupe Scolaire Officiel de Butare",
        
    ],
    Nyamagabe: [
        "G.S. Nyamagabe", "Saint Jean Bosco", "G.S. Kibeho",
        
    ],
    Ruhango: [
        "G.S. Ruhango", "Groupe Scolaire Indangaburezi", "G.S. Kinazi",
        
    ],
    Muhanga: [
        "Ecole des Sciences de Muhanga", "Groupe Scolaire Kabgayi",
       
    ],
    Kamonyi: [
        "Groupe Scolaire Remera Rukoma", "G.S. Musambira", "G.S. Ruyenzi",
        
    ],
    Karongi: [
        "Ecole Secondaire Saint Pierre", "G.S. Bumba", "G.S. Rubengera",
        
    ],
    Rutsiro: [
        "Groupe Scolaire Rutsiro", "G.S. Musasa", "G.S. Mukura",
        
    ],
    Ngororero: [
        "Groupe Scolaire Ngororero", "G.S. Kavumu", "G.S. Nyange",
       
    ],
    Rubavu: [
        "Groupe Scolaire Rubavu", "G.S. Rugerero", "G.S. Gisenyi",
        
    ],
    Nyabihu: [
        "Groupe Scolaire Nyabihu", "G.S. Jenda", "G.S. Rambura",
        
    ],
    Musanze: [
        "Ecole des Sciences de Musanze", "Groupe Scolaire Ruhengeri",
      
    ],
    Burera: [
        "Groupe Scolaire Burera", "G.S. Butaro", "G.S. Cyanika",
        
    ],
    Gakenke: [
        "Groupe Scolaire Gakenke", "G.S. Ruli", "G.S. Janja",
        "Ecole Secondaire de Gakenke", "G.S. Muhondo", "G.S. Nemba"
    ],
    Rulindo: [
        "Groupe Scolaire Rulindo", "G.S. Tumba", "G.S. Base",
        "Ecole Secondaire de Rulindo", "G.S. Kinihira", "G.S. Shyorongi"
    ],
    Gicumbi: [
        "Groupe Scolaire Gicumbi", "G.S. Byumba", "G.S. Rutare",
        "Ecole Secondaire de Gicumbi", "G.S. Nyagatare", "G.S. Kaniga"
    ],
    Nyagatare: [
        "Ecole Secondaire de Nyagatare", "G.S. Matimba", "G.S. Rwimiyaga",
        "Groupe Scolaire Nyagatare", "G.S. Mimuri", "G.S. Rukomo"
    ],
    Gatsibo: [
        "Groupe Scolaire Gatsibo", "G.S. Kiziguro", "G.S. Kiramuruzi",
        "Ecole Secondaire de Gatsibo", "G.S. Rugarama", "G.S. Ngarama"
    ],
    Kayonza: [
        "Groupe Scolaire Kayonza", "G.S. Mukarange", "G.S. Kabarondo",
        "Ecole Secondaire de Kayonza", "G.S. Nyamirama", "G.S. Rukara"
    ],
    Rwamagana: [
        "Groupe Scolaire Rwamagana", "G.S. Musha", "G.S. Rubona",
        "Ecole Secondaire de Rwamagana", "G.S. Muhazi", "G.S. Kigabiro"
    ],
    Ngoma: [
        "Groupe Scolaire Ngoma", "G.S. Kibungo", "G.S. Zaza",
        "Ecole Secondaire de Ngoma", "G.S. Remera", "G.S. Mutenderi"
    ],
    Kirehe: [
        "Groupe Scolaire Kirehe", "G.S. Nyakarambi", "G.S. Nasho",
        "Ecole Secondaire de Kirehe", "G.S. Mahama", "G.S. Rusumo"
    ],
    Bugesera: [
        "Groupe Scolaire Bugesera", "G.S. Nyamata", "G.S. Ntarama",
        "Ecole Secondaire de Bugesera", "G.S. Mayange", "G.S. Ruhuha"
    ]
};




  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedSchool("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedSchool("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Location Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Province Filter */}
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <select
                id="province"
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            {selectedProvince && (
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select District</option>
                  {districtsByProvince[selectedProvince as keyof typeof districtsByProvince]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* School Filter */}
            {selectedDistrict && (
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                  School
                </label>
                <select
                  id="school"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select School</option>
                  {schoolsByDistrict[selectedDistrict as keyof typeof schoolsByDistrict]?.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-6">
        <h2 className="Bold text-[30px]">Infrastucture section</h2>
        <InfrastructureSection />
        <h2 className="Bold text-[30px]">IT section</h2>
          <ITSection />
          <h2 className="SemiBold text-[30px]">Trade section</h2>
          <TradesSection />
         
          
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


